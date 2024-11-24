'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Download, Eye } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useUser } from '@clerk/nextjs';
import { deleteUser, getMemberInfo, GetMembers } from '@/lib/api';
import {  UserInfo } from '@/types/type';
import { QRCodeCanvas } from 'qrcode.react';
import { generateQrData } from '@/lib/qr';

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showQRCode, setShowQRCode] = useState<Record<string, boolean>>({});
  const { user } = useUser();
  const [qrData, setQrData] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;

    const userId = user.id;
    const qrContent = generateQrData({ userID: userId });
    setQrData(qrContent);


    const fetchUsersAndAttendance = async () => {
      try {
        const members = await GetMembers();
        const adminInfo = await getMemberInfo(user.id);

        setUsers(members || []);
        if (adminInfo) setCurrentUser(adminInfo);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({ title: "Failed to load data", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndAttendance();
  }, [user, toast]);

  const handleEditUser = (user: UserInfo) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };


  console.log(isEditModalOpen, selectedUser)

  // const handleUpdateUser = async (userId: string, updatedUser: UserInfo) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("name", updatedUser.name);
  //     formData.append("email", updatedUser.email);
  //     formData.append("phone", updatedUser.phone ?? '');

  //     const updatedData = await updateUserInfo(userId, formData);
  //     setUsers(users.map((u) => (u.clerkUserId === userId ? updatedData : u)));
  //     toast({ title: "User updated successfully" });
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //     toast({ title: "Failed to update user", variant: "destructive" });
  //   } finally {
  //     setIsEditModalOpen(false);
  //   }
  // };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((u) => u.clerkUserId !== userId));
      toast({ title: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({ title: "Failed to delete user", variant: "destructive" });
    }
  };

  const downloadQRCode = async (user: UserInfo) => {
    const canvasElement = document.getElementById(`qr-code-${user.clerkUserId}`);
    if (canvasElement) {
      try {
        const canvas = await html2canvas(canvasElement, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = `${user.name}-qr-code.png`;
        link.click();
      } catch (error) {
        console.error("Error capturing QR code:", error);
        toast({ title: "Failed to download QR code", variant: "destructive" });
      }
    } else {
      toast({ title: "QR code not found", variant: "destructive" });
    }
  };

  const toggleQRCodeVisibility = (userId: string) => {
    setShowQRCode((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  if (loading) {
    return <p className="mt-12 text-center text-xl">Loading...</p>;
  }

  if (currentUser?.role !== 'ADMIN') {
    return (
      <p className="mt-12 text-center">
        This is a protected admin dashboard restricted to users with the &ldquo;ADMIN&rdquo; role.
      </p>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 items-center justify-center flex">Membership List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>QR Code</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.clerkUserId}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <div className="flex flex-col items-center">
                  {showQRCode[user.clerkUserId] && (
                    <div id={`qr-code-${user.clerkUserId}`} className="p-4 border rounded-lg bg-white">
                      <QRCodeCanvas value={qrData} size={200} />
                    </div>
                  )}
                  <div className="flex space-x-2 mt-2">
                    <Button variant="outline" onClick={() => downloadQRCode(user)}>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" onClick={() => toggleQRCodeVisibility(user.clerkUserId)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => handleEditUser(user)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDeleteUser(user.clerkUserId)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

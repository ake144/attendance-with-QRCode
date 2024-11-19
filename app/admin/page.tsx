'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Download, Eye } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useUser } from '@clerk/nextjs';
import { deleteUser, getAttendanceHistory, getMemberInfo, GetMembers, updateUserInfo } from '@/lib/api';
import { AttendanceRecord, UserInfo } from '@/types/type';
import { QRCodeCanvas } from 'qrcode.react';
import churchLogo from "/public/church-logo.jpg";
import Image from "next/image";
import { generateQrData } from '@/lib/qr';

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showQRCode, setShowQRCode] = useState(false);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [qrData, setQrData] = useState<string>('');
  const { user } = useUser();
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
        const attendanceHistory = await getAttendanceHistory(userId);

        setUsers(members || []);
        if (adminInfo) setCurrentUser(adminInfo);
        if (attendanceHistory) setAttendance(attendanceHistory);
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

  const handleUpdateUser = async (userId: string, updatedUser: UserInfo) => {
    try {
      const formData = new FormData();
      formData.append("name", updatedUser.name);
      formData.append("email", updatedUser.email);
      formData.append("phone", updatedUser.phone ?? '');

      const updatedData = await updateUserInfo(userId, formData);
      setUsers(users.map((u) => (u.clerkUserId === userId ? updatedData : u)));
      toast({ title: "User updated successfully" });
    } catch (error) {
      console.error("Error updating user:", error);
      toast({ title: "Failed to update user", variant: "destructive" });
    } finally {
      setIsEditModalOpen(false);
    }
  };

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

  const handleDownloadAttendance = () => {
    const attendanceText = attendance.map((record) =>
      `Date: ${record.date}, Present: ${record.isPresent}`
    ).join('\n');

    const blob = new Blob([attendanceText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'attendance.txt';
    link.click();
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
            <TableHead>Attendance</TableHead>
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
                <Button variant="outline" onClick={handleDownloadAttendance}>
                  Download
                </Button>
              </TableCell>
              <TableCell>
                {showQRCode ? (<>
                  <TableCell>
                      <div id={`qr-code-${user.clerkUserId}`} className="flex items-center justify-center w-full h-full p-4 border rounded-lg bg-white">
                        <div className="flex flex-col items-start space-y-2 w-1/2">
                          <Image src={churchLogo} alt="Church Logo" width={100} height={100} priority />
                          <p className="text-lg font-semibold">Name: {user.name}</p>
                          <p className="text-lg">Phone: {user.phone}</p>
                        </div>
                        <QRCodeCanvas
                          value={generateQrData({ userID: user.clerkUserId })}
                          size={200}
                          level="H"
                          includeMargin={true}
                        />
                         <Button variant="outline" onClick={() => setShowQRCode(!showQRCode)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                    </> )  :  ( <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={() => downloadQRCode(user)}>
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" onClick={() => setShowQRCode(!showQRCode)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>)
                }
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

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const updatedUser: UserInfo = {
                  ...selectedUser,
                  name: formData.get("name") as string,
                  email: formData.get("email") as string,
                  phone: formData.get("phone") as string,
                };
                handleUpdateUser(selectedUser.clerkUserId, updatedUser);
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" defaultValue={selectedUser.name} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" defaultValue={selectedUser.email} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" defaultValue={selectedUser.phone ?? ''} className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

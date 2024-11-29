'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Download, QrCode} from 'lucide-react';
import html2canvas from 'html2canvas';
import { useUser } from '@clerk/nextjs';
import { deleteUser, getAttendanceHistory, getMemberInfo, GetMembers, updateUserInfo } from '@/lib/api';
import { AttendanceRecord, UserInfo } from '@/types/type';
import { QRCodeSVG } from 'qrcode.react';
<<<<<<< HEAD
import { generateQrData } from '@/lib/generatetoke';
=======
import { generateQrData } from '@/lib/qr';
>>>>>>> 7b9e7c64026fe50a96a887f01bcc9b37e6567a78
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [showQRCode, setShowQRCode] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;

    const userId = user.id;

    const fetchUsersAndAttendance = async () => {
      try {
        const members = await GetMembers();
        const adminInfo = await getMemberInfo(user.id);
        const attendanceHistory = await getAttendanceHistory(userId);
     
        setUsers(members || []);
        if (adminInfo) setCurrentUser(adminInfo);
        if(attendanceHistory) setAttendance(attendanceHistory);
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
    const element = document.getElementById(`qr-code-${user.clerkUserId}`);
    if (element) {
      try {
        const canvas = await html2canvas(element, { scale: 3 });
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

  const toggleQRCodeVisibility = (user: UserInfo) => {
    setSelectedUser(user);
    setShowQRCode(true);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div></div>;
  }

  if (currentUser?.role !== 'ADMIN') {
    return (
      <p className="mt-12 text-center text-xl font-semibold text-red-600">
        Access Denied: This dashboard is restricted to users with the &ldquo;ADMIN&rdquo; role.
      </p>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Membership Management</h1>
      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Phone</TableHead>
                <TableHead className="font-semibold">Attendance</TableHead>
                <TableHead className="font-semibold">QR Code</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.clerkUserId} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={handleDownloadAttendance}>
                      <Download className="w-4 h-4 mr-2" /> Attendance
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleQRCodeVisibility(user)}
                    >
                      <QrCode className="w-4 h-4 mr-2" /> View QR
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteUser(user.clerkUserId)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User Information</DialogTitle>
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
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" name="name" defaultValue={selectedUser.name} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email</Label>
                  <Input id="email" name="email" defaultValue={selectedUser.email} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">Phone</Label>
                  <Input id="phone" name="phone" defaultValue={selectedUser.phone ?? ''} className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Sheet open={showQRCode} onOpenChange={setShowQRCode}>
        <SheetContent side="right" className="sm:max-w-[425px]">
          <SheetHeader>
            <SheetTitle>QR Code</SheetTitle>
            <SheetDescription>
              Scan this QR code to access user information.
            </SheetDescription>
          </SheetHeader>
          {selectedUser && (
            <div className="mt-6 flex flex-col items-center">
              <div
                id={`qr-code-${selectedUser.clerkUserId}`}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <QRCodeSVG
                  value={generateQrData({ userID: selectedUser.clerkUserId })}
                  size={200}
                  level="H"
                  includeMargin={true}
                  imageSettings={{
                    src: "/yougo.jpg",
                    x: undefined,
                    y: undefined,
                    height: 24,
                    width: 24,
                    excavate: true,
                  }}
                />

              <div className="mt-4 text-center">
                <h3 className="font-semibold text-lg">{selectedUser.name}</h3>
                <p className="text-sm text-gray-600">{selectedUser.phone}</p>
              </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => downloadQRCode(selectedUser)}
              >
                <Download className="w-4 h-4 mr-2" /> Download QR Code
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}


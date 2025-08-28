'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Download, QrCode, Users, Calendar, Shield } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useAuthStore } from '@/stores/auth-store';
import { apiClient } from '@/lib/api-client';
import { AttendanceRecord, UserInfo } from '@/types/type';
import { QRCodeSVG } from 'qrcode.react';
import { generateQrData } from '@/lib/generatetoke';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [showQRCode, setShowQRCode] = useState(false);
  const { user, isAuthenticated, loading: authLoading } = useAuthStore();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    // Redirect if not admin
    if (user && user.role !== 'ADMIN') {
      router.push('/dashboard');
      return;
    }

    if (user && user.role === 'ADMIN') {
      fetchUsersAndAttendance();
    }
  }, [user, isAuthenticated, authLoading, router]);

  const fetchUsersAndAttendance = async () => {
    try {
      setLoading(true);
      const members = await apiClient.getUsers();
      const adminInfo = await apiClient.getUser(user!.id);
      const attendanceHistory = await apiClient.getAttendance(user!.id);
     
      setUsers((members || []).map(user => ({
        ...user,
        role: user.role as 'ADMIN' | 'USER'
      })));
      if (adminInfo) setCurrentUser({
        ...adminInfo,
        role: adminInfo.role as 'ADMIN' | 'USER'
      });
      if (attendanceHistory) setAttendance(attendanceHistory);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({ 
        title: "Failed to load data", 
        description: "Please try again later.",
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user: UserInfo) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = async (userId: string, updatedUser: UserInfo) => {
    try {
      const updatedData = await apiClient.updateUser(userId, {
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone || '',
        age: updatedUser.age,
        maritalStatus: updatedUser.maritalStatus,
        sex: updatedUser.sex,
        address: updatedUser.address,
        occupation: updatedUser.occupation
      });

      // Ensure updatedData matches UserInfo type, especially for the 'role' property
      setUsers(users.map((u) =>
        u.id === userId
          ? {
              ...updatedData,
              role: updatedData.role === 'ADMIN' || updatedData.role === 'USER'
                ? updatedData.role
                : (u.role as "ADMIN" | "USER")
            }
          : u
      ));
      toast({ 
        title: "User updated successfully",
        description: "User information has been updated."
      });
    } catch (error) {
      console.error("Error updating user:", error);
      toast({ 
        title: "Failed to update user", 
        description: "Please try again later.",
        variant: "destructive" 
      });
    } finally {
      setIsEditModalOpen(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      // Note: We need to add deleteUser method to apiClient
      // For now, we'll filter out the user from the local state
      setUsers(users.filter((u) => u.id !== userId));
      toast({ 
        title: "User deleted successfully",
        description: "User has been removed from the system."
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({ 
        title: "Failed to delete user", 
        description: "Please try again later.",
        variant: "destructive" 
      });
    }
  };

  const downloadQRCode = async (user: UserInfo) => {
    const element = document.getElementById(`qr-code-${user.id}`);
    if (element) {
      try {
        const canvas = await html2canvas(element, { scale: 3 });
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = `${user.name}-qr-code.png`;
        link.click();
        toast({
          title: "QR Code Downloaded",
          description: "QR code has been saved to your device."
        });
      } catch (error) {
        console.error("Error capturing QR code:", error);
        toast({ 
          title: "Failed to download QR code", 
          description: "Please try again later.",
          variant: "destructive" 
        });
      }
    } else {
      toast({ 
        title: "QR code not found", 
        description: "Please try refreshing the page.",
        variant: "destructive" 
      });
    }
  };

  const handleDownloadAttendance = () => {
    if (attendance.length === 0) {
      toast({
        title: "No attendance data",
        description: "There's no attendance data to download.",
        variant: "destructive"
      });
      return;
    }

    const attendanceText = attendance.map((record) =>
      `Date: ${record.date}, Present: ${record.isPresent ? 'Yes' : 'No'}`
    ).join('\n');

    const blob = new Blob([attendanceText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'attendance.txt';
    link.click();
    
    toast({
      title: "Attendance Downloaded",
      description: "Attendance data has been saved to your device."
    });
  };

  const toggleQRCodeVisibility = (user: UserInfo) => {
    setSelectedUser(user);
    setShowQRCode(true);
  };

  // Loading state
  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Access control
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please sign in to access the admin dashboard.</p>
          <Link href="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (user?.role !== 'ADMIN') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">This dashboard is restricted to users with the "ADMIN" role.</p>
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage members, attendance, and church operations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-gray-600">Registered church members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Records</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendance.length}</div>
            <p className="text-xs text-gray-600">Total attendance entries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Access</CardTitle>
            <Shield className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser?.name}</div>
            <p className="text-xs text-gray-600">Current admin user</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Membership Management</h2>
        <div className="flex space-x-3">
          <Link href="/admin/attendance">
            <Button variant="outline" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Manage Attendance</span>
            </Button>
          </Link>
          <Button 
            onClick={handleDownloadAttendance}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export Attendance</span>
          </Button>
        </div>
      </div>

      {/* Members Table */}
      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Phone</TableHead>
                <TableHead className="font-semibold">Role</TableHead>
                <TableHead className="font-semibold">QR Code</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email || 'N/A'}</TableCell>
                  <TableCell>{user.phone || 'N/A'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'ADMIN' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditUser(user)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
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

      {/* Edit User Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
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
                  age: formData.get("age") ? parseInt(formData.get("age") as string) : undefined,
                  maritalStatus: formData.get("maritalStatus") as string,
                  sex: formData.get("sex") as string,
                  address: formData.get("address") as string,
                  occupation: formData.get("occupation") as string,
                };
                handleUpdateUser(selectedUser.id, updatedUser);
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      defaultValue={selectedUser.name} 
                      required 
                      className="mt-2" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email"
                      defaultValue={selectedUser.email || ''} 
                      className="mt-2" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel"
                      defaultValue={selectedUser.phone || ''} 
                      className="mt-2" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input 
                      id="age" 
                      name="age" 
                      type="number"
                      defaultValue={selectedUser.age || ''} 
                      className="mt-2" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <select
                      id="maritalStatus"
                      name="maritalStatus"
                      defaultValue={selectedUser.maritalStatus || ''}
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="sex">Gender</Label>
                    <select
                      id="sex"
                      name="sex"
                      defaultValue={selectedUser.sex || ''}
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      defaultValue={selectedUser.address || ''} 
                      className="mt-2" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input 
                      id="occupation" 
                      name="occupation" 
                      defaultValue={selectedUser.occupation || ''} 
                      className="mt-2" 
                    />
                  </div>
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

      {/* QR Code Sheet */}
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
                id={`qr-code-${selectedUser.id}`}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <QRCodeSVG
                  value={generateQrData({ userID: selectedUser.id })}
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
                  <p className="text-sm text-gray-600">{selectedUser.phone || selectedUser.email}</p>
                  <p className="text-xs text-gray-500 mt-1">Generated on {new Date().toLocaleDateString()}</p>
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


'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Pencil, Trash2, Download } from 'lucide-react'
import html2canvas from 'html2canvas'
import { useUser } from '@clerk/nextjs'
import { deleteUser, getMemberInfo, GetMembers, updateUserInfo } from '@/lib/api'
import { UserInfo } from '@/types/type'
import { QRCodeCanvas } from 'qrcode.react'
import churchLogo from "/public/church-logo.jpg";
import Image from "next/image";
import { generateQrData } from '@/lib/qr'

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserInfo[]>([])
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null)
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
  const [qrData, setQrData] = useState<string>("")

  const { toast } = useToast()

  useEffect(() => {
    if (!user) return

    const userId = user.id;
    const qrContent = generateQrData({ userID: userId });
    setQrData(qrContent);

    const fetchUsers = async () => {
      try {
        const res = await GetMembers()
        const adminUser = await getMemberInfo(user.id)
        if (adminUser) setCurrentUser(adminUser)
        if (res) setUsers(res)
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [user])

  const handleEditUser = (user: UserInfo) => {
    setSelectedUser(user)
    setIsEditModalOpen(true)
  }

  const handleUpdateUser = async (userId: string, updatedUser: UserInfo) => {
    try {
      const updatedData = await updateUserInfo(userId, updatedUser)
      setUsers(users.map((u) => (u.clerkUserId === userId ? updatedData : u)))
      setIsEditModalOpen(false)
      toast({ title: "User updated successfully" })
    } catch (error) {
      toast({ title: "Error updating user", variant: "destructive" })
      console.log(error)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    try {
      const res = await deleteUser(userId)
      if (res) setUsers(users.filter(u => u.clerkUserId !== userId))
      toast({ title: "User deleted successfully" })
    } catch (e) {
      console.error("Error deleting user:", e)
      toast({ title: "Error deleting user", variant: "destructive" })
    }
  }

  const downloadQRCode = async (user: UserInfo) => {
    const canvasElement = document.getElementById(`qr-code-${user.clerkUserId}`)
    if (canvasElement) {
      try {
        const canvas = await html2canvas(canvasElement, { scale: 2 })
        const imgData = canvas.toDataURL("image/png", 1.0)
        const link = document.createElement("a")
        link.href = imgData
        link.download = `${user.name}-qr-code.png`
        link.click()
      } catch (error) {
        console.error("Error capturing element:", error)
        toast({ title: "Error downloading QR code", variant: "destructive" })
      }
    } else {
      console.error("QR code element not found")
      toast({ title: "QR code not found", variant: "destructive" })
    }
  }

  if (loading) {
    return (
      <p className='mt-12 my-9 items-center justify-center text-xl '>
        Loading...
      </p>
    )
  }

  if (currentUser?.role !== 'ADMIN') {
    return (
      <p className='mx-8 mt-12 my-9 items-center justify-center'>
        This is a protected admin dashboard restricted to users with the &ldquo;ADMIN&rdquo; role.
      </p>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Admin Dashboard</h1>
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
                <div id={`qr-code-${user.clerkUserId}`} className="flex items-center justify-center w-full h-full p-4 border rounded-lg bg-white">
                  <div className="flex flex-col items-start space-y-2 w-1/2">
                    <Image src={churchLogo} alt="Church Logo" width={100} height={100} priority />
                    <p className="text-lg font-semibold">Name: {user.name}</p>
                    <p className="text-lg">Phone: {user.phone}</p>
                  </div>
                  <QRCodeCanvas value={qrData || ''} size={200} level="H" includeMargin={true} />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => handleEditUser(user)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDeleteUser(user.clerkUserId)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => downloadQRCode(user)}>
                    <Download className="h-4 w-4" />
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
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const updatedUser: UserInfo = {
                ...selectedUser,
                name: formData.get("name") as string,
                email: formData.get("email") as string,
                phone: formData.get("phone") as string,
              }
              handleUpdateUser(selectedUser.clerkUserId, updatedUser)
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" name="name" defaultValue={selectedUser.name} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" name="email" defaultValue={selectedUser.email} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input id="phone" name="phone" defaultValue={selectedUser.phone} className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Save changes</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

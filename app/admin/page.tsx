'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Pencil, Trash2, Download } from 'lucide-react'
import html2canvas from 'html2canvas'
import { useUser } from '@clerk/nextjs'
import {  GetMembers } from '@/lib/api'
import { UserInfo } from '@/types/type'

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserInfo[]>([])
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { user } = useUser()
  const { toast } = useToast()

  const userID = user?.id
  const userRole = user?.publicMetadata?.role || 'USER' // Assuming role is stored in `publicMetadata`

  useEffect(() => {
    if (!user) return

    const fetchUsers = async () => {
      try {
        const res = await GetMembers()
        if (res) {
          setUsers(res)
        }
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }
    fetchUsers()
  }, [user])

  const handleEditUser = (user: UserInfo) => {
    setSelectedUser(user)
    setIsEditModalOpen(true)
  }

  const handleUpdateUser = (updatedUser: UserInfo) => {
    setUsers(users.map(u => u.email === updatedUser.email ? updatedUser : u))
    setIsEditModalOpen(false)
    toast({ title: "User updated successfully" })
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(u => u.clerkUserId !== userId))
    toast({ title: "User deleted successfully" })
  }

  const downloadQRCode = async (user: UserInfo) => {
    const captureElement = document.getElementById(`qr-code-${user.clerkUserId}`);
    if (captureElement) {
      try {
        const canvas = await html2canvas(captureElement)
        const imgData = canvas.toDataURL("image/png")
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

  if (userRole !== 'ADMIN') {
    return (
      <p>This is a protected admin dashboard restricted to users with the 'ADMIN' role.</p>
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
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                phone: formData.get('phone') as string,
              }
              handleUpdateUser(updatedUser)
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

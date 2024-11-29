import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { UserInfo } from "@/types/type"



export default function UserInfoPage({userInfo}: {userInfo: UserInfo}) {
  // This would typically come from your QR code scanning logic

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex flex-col">
          <div className="p-8">
            {/* Church Logo */}
            <div className="flex justify-center mb-6">
              <img 
                className="h-24 w-auto" 
                src="/placeholder.svg?height=96&width=96" 
                alt="Church Logo" 
              />
            </div>

            {/* Welcome Message */}
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-6 text-center">
              Welcome, {userInfo.name}!
            </div>

            {/* User Picture and Basic Info */}
            <div className="flex items-center justify-center mb-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt={userInfo.name} />
                <AvatarFallback>{userInfo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">{userInfo.name}</h2>
            <p className="text-center text-gray-500 mb-6">Age: {userInfo.age}</p>

            {/* Other User Info */}
            <Card>
              <CardContent className="grid gap-4 pt-6">
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary">Email</Badge>
                  <span className="text-sm">{userInfo.email}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary">Phone</Badge>
                  <span className="text-sm">{userInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary">Address</Badge>
                  <span className="text-sm">{userInfo.address}</span>
                </div>
                {/* <div className="flex items-center space-x-4">
                  <Badge variant="secondary">Member Since</Badge>
                  <span className="text-sm">{userInfo.memberSince}</span>
                </div> */}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


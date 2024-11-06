"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QRCodeCanvas } from "qrcode.react";

interface MemberData {
  name: string;
  email: string;
  phone: string;
  membershipId: string;
}

export default function MemberPage({ params }: { params: { id: string } }) {
  const [member, setMember] = useState<MemberData | null>(null);

  useEffect(() => {
    // In a real app, you would fetch member data from your backend
    // This is just a mock example
    setMember({
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      membershipId: params.id,
    });
  }, [params.id]);

  if (!member) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  const qrData = JSON.stringify(member);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card>
        <CardHeader className="flex flex-row items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${member.name}`} />
            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-3xl">{member.name}</CardTitle>
            <p className="text-sm text-muted-foreground">Member ID: {member.membershipId}</p>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Contact Information</h3>
              <p className="text-sm text-muted-foreground">{member.email}</p>
              <p className="text-sm text-muted-foreground">{member.phone}</p>
            </div>
            {/* Add more member details as needed */}
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <QRCodeCanvas
                value={qrData}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Scan this QR code to quickly access member information
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
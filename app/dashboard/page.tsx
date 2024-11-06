"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas"; 

export default function DashboardPage() {
  const { user } = useUser();
  const [memberInfo, setMemberInfo] = useState({
    name: "",
    email: "",
    phone: "",
    membershipId: "",
  });
  const [formattedDate, setFormattedDate] = useState('');

  const qrData = JSON.stringify({
    ...memberInfo,
    timestamp: formattedDate,
  });


  const downloadQRCodeWithInfo = async () => {
    const captureElement = document.getElementById('capture');
    if (captureElement) {
      const canvas = await html2canvas(captureElement);
      const imgData = canvas.toDataURL('image/png');
      
      // Create a temporary anchor tag to download the image
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `member-info-qrcode.png`; // File name for download
      link.click();
    }
  };



useEffect(() => {
  setFormattedDate(new Date().toLocaleString()); // Ensure it's done client-side only
}, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user?.firstName}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Generate Member QR Code</CardTitle>
            <CardDescription>
              Enter member information to generate their unique QR code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={memberInfo.name}
                  onChange={(e) =>
                    setMemberInfo({ ...memberInfo, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={memberInfo.email}
                  onChange={(e) =>
                    setMemberInfo({ ...memberInfo, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={memberInfo.phone}
                  onChange={(e) =>
                    setMemberInfo({ ...memberInfo, phone: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="membershipId">Membership ID</Label>
                <Input
                  id="membershipId"
                  value={memberInfo.membershipId}
                  onChange={(e) =>
                    setMemberInfo({ ...memberInfo, membershipId: e.target.value })
                  }
                />
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>QR Code Preview</CardTitle>
            <CardDescription>
              Scan this QR code to view member information
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <QRCodeCanvas
                value={qrData}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            <Button onClick={() => window.print()}>Print QR Code</Button>
            {/* <Button onClick={downloadQRCodeWithInfo}>Download Info with QR Code</Button> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


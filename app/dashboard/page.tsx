// pages/dashboard.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { UserInfo, AttendanceRecord, QRData } from "@/types/type";

export default function DashboardPage() {
  const { user } = useUser();


  const [memberInfo, setMemberInfo] = useState<UserInfo | null>(null);
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>([]);
  const [qrData, setQrData] = useState<string>("");


  useEffect(() => {
    if (!user) return;  // Wait until user is available

    setMemberInfo({
      name: user.firstName || "",
      email: user.emailAddresses[0]?.emailAddress || "",
      phone: "",
      membershipId: "",
    });

    setQrData(JSON.stringify({ userId: user.id, timestamp: new Date().toISOString() }));

    const fetchAttendanceHistory = async () => {
      const response = await fetch(`/api/attendance/${user.id}`, { method: 'GET' });
      if (response.ok) {
        const data = await response.json();
        setAttendanceHistory(data);
      }
    };

    fetchAttendanceHistory();
  }, [user]);
 

  const markAttendance = async () => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const specifiedDays = ["Monday", "Wednesday", "Sunday"];

    if (specifiedDays.includes(today)) {
      await fetch("/api/attendance/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          date: new Date(),
          isPresent: true,
        }),
      });
      setAttendanceHistory([...attendanceHistory, { date: new Date().toISOString(), isPresent: true }]);
    }
  };

  const downloadAttendanceReport = async () => {
    const captureElement = document.getElementById("capture");
    if (captureElement) {
      const canvas = await html2canvas(captureElement);
      const imgData = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = imgData;
      link.download = `${memberInfo?.name}-attendance-report.png`;
      link.click();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Welcome, {memberInfo?.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Generate Member QR Code</CardTitle>
            <CardDescription>
              QR code contains user identification data and attendance history.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Label htmlFor="phone">Phone Number</Label>

              <Input
                id="phone"
                value={memberInfo?.phone}
                onChange={(e) =>
                  setMemberInfo({ ...memberInfo, phone: e.target.value } as UserInfo)
                }
              />
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>QR Code & Attendance History</CardTitle>
            <CardDescription>
              Scan the QR code to mark attendance or view attendance history.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div id="capture" className="bg-white p-4 rounded-lg">
              <QRCodeCanvas value={qrData} size={200} level="H" includeMargin={true} />
              <div>
                <p>Name: {memberInfo?.name}</p>
                <p>Email: {memberInfo?.email}</p>
                <p>Membership ID: {memberInfo?.membershipId}</p>
                <p>Attendance History:</p>
                <ul>
                  {attendanceHistory.map((record, index) => (
                    <li key={index}>
                      {record.date}: {record.isPresent ? "Present" : "Absent"}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Button  onClick={markAttendance}>Mark Attendance</Button>
            <Button onClick={downloadAttendanceReport}>Download Report</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

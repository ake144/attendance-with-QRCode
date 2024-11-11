
"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { UserInfo, AttendanceRecord } from "@/types/type";

import churchLogo from "/public/church-logo.jpg"; // Ensure this logo file is available in your public folder
import Image from "next/image";
import { getAttendanceHistory, saveUserInfo, updateUserInfo } from "@/lib/api";
import UserForm from "@/components/userinfo";
import {generateQrData} from '@/lib/qr'



export default function DashboardPage() {
  const { user } = useUser();
  const [memberInfo, setMemberInfo] = useState<UserInfo | null>(null);
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>([]);
  const [qrData, setQrData] = useState<string>("");

  useEffect(() => {
    if (!user) return;

   const userId = user.id;
    const qrContent = generateQrData({userID: userId});
    setQrData(qrContent);
    
      const fetchMemberData = async () => {
        try {
          const userData = {
            name: user.firstName || "",
            email: user.emailAddresses[0]?.emailAddress || "",
            phone: "",
            clerkUserId: user.id,
            qrCode: qrData,
          };
          setMemberInfo(userData);
          await saveUserInfo(user.id, userData);
    
          const response = await getAttendanceHistory(user.id);
          if (response) setAttendanceHistory(response);
        } catch (error) {
          console.error("Error initializing member data:", error);
        }
      };
      fetchMemberData();
    }, [user]);


  const handleFormUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !memberInfo) return; // Ensure memberInfo is defined

    try {
           await updateUserInfo(user.id, memberInfo);
          
        console.log("Member info updated successfully!");
    } catch (error) {
        console.error("Error updating member data:", error);
    }
};





  // Function to download attendance report with church logo
// Update the ID reference here in downloadAttendanceCard
const downloadAttendanceCard = async () => {
  const captureElement = document.getElementById("capture"); // Updated ID to match
  if (captureElement) {
    try {
      const canvas = await html2canvas(captureElement);
      const imgData = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = imgData;
      link.download = `${memberInfo?.name}-attendance-card.png`;
      link.click();
    } catch (error) {
      console.error("Error capturing element:", error);
    }
  } else {
    console.error("Capture element not found");
  }
};

  


  if (!memberInfo) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Welcome, {memberInfo.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* QR Code Generation */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Member QR Code</CardTitle>
            <CardDescription>
              QR code contains user identification data for attendance marking.
            </CardDescription>
          </CardHeader>
          <CardContent>

          <UserForm  handleFormUpdate={handleFormUpdate}/>
                
      
          </CardContent>
        </Card>

        {/* QR Code and Attendance History */}
        <Card>
          <CardHeader>
            <CardTitle>QR Code & Attendance History</CardTitle>
            <CardDescription>
              Scan the QR code to mark attendance automatically on specified days.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
          <div
             id="capture"
            className="flex items-center p-6 border border-gray-300 rounded-lg bg-white shadow-md space-x-6"
          >
            {/* Left Side: Logo and User Info */}
            <div className="flex flex-col items-start space-y-2 w-1/2">
              <Image src={churchLogo} alt="Church Logo" width={100} height={100} />
              <p className="text-lg font-semibold">Name: {memberInfo?.name}</p>
              <p className="text-lg">Email: {memberInfo?.email}</p>
              <p className="text-lg">Phone: {memberInfo?.phone}</p>
              <p className="mt-4 font-semibold">Attendance History:</p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {attendanceHistory.map((record, index) => (
                  <li key={index}>
                    {new Date(record.date).toLocaleDateString()}:{" "}
                    {record.isPresent ? "Present" : "Absent"}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side: QR Code */}
            <div className="flex items-center justify-center w-1/2">
              <QRCodeCanvas value={qrData} size={150} level="H" includeMargin={true} />
            </div>
          </div>

          <Button onClick={downloadAttendanceCard} className="mt-4">
            Download 
          </Button>
        </CardContent>
        </Card>
      </div>
    </div>
  );
}


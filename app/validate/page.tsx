<<<<<<< HEAD
// pages/validate.tsx
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
=======
'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
>>>>>>> 7b9e7c64026fe50a96a887f01bcc9b37e6567a78
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader } from "@/components/ui/loader";
<<<<<<< HEAD
=======
import { UserInfo } from "@/types/type";
import { CheckCircle } from 'lucide-react';
>>>>>>> 7b9e7c64026fe50a96a887f01bcc9b37e6567a78

export default function ValidatePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [userInfo, setUserInfo] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
=======
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState("");
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  useEffect(() => {
    const fetchAndMarkAttendance = async () => {
>>>>>>> 7b9e7c64026fe50a96a887f01bcc9b37e6567a78
      if (!token) {
        setError("Invalid or missing token");
        setLoading(false);
        return;
      }

      try {
<<<<<<< HEAD
        const res = await fetch(`/api/validate?token=${token}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message);
        } else {
          setUserInfo(data.user);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to validate token");
=======
        // Fetch user data
        const validateRes = await fetch(`/api/validate?token=${token}`);
        const validateData = await validateRes.json();

        if (!validateRes.ok) {
          setError(validateData.message || "Validation failed");
          setLoading(false);
          return;
        }

        const user = validateData.user;
        setUserInfo(user);

        // Automatically mark attendance
        const date = new Date().toISOString().split("T")[0];
        const markRes = await fetch(
          `/api/mark?userId=${user.clerkUserId}&date=${date}`,
          {
            method: "GET", // Adjust to match your API
          }
        );
        const markData = await markRes.json();

        if (!markRes.ok) {
          setError(markData.message || "Failed to mark attendance");
        } else {
          setAttendanceMarked(true); // Indicates attendance is marked
        }
      } catch (err) {
        console.error("Error during validation or attendance marking:", err);
        setError("An error occurred while processing your request.");
>>>>>>> 7b9e7c64026fe50a96a887f01bcc9b37e6567a78
      } finally {
        setLoading(false);
      }
    };

<<<<<<< HEAD
    fetchUserData();
  }, [token]);

  const markAttendance = async () => {
    try {
      const res = await fetch(`/api/mark?token=${token}`, {
        method: "POST",
      });

      if (res.ok) {
        router.push("/success");
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to mark attendance");
    }
  };

=======
    fetchAndMarkAttendance();
  }, [token]);

>>>>>>> 7b9e7c64026fe50a96a887f01bcc9b37e6567a78
  if (loading) return <Loader />;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card>
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">Confirm Attendance</h1>
          <p>Welcome, {userInfo.name}!</p>
          <p>Your attendance for today is about to be marked.</p>
          <div className="mt-4">
            <Badge variant="secondary">Email</Badge>: {userInfo.email}
          </div>
          <div className="mt-4">
            <Button onClick={markAttendance}>Confirm Attendance</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
=======
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/yougo.jpg"
            alt="YouGo Church Logo"
            width={150}
            height={150}
            className="mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800">Attendance Confirmation</h1>
        </div>
        
        <Card className="w-full">
          <CardContent className="pt-6">

            <div  className="my-4 flex flex-col items-center">
              <h2 className="text-2xl font-bold text-gray-800 ">welcome  {userInfo?.name}</h2>
            </div>
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <Image
                  src={userInfo?.profilePic || "/placeholder.svg"}
                  alt={userInfo?.name || "User"}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">{userInfo?.name}</h2>
              <Badge variant="secondary" className="mt-2">{userInfo?.email}</Badge>
            </div>
            
            {attendanceMarked ? (
              <div className="text-center mb-6">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-2" />
                <p className="text-lg font-medium text-green-600">Attendance Submitted Successfully!</p>
              </div>
            ) : (
              <p className="text-center text-gray-600 mb-6">Your attendance for today is being processed.</p>
            )}
            
            <div className="flex justify-center">
              <Button
                onClick={() => router.push("/success")}
                disabled={!attendanceMarked}
                className="px-8 py-2"
              >
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

>>>>>>> 7b9e7c64026fe50a96a887f01bcc9b37e6567a78

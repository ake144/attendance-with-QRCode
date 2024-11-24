"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader } from "@/components/ui/loader";
import { UserInfo } from "@/types/type";

export default function ValidatePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setError("Invalid or missing token");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/validate?token=${token}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Validation failed");
        } else {
          setUserInfo(data.user);
        }
      } catch (err) {
        console.error("Error during validation:", err);
        setError("Failed to validate token");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const markAttendance = async () => {
    if (!userInfo) {
      setError("User information is missing");
      return;
    }

    try {
      const res = await fetch(
        `/api/mark?userId=${userInfo.clerkUserId}&date=${new Date().toISOString().split("T")[0]}`,
        {
          method: "GET", // Matches the `/api/mark` method
        }
      );

      if (res.ok) {
        router.push("/success"); // Redirect to success page
      } else {
        const data = await res.json();
        setError(data.message || "Failed to mark attendance");
      }
    } catch (err) {
      console.error("Error marking attendance:", err);
      setError("Failed to mark attendance");
    }
  };

  if (loading) return <Loader />;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card>
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">Confirm Attendance</h1>
          <p>Welcome, {userInfo?.name}!</p>
          <p>Your attendance for today is about to be marked.</p>
          <div className="mt-4">
            <Badge variant="secondary">Email</Badge>: {userInfo?.email}
          </div>
          <div className="mt-4">
            <Button onClick={markAttendance}>Confirm Attendance</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

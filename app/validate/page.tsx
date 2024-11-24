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
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  useEffect(() => {
    const fetchAndMarkAttendance = async () => {
      if (!token) {
        setError("Invalid or missing token");
        setLoading(false);
        return;
      }

      try {
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
          `/api/mark?userId=${user.id}&date=${date}`,
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
      } finally {
        setLoading(false);
      }
    };

    fetchAndMarkAttendance();
  }, [token]);

  if (loading) return <Loader />;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card>
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">Confirm Attendance</h1>
          <p>Welcome, {userInfo?.name}!</p>
          {attendanceMarked ? (
            <p className="text-green-500">Your attendance has been marked!</p>
          ) : (
            <p>Your attendance for today is being processed.</p>
            
          )}
          <div className="mt-4">
            <Badge variant="secondary">Email</Badge>: {userInfo?.email}
          </div>
          <div className="mt-4">
            <Button
              onClick={() => router.push("/success")}
              disabled={!attendanceMarked}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

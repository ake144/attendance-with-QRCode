'use client'



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
  const [userInfo, setUserInfo] = useState<UserInfo>();
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
          setError(data.message);
        } else {
          setUserInfo(data.user);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to validate token");
      } finally {
        setLoading(false);
      }
    };

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
      console.log(err)
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

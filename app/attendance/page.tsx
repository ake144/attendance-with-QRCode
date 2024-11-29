"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AttendancePage() {
  const [token, setToken] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  const CLEAR_TIMEOUT = 10000; // Time in milliseconds (e.g., 5 seconds)

  const handleTokenInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    try {
      const url = new URL(input);
      const tokenFromUrl = url.searchParams.get("token");
      setToken(tokenFromUrl || input);
    } catch {
      setToken(input);
    }
  };

  useEffect(() => {
    // Focus on the input field when the component loads
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const processToken = async () => {
      if (!token) return;

      setLoading(true);
      setError(null);

      try {
        // Validate token and fetch user data
        const validateResponse = await fetch(`/api/validate?token=${token}`);
        const validateData = await validateResponse.json();

        if (!validateResponse.ok) {
          setError(validateData.message || "Failed to validate token.");
          return;
        }

        const { user, date } = validateData;
        setUserInfo(user);

        // Mark attendance dynamically
        const markResponse = await fetch(`/api/mark?userId=${user.clerkUserId}&date=${date}`, {
          method: "GET",
        });

        if (!markResponse.ok) {
          const markData = await markResponse.json();
          setError(markData.message || "Failed to mark attendance.");
        } else {
          setAttendanceMarked(true);
        }
      } catch (err) {
        console.error(err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    processToken();
  }, [token]);

  // Automatically clear user info and input field after a timeout
  useEffect(() => {
    if (attendanceMarked && userInfo) {
      const timeout = setTimeout(() => {
        setUserInfo(null);
        setAttendanceMarked(false);
        setToken(null);
        if (inputRef.current) {
          inputRef.current.value = ""; // Clear input field visually
          inputRef.current.focus(); // Focus on the input field for next scan
        }
      }, CLEAR_TIMEOUT);

      return () => clearTimeout(timeout); // Cleanup timeout
    }
  }, [attendanceMarked, userInfo]);

  // Automatically clear error after a timeout
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError(null);
        setToken(null);
        if (inputRef.current) {
          inputRef.current.value = ""; // Clear input field visually
          inputRef.current.focus(); // Focus on the input field for next scan
        }
      }, CLEAR_TIMEOUT);

      return () => clearTimeout(timeout); // Cleanup timeout
    }
  }, [error]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Processing...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <p className="text-red-500 font-bold">{error}</p>
          <p className="text-gray-600 text-sm mt-2">
            Returning to the main screen shortly...
          </p>
        </div>
      </div>
    );
  }

  if (attendanceMarked && userInfo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-between p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Church Logo */}
        <Image
          src="/church-logo.jpg"
          alt="Church Logo"
          width={150}
          height={150}
          className="mb-8"
        />

        {/* Main Content Card */}
        <Card className="w-full shadow-2xl">
        <CardHeader className="bg-primary text-primary-foreground text-center py-6">
            <CardTitle className="text-3xl font-bold">
              Welcome, <span className="ml-2">{userInfo.name}!</span>
            </CardTitle>
          </CardHeader>

          <div className="flex justify-center mb-4">
            <Avatar className="w-28 h-28 border-4 border-white shadow-lg">
              <AvatarImage src={userInfo.profilePic} alt={`${userInfo.name}'s profile picture`} />
              <AvatarFallback>{userInfo.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>

          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Information</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {userInfo.name}</p>
                  <p><span className="font-medium">Email:</span> {userInfo.email}</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Attendance Details</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Date:</span> {new Date().toLocaleDateString()}</p>
                  <p><span className="font-medium">Time:</span> {new Date().toLocaleTimeString()}</p>
                  <p><span className="font-medium">Service:</span> Sunday Worship</p>
                </div>
              </div>
            </div>
          </CardContent>

        </Card>

        {/* Confirmation Message */}
        <div className="mt-5 text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-2">Attendance Submitted Successfully!</h2>
          <p className="text-gray-600">Thank you for joining us today. Your presence makes our community stronger.</p>
        </div>
      </div>

      {/* Footer
      <footer className="mt-5 text-center text-gray-500">
        <p>&copy; 2023 Your Church Name. All rights reserved.</p>
        <p className="mt-2">
          <Link href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</Link>
          {' | '}
          <Link href="/contact" className="underline hover:text-primary">Contact Us</Link>
        </p>
      </footer> */}
    </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-96 bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold mb-4">Scan QR Code</h1>
        <div className="mb-4">
          <label htmlFor="token" className="block mb-2 text-sm font-medium text-gray-700">
            Token
          </label>
          <input
            ref={inputRef}
            type="text"
            id="token"
            placeholder="Enter or scan token"
            value={token || ""}
            onChange={handleTokenInput}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <p className="text-gray-500 text-sm">
          Once the QR code is scanned, the token will be populated, and your attendance will be marked automatically.
        </p>
      </div>
    </div>
  );
}

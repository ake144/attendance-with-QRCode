"use client";

import { getMemberInfo } from "@/lib/api";
import { UserInfo } from "@/types/type";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { ChurchIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const { user } = useUser();
  const [userData, setUserData] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchUser = async () => {
      try {
        const userInfo = await getMemberInfo(user.id);
        setUserData(userInfo);
      } catch (error) {
        console.error("Error initializing member data:", error);
      }
    };

    fetchUser();
  }, [user]);

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <ChurchIcon className="h-8 w-8" />
            <span className="font-bold text-xl">You GO Church</span>
          </Link>
          <div className="flex items-center space-x-4">
            {userData?.role === "ADMIN" && (
              <Link href="/admin" className="text-foreground/60 hover:text-foreground">
                Dashboard
              </Link>
            )}
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}

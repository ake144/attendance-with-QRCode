"use client";

import { getMemberInfo } from "@/lib/api";
import { UserInfo } from "@/types/type";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { ChurchIcon, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    <nav className="border-b bg-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <ChurchIcon className="h-8 w-8 text-[#379AFE]" />
            <span className="font-bold text-[#379AFE] text-3xl">YouGO City Church</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-[#379AFE] font-medium transition-colors">
              Home
            </Link>
            <Link href="/events" className="text-gray-600 hover:text-[#379AFE] font-medium transition-colors">
              Events
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-[#379AFE] font-medium transition-colors">
              About
            </Link>
            {userData?.role === "ADMIN" && (
              <Link href="/admin" className="text-gray-600 hover:text-[#379AFE] font-medium transition-colors">
                Dashboard
              </Link>
            )}
          </div>

          {/* Sign-In / User Button */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" className="text-[#379AFE] border-[#379AFE] hover:bg-[#379AFE] hover:text-white">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/events">Events</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about">About</Link>
                </DropdownMenuItem>
                {userData?.role === "ADMIN" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <SignedOut>
                  <DropdownMenuItem>
                  <SignInButton mode="modal">
                    <Button variant="outline" className="text-[#379AFE] border-[#379AFE] hover:bg-[#379AFE] hover:text-white">
                      Sign In
                    </Button>
                  </SignInButton>
                  </DropdownMenuItem>
                </SignedOut>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}

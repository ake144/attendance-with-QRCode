"use client";

import { getMemberInfo } from "@/lib/api";
import { UserInfo } from "@/types/type";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { ChurchIcon, Menu } from 'lucide-react';
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
    <nav className="border-b bg-background sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <ChurchIcon className="h-8 w-8" />
            <span className="font-bold text-xl">YouGO City Church</span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-foreground/60 hover:text-foreground font-bold transition-colors">
              Home
            </Link>
            <Link href="/events" className="text-foreground/60 hover:text-foreground font-bold transition-colors">
              Events
            </Link>
            <Link href="/about" className="text-foreground/60 hover:text-foreground font-bold transition-colors">
              About
            </Link>
            {userData?.role === "ADMIN" && (
              <Link href="/admin" className="text-foreground/60 hover:text-foreground font-bold transition-colors">
                Dashboard
              </Link>
            )}
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline">Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
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
                    <SignInButton mode="modal">Sign In</SignInButton>
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


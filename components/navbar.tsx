"use client";

import { UserButton } from "@clerk/nextjs";
import { ChurchIcon } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <ChurchIcon className="h-8 w-8" />
            <span className="font-bold text-xl">Church QR</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-foreground/60 hover:text-foreground">
              Dashboard
            </Link>
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
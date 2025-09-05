"use client";

import { ChurchIcon, Menu, User, LogOut, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { user, loading, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

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
            <Link href="/" className="text-gray-600 hover:text-[#379AFE] font-lg spacing-x-3 text-pretty  font-semibold transition-colors">
              Home
            </Link>
            <Link href="/events" className="text-gray-600 hover:text-[#379AFE] font-lg spacing-x-3 text-pretty  font-semibold transition-colors">
              Events
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-[#379AFE] font-lg spacing-x-3 text-pretty  font-semibold transition-colors">
              About
            </Link>
            <Link href="/prayer" className="text-gray-600 hover:text-[#379AFE] font-lg spacing-x-3 text-pretty  font-semibold transition-colors">
              Prayer Request
            </Link>
            <Link href="/donate" className="text-gray-600 hover:text-[#379AFE] font-lg spacing-x-3 text-pretty  font-semibold transition-colors">
              Donate
            </Link>
            {user?.role === "ADMIN" && (
              <Link href="/admin" className="text-gray-600 hover:text-[#379AFE] font-lg spacing-x-3 text-pretty  font-semibold transition-colors">
                Dashboard
              </Link>
            )}
          </div>

          {/* Sign-In / User Button */}
          <div className="hidden md:flex items-center space-x-4">
            {!loading && !isAuthenticated && (
              <>
                <Link href="/sign-up">
                  <Button variant="outline" className="text-[#379AFE] border-[#379AFE] hover:bg-[#379AFE] hover:text-white">
                    Sign Up
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="text-[#379AFE] border-[#379AFE] hover:bg-[#379AFE] hover:text-white">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>
                    <User className="h-4 w-4 mr-2" />
                    {user.email || user.phone}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
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
                <DropdownMenuItem asChild>
                  <Link href="/donate">Donate</Link>
                </DropdownMenuItem>
                {user?.role === "ADMIN" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Dashboard</Link>
                  </DropdownMenuItem>
                )}
                {!loading && !isAuthenticated && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/sign-up">Sign Up</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/login">Sign In</Link>
                    </DropdownMenuItem>
                  </>
                )}
                {user && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem disabled>
                      <User className="h-4 w-4 mr-2" />
                      {user.name}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}

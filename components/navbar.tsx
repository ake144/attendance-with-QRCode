"use client";

import { ChurchIcon, Menu, User, LogOut } from "lucide-react";
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
import Image from "next/image";

export function Navbar() {
  const { user, loading, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav className="border-b bg-amber-400 sticky top-0 z-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo2.jpg"
              alt="YouGO City Church"
              width={90}
              height={40}
              className="rounded-xl shadow-md h-[50px] md:h-[70px] w-[100px]  object-cover"
            />
            <span className="hidden md:block text-2xl font-bold text-amber-900 tracking-wide">
              YouGO City Church
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { href: "/", label: "Home" },
              { href: "/events", label: "Events" },
              { href: "/about", label: "About" },
              { href: "/donate", label: "Donate" },
              { href: "/prayer", label: "Prayer Request" },
              
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-amber-900 hover:text-amber-600 text-xl font-semibold transition-colors duration-300 
             underline-offset-4 hover:underline decoration-2 decoration-amber-600"
              >
                {link.label}
              </Link>
            ))}

            {user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="text-amber-900 hover:text-white text-lg font-semibold transition-colors duration-300"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Sign-In / User Button */}
          <div className="hidden md:flex items-center space-x-4">
            {!loading && !isAuthenticated && (
              <>
                <Link href="/sign-up">
                  <Button className="bg-white text-amber-900 font-semibold rounded-xl shadow hover:bg-amber-500 hover:text-white transition-all">
                    Sign Up
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="bg-white text-amber-900 font-semibold rounded-xl shadow hover:bg-amber-500 hover:text-white transition-all">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-white text-amber-900 rounded-xl shadow flex items-center space-x-2 hover:bg-amber-500 hover:text-white transition-all">
                    <User className="h-5 w-5" />
                    <span className="font-semibold">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="rounded-xl shadow-md"
                >
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
                <Button variant="outline" size="icon" className="rounded-lg">
                  <Menu className="h-6 w-6 text-amber-900" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-xl shadow-md">
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

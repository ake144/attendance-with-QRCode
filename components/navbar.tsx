"use client";

import { Menu, User, LogOut } from "lucide-react";
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
    <nav className="border-b bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 sticky top-0 z-50 shadow-xl backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 sm:space-x-4 group"
          >
            <div className="relative">
              <Image
                src="/logo1.png"
                alt="YouGO City Church"
                width={160} // Increased from 120
                height={70} // Increased from 60
                className="rounded-2xl h-16 w-24 sm:h-20 sm:w-32 md:h-23 md:w-40 lg:h-28 lg:w-28 object-cover transition-transform duration-300 group-hover:scale-110 ring-3 ring-white/30" // Increased sizes and enhanced ring
                priority // Ensures priority loading for LCP
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-md md:text-xl lg:text-3xl font-bold text-white drop-shadow-lg tracking-wide">
                YouGO City Church
              </span>
              {/* <span className="text-sm md:text-base text-amber-100/90 font-medium mt-1">
                Faith • Community • Growth
              </span> */}
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
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
                className="relative text-white hover:text-amber-100 text-lg font-semibold transition-all duration-300 
                         group px-3 py-2 rounded-lg hover:bg-white/10"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            {user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="relative text-white hover:text-amber-100 text-lg font-semibold transition-all duration-300 
                         group px-3 py-2 rounded-lg hover:bg-white/10 border border-white/20"
              >
                Dashboard
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
          </div>

          {/* Sign-In / User Button */}
          <div className="hidden lg:flex items-center space-x-3">
            {!loading && !isAuthenticated && (
              <>
                <Link href="/sign-up">
                  <Button className="bg-white/90 text-amber-900 font-semibold rounded-xl shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 px-6 py-2 backdrop-blur-sm">
                    Sign Up
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="bg-transparent border-2 border-white text-white font-semibold rounded-xl shadow-lg hover:bg-white hover:text-amber-900 transition-all duration-300 px-6 py-2">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-white/90 text-amber-900 rounded-xl shadow-lg flex items-center space-x-2 hover:bg-white hover:shadow-xl transition-all duration-300 px-4 py-2 backdrop-blur-sm">
                    <div className="w-8 h-8 bg-amber-900 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-semibold max-w-24 truncate">
                      {user.name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="rounded-xl shadow-xl border-0 bg-white/95 backdrop-blur-sm min-w-48"
                >
                  <DropdownMenuItem disabled className="text-amber-900">
                    <User className="h-4 w-4 mr-2" />
                    {user.email || user.phone}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl bg-white/90 border-white/20 shadow-lg hover:bg-white transition-all duration-300"
                >
                  <Menu className="h-6 w-6 text-amber-900" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-xl shadow-xl border-0 bg-white/95 backdrop-blur-sm min-w-56"
              >
                <DropdownMenuItem asChild className="hover:bg-amber-50">
                  <Link href="/" className="flex items-center">
                    <span className="font-medium">Home</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-amber-50">
                  <Link href="/events" className="flex items-center">
                    <span className="font-medium">Events</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-amber-50">
                  <Link href="/about" className="flex items-center">
                    <span className="font-medium">About</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-amber-50">
                  <Link href="/donate" className="flex items-center">
                    <span className="font-medium">Donate</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-amber-50">
                  <Link href="/prayer" className="flex items-center">
                    <span className="font-medium">Prayer Request</span>
                  </Link>
                </DropdownMenuItem>
                {user?.role === "ADMIN" && (
                  <DropdownMenuItem asChild className="hover:bg-amber-50">
                    <Link href="/admin" className="flex items-center">
                      <span className="font-medium">Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                {!loading && !isAuthenticated && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="hover:bg-amber-50">
                      <Link href="/sign-up" className="flex items-center">
                        <span className="font-medium text-amber-900">
                          Sign Up
                        </span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="hover:bg-amber-50">
                      <Link href="/login" className="flex items-center">
                        <span className="font-medium text-amber-900">
                          Sign In
                        </span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                {user && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem disabled className="text-amber-900">
                      <div className="w-6 h-6 bg-amber-900 rounded-full flex items-center justify-center mr-2">
                        <User className="h-3 w-3 text-white" />
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      <span className="font-medium">Sign Out</span>
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

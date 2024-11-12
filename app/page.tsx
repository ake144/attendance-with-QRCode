'use client'

import { Button } from "@/components/ui/button";
import {  QrCodeIcon, ShieldCheckIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { useAuth } from '@clerk/nextjs';
import Image from "next/image";

import { useRouter } from "next/navigation";


export default function Home() {
  const { isSignedIn } = useAuth();

  const router = useRouter()


  const handleStart = () => {
    if (isSignedIn) {
      router.push('/dashboard');
    } else {
      router.push('/sign-up');
    }
  };


  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-background to-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <Image src='/church-logo.jpg'  alt='church logo' width={400} height={300} className="h-20 w-20 mx-auto mb-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Digital Identity for You GO Church Community
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Generate secure QR codes for yourself. Streamline attendance, events, and your identification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg" onClick={handleStart}>
              Get Started
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg">
              <Link  href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose Church QR?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <QrCodeIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Easy QR Generation</h3>
              <p className="text-muted-foreground">
                Create personalized QR codes for each member in seconds. Update information instantly.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <ShieldCheckIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your members&apos; data is encrypted and protected. Only authorized personnel can access information.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <UsersIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Member Management</h3>
              <p className="text-muted-foreground">
                Efficiently manage your congregation with our intuitive dashboard and member profiles.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
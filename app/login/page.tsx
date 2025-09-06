'use client';

import { useState } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();

  // Email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation (basic international format)
  const isValidPhone = (phone: string) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email && !phone) {
      toast({
        title: 'Error',
        description: 'Please provide either email or phone number',
        variant: 'destructive',
      });
      return;
    }

    if (email && !isValidEmail(email)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
      return;
    }

    if (phone && !isValidPhone(phone)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid phone number (e.g., +1234567890)',
        variant: 'destructive',
      });
      return;
    }

    if (!name.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter your name',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await login({ 
        email: email || undefined, 
        phone: phone || undefined, 
        name: name.trim() 
      });
      
      toast({
        title: 'Success',
        description: 'Logged in successfully!',
      });

      router.push('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Login failed. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to YouGo Church</CardTitle>
          <CardDescription>
            Sign in with your email or phone number. New users will have accounts created automatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name (Optional)</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            
            <div className="text-center text-sm text-gray-500">OR</div>
            
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1234567890"
              />
            </div>
            
            <div className="text-xs text-gray-500 text-center">
              * At least one contact method (email or phone) is required
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            {/* Signup Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link href="/sign-up" className="text-blue-600 hover:text-blue-700 font-medium">
                  Create one here
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 
"use client";

import { useAuthStore } from '@/stores/auth-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users, Calendar, Heart, Globe, BookOpen, Shield, Star } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to{' '}
            <span className="text-[#379AFE]">YouGo</span> City Church
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our vibrant community where faith, fellowship, and growth come together. 
            Experience the love of Christ in every service and event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <Link href="/login">
                  <Button size="lg" className="bg-[#379AFE] hover:bg-[#49A3EF] text-lg px-8 py-3">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="lg" variant="outline" className="text-[#379AFE] border-[#379AFE] hover:bg-[#379AFE] hover:text-white text-lg px-8 py-3">
                    Join Us
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/dashboard">
                <Button size="lg" className="bg-[#379AFE] hover:bg-[#49A3EF] text-lg px-8 py-3">
                  Go to Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[#379AFE]" />
              </div>
              <CardTitle className="text-xl mb-2">Community</CardTitle>
              <CardDescription>
                Connect with fellow believers in a warm, welcoming environment
              </CardDescription>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl mb-2">Events</CardTitle>
              <CardDescription>
                Participate in various church activities and special events
              </CardDescription>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl mb-2">Spiritual Growth</CardTitle>
              <CardDescription>
                Grow in your faith through Bible study and spiritual guidance
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="flex justify-center mb-6">
                <div className="bg-red-100 p-4 rounded-full">
                  <Heart className="h-12 w-12 text-red-500" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Support Our Mission
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Your generous donations help us continue our work in the community, 
                maintain our facilities, and spread the message of hope and love.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Community Programs</h3>
                  <p className="text-gray-600">40% of donations</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Facilities & Maintenance</h3>
                  <p className="text-gray-600">30% of donations</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Globe className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Missions & Outreach</h3>
                  <p className="text-gray-600">20% of donations</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/donate">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 py-3">
                    <Heart className="h-5 w-5 mr-2" />
                    Donate Now
                  </Button>
                </Link>
                <Link href="/donate">
                  <Button size="lg" variant="outline" className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white text-lg px-8 py-3">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-[#379AFE]">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Join Our Community</h3>
              <p className="text-gray-600">
                Sign up and become part of our growing church family
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-[#379AFE]">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Attend Services</h3>
              <p className="text-gray-600">
                Mark your attendance and stay connected with our community
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-[#379AFE]">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Grow Together</h3>
              <p className="text-gray-600">
                Participate in events and strengthen your faith journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#379AFE] to-[#49A3EF]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Join Us?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience the warmth of our community and grow in your faith journey with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <Link href="/sign-up">
                  <Button size="lg" variant="secondary" className="text-[#379AFE] bg-white hover:bg-gray-100 text-lg px-8 py-3">
                    Get Started Today
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/events">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-[#379AFE] text-lg px-8 py-3">
                    View Events
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" className="text-[#379AFE] bg-white hover:bg-gray-100 text-lg px-8 py-3">
                  Go to Dashboard
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

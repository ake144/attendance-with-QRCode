"use client";

import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Users,
  Calendar,
  Heart,
  Globe,
  BookOpen,
  Shield,
  Star,
  QrCodeIcon,
  ShieldCheckIcon,
  UsersIcon,
  Church,
  HeartHandshake,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import LocationSection from "@/components/location/locationSection";
import ServicesSection from "@/components/services/serviceSection";
import { FlipWords } from "@/components/ui/flip-words";
import { HeroImages } from "@/components/landingImages";

export default function HomePage() {
  const { user, isAuthenticated } = useAuthStore();
  const words = ["Home", "our Community", "your Family", "YouGo Church"];

   const steps = [
    {
      number: 1,
      title: 'Join Our Community',
      description: 'Sign up and become part of our growing church family.',
      icon: <Users className="h-8 w-8 text-amber-300" />,
    },
    {
      number: 2,
      title: 'Attend Services',
      description: 'Stay connected with uplifting worship and fellowship.',
      icon: <Church className="h-8 w-8 text-amber-300" />,
    },
    {
      number: 3,
      title: 'Grow Together',
      description: 'Participate in events and strengthen your faith journey.',
      icon: <HeartHandshake className="h-8 w-8 text-amber-300" />,
    },
  ];


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative md:hidden bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-[#379AFE]">YouGo City Church</span>{" "}
            <br />
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our vibrant community where faith, fellowship, and growth come
            together. Experience the love of Christ in every service and event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <Link href="/login">
                  <Button
                    size="lg"
                    className="bg-[##b58b0b] hover:bg-[#49A3EF] text-lg px-8 py-3"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-[#379AFE] border-[#379AFE] hover:bg-[#379AFE] hover:text-white text-lg px-8 py-3"
                  >
                    Join Us
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-[#379AFE] hover:bg-[#49A3EF] text-lg px-8 py-3"
                >
                  Go to Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="relative hidden  md:flex items-center justify-center h-screen w-full overflow-hidden">
        {/* Fullscreen Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/jy66YEmCwko?autoplay=1&mute=1&controls=0&disablekb=1&loop=1&playlist=jy66YEmCwko&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&showinfo=0"
            title="Church Introduction Video"
            frameBorder="0"
            className="absolute top-0 left-0 w-[200%] h-[300%]  -translate-y-1/2 pointer-events-none"
            allow="autoplay; fullscreen; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>

        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10" />

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-wide drop-shadow-lg">
            Welcome to <FlipWords words={words} /> <br />
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow-md">
            Join us in worship, fellowship, and faith every week. Experience
            God’s love in action.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            {!isAuthenticated ? (
              <>
                {/* <Link href="/login">
                  <Button
                    size="lg"
                    className="bg-[#379AFE] hover:bg-[#49A3EF] text-lg px-8 py-3 rounded-2xl shadow-xl"
                  >
                    Sign In
                  </Button>
                </Link> */}
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="text-black bg-[#F09F2C] hover:text-xl border-amber-400  hover:bg-[#f59207]  text-lg px-8 py-3 rounded-2xl shadow-xl"
                  >
                    Join Us
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-[#379AFE] hover:bg-[#49A3EF] text-lg px-8 py-3 rounded-2xl shadow-xl"
                >
                  Go to Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 ">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Title */}
          <h2 className="text-4xl font-bold text-center text-amber-900 mb-6">
            Join Our Community of Faith, Love, and Growth
          </h2>
          <p className="text-lg text-gray-700 text-center mb-16 max-w-2xl mx-auto">
            At YouGO City Church, we cultivate a vibrant community where you can
            grow spiritually, engage in fellowship, and find your place of
            belonging.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: QrCodeIcon,
                title: "Why Become a Member?",
                description:
                  "Engage in spiritual growth with resources, teachings, and events. Join us in serving through outreach programs, and enjoy accountability and support.",
              },
              {
                icon: ShieldCheckIcon,
                title: "Membership Benefits",
                description:
                  "Participate in all church programs, receive pastoral care, take on leadership roles, and stay updated with exclusive newsletters.",
              },
              {
                icon: UsersIcon,
                title: "Who Can Join?",
                description:
                  "We welcome individuals and families who have accepted Jesus Christ as their Savior, seek a place to worship, and support our mission.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-amber-400 p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-amber-200"
              >
                <div className="flex items-center mb-5">
                  <feature.icon className="h-10 w-10 text-amber-600" />
                  <h3 className="ml-4 text-xl font-semibold text-amber-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="py-20 bg-white">
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
      </section> */}

      {/* Donation Section */}
      <section className="py-20 ">
        {/* <div className="container mx-auto px-4 text-center">
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
                Your generous donations help us continue our work in the
                community, maintain our facilities, and spread the message of
                hope and love.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    Community Programs
                  </h3>
                  <p className="text-gray-600">40% of donations</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    Facilities & Maintenance
                  </h3>
                  <p className="text-gray-600">30% of donations</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Globe className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    Missions & Outreach
                  </h3>
                  <p className="text-gray-600">20% of donations</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/donate">
                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-lg px-8 py-3"
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Donate Now
                  </Button>
                </Link>
                <Link href="/donate">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white text-lg px-8 py-3"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div> */}
        <ServicesSection />
      </section>

      <HeroImages  />
      

       <section className="py-20 ">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
            How to Get Connected
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Getting started with us is simple. Follow these steps and 
            start your journey of faith and fellowship.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 text-center border border-blue-100 hover:-translate-y-1"
            >
              {/* Number Circle */}
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-white text-2xl font-bold shadow-lg group-hover:scale-105 transition-transform">
                {step.number}
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-4">{step.icon}</div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

      <section className="py-20 bg-church-warm">
        {/* <LocationSection  /> */}
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-400 to-amber-400">
        <div className="container mx-auto px-6 text-center">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-amber-900 mb-6">
            Ready to Join Us?
          </h2>
          <p className="text-md md:text-2xl text-amber-800 mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience the warmth of our community and grow in your faith
            journey with us.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="bg-white text-amber-900 font-semibold rounded-xl shadow px-8 py-3 text-lg 
                         hover:bg-amber-500 hover:text-white transition-all"
                  >
                    Get Started Today
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>

                <Link href="/donate">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white bg-transparent text-white font-semibold rounded-xl shadow px-8 py-3 text-lg
                         hover:bg-white hover:text-amber-900 transition-all"
                  >
                    Support YouGo Church
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-white text-amber-900 font-semibold rounded-xl shadow px-8 py-3 text-lg 
                       hover:bg-amber-500 hover:text-white transition-all"
                >
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

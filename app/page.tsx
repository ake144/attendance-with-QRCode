'use client'

import { Button } from "@/components/ui/button"
import { QrCodeIcon, ShieldCheckIcon, UsersIcon } from 'lucide-react'
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { PulsatingButton } from "@/components/ui/join"

export default function Home() {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  const handleStart = () => {
    if (isSignedIn) {
      router.push("/dashboard")
    } else {
      router.push("/sign-in?redirectUrl=/dashboard")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
   {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 h-screen overflow-hidden">
              {/* Background Image */}
              <Image
                src="/yougo5.jpg"
                alt="Church community gathering"
                layout="fill"
                objectFit="cover"
                quality={100}
                priority
                className="absolute z-0"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-transparent z-10" />
              
              {/* Content */}
              <div className="relative z-20 flex flex-col items-center gap-8 text-center max-w-4xl mx-auto">
                {/* Heading */}
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-wide">
                  Welcome to Our Community
                </h1>
                {/* Subtitle */}
                {/* <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                  Discover a welcoming space for everyone to connect, grow, and celebrate together.
                </p> */}
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* <Button
                    size="lg"
                    className="px-8 py-4 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg focus:ring-4 focus:ring-blue-300 focus:outline-none"
                    onClick={handleStart}
                    aria-label="Get Started"
                  >
                    Get Started
                  </Button> */}

                        <button
                          className="group relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring"
                          onClick={handleStart}
                          aria-label="Get Started"
                        >
                          <span
                            className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"
                          ></span>

                          <span
                            className="relative text-lg font-bold  text-white transition-colors group-hover:text-white"
                          >
                            Get Started
                          </span>
                        </button>

                              
                </div>
              </div>
            </section>



     {/* Features Section */}
            <section className="py-24 bg-gray-100">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
                  Join Our Community of Faith, Love, and Growth
                </h2>
                <p className="text-lg text-gray-700 text-center mb-16">
                  At City of Refuge Church, we cultivate a vibrant community where you can grow spiritually, engage in fellowship, and find your place of belonging. Becoming a member is a profound step towards deepening your connection with God and others.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {[
                    {
                      icon: QrCodeIcon,
                      title: "Why Become a Member?",
                      description: "Engage in spiritual growth with access to resources, teachings, and events. Join us in serving through outreach programs, and enjoy accountability and support from our church family."
                    },
                    {
                      icon: ShieldCheckIcon,
                      title: "Membership Benefits",
                      description: "Participate in all church programs and activities, receive pastoral care and counseling, take on leadership roles, and stay updated with exclusive newsletters."
                    },
                    {
                      icon: UsersIcon,
                      title: "Who Can Join?",
                      description: "We welcome individuals and families who have accepted Jesus Christ as their Savior, seek a place to worship, and are committed to supporting our mission."
                    }
                  ].map((feature, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
                      <div className="flex items-center mb-4">
                        <feature.icon className="h-8 w-8 text-primary" />
                        <h3 className="ml-3 text-xl font-semibold text-gray-800">{feature.title}</h3>
                      </div>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Register", description: "Sign up and create your church profile" },
              { title: "Generate QR Codes", description: "Create unique QR codes for your members" },
              { title: "Connect & Engage", description: "Use QR codes for events, attendance, and more" }
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center mb-6 text-2xl font-bold">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {/* <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-3">
          <Image
            src="/yougo5.jpg"
            alt="Church community"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <blockquote className="text-center">
                <p className="text-2xl font-medium italic mb-8">
                &ldquo;Church QR has transformed how we connect with our congregation. It&apos;s made our Sunday services and events more engaging and personal!&rdquo;
                </p>
                <footer className="font-semibold">
                  - Pastor Sarah Johnson, Grace Community Church
                </footer>
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </section> */}

      {/* CTA Section */}
       {/* CTA Section */}
       <section className="text-center py-24 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Become Part of the You GO Family?
          </h2>
          <p className="text-xl mb-8">
            Join us today and experience the power of community.
          </p>
          <PulsatingButton
            onClick={handleStart}
            className="text-lg flex items-center justify-center px-8"
          >
            Join Our Community
          </PulsatingButton>
        </section>

    </div>
  )
}
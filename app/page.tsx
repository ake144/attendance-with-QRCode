'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCodeIcon, ChurchIcon, ShieldCheckIcon, UsersIcon, ChevronRight } from 'lucide-react'
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import Image from "next/image"
import FooterPage from "@/components/footer"

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
      <section className="relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 h-[90vh] overflow-hidden">
  <Image
    src="/yougo5.jpg"
    alt="Church community gathering"
    layout="fill"
    objectFit="cover"
    quality={100}
    className="absolute z-0"
  />
  {/* Background Gradient */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60 z-10" />
  
  {/* Content */}
  <div className="max-w-5xl mx-auto text-center relative z-20 flex flex-col items-center gap-8">
  
    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-4">
      <Button
        size="lg"
        className="text-lg px-8 py-4 font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg"
        onClick={handleStart}
        aria-label="Get Started"
      >
        Get Started
      </Button>
      <Button
        asChild
        size="lg"
        variant="outline"
        className="text-lg px-8 py-4 font-medium bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-lg shadow-lg"
        aria-label="Learn More"
      >
        <Link href="/about">Learn More</Link>
      </Button>
    </div>
  </div>
</section>


      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Join Our Community of Faith, Love, and Growth</h2>
            <p>At City of Refuge Church, we believe in creating a community where everyone can grow spiritually, share in fellowship, and find a place of belonging. Becoming a member is a step toward deepening your connection with God and others in our church family.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: QrCodeIcon,
                title: "Why become a member?",
                description: "Spiritual Growth. Access resources, teachings, and events that nurture your spiritual life.Service Opportunities. Join us in serving others through outreach programs, missions, and church ministries.Accountability & Support. "
              },
              {
                icon: ShieldCheckIcon,
                title: "Membership Benefits",
                description: "articipation in all church programs and activities.Pastoral care and counseling.Opportunities to serve in ministry and leadership roles.Exclusive updates on church events, newsletters, and announcements."
              },
              {
                icon: UsersIcon,
                title: "Who Can Join?",
                description: "We welcome individuals and families who:Have accepted Jesus Christ as their Savior.Are seeking a place to worship and grow in faith. Are committed to supporting the vision and mission of City of Refuge Church "
              }
            ].map((feature, index) => (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <feature.icon className="h-6 w-6 text-primary" />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
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
       <section className="text-center py-24  ">
          <h2 className="text-3xl font-bold mb-4">Ready to Become Part of the You GO Family?</h2>
          <p className="text-xl mb-8">Join us today and experience the power of community.</p>
          <Button size="lg" className="text-lg px-8">
            <Link href="/dashboard">
            Join Our Community 
            </Link>
          </Button>
        </section>
       <FooterPage  />
    </div>
  )
}
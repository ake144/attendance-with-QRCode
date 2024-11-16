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
      <section className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-32 overflow-hidden">
        <Image
          src="/yougo.jpg"
          alt="Church community gathering"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="absolute z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
        <div className="max-w-5xl mx-auto text-left relative z-20 flex flex-col md:flex-row items-center">
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
          <ChurchIcon className="h-24 w-24 mx-auto mb-8 text-white animate-pulse" />
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-6 text-white drop-shadow-lg">
            Digital Identity for Your Church Community
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Generate secure QR codes for your congregation. Streamline attendance, events, and member identification with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" onClick={handleStart}>
              Get Started
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 hover:bg-white/20 text-white border-white/20">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
 

        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Church QR?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: QrCodeIcon,
                title: "Easy QR Generation",
                description: "Create personalized QR codes for each member in seconds. Update information instantly."
              },
              {
                icon: ShieldCheckIcon,
                title: "Secure & Private",
                description: "Your members' data is encrypted and protected. Only authorized personnel can access information."
              },
              {
                icon: UsersIcon,
                title: "Member Management",
                description: "Efficiently manage your congregation with our intuitive dashboard and member profiles."
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
      <section className="py-24 bg-gray-50 relative overflow-hidden">
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
      </section>

      {/* CTA Section */}
       {/* CTA Section */}
       <section className="text-center py-24  ">
          <h2 className="text-3xl font-bold mb-4">Ready to Become Part of the You GO Family?</h2>
          <p className="text-xl mb-8">Join us today and experience the power of community.</p>
          <Button size="lg" className="text-lg px-8">
            Join Our Community <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </section>
      

       <FooterPage  />
    </div>
  )
}
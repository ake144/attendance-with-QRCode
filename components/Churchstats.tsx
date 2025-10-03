import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Marquee } from "./ui/marquee"

const ministries = [
  {
    title: "Salvation Classes",
    icon: "📖",
    body: "Deepen your faith—over 6,000 baptized! Tuesdays 6-7:30pm & Sundays 7:30-9am.",
    img: "/ministry-salvation.jpg",
  },
  {
    title: "Care Groups",
    icon: "🏠",
    body: "Home-based fellowship assigned by location. Over 15 groups launching this year!",
    img: "/ministry-care.jpg",
  },
  {
    title: "Choir",
    icon: "🎤",
    body: "Praise through song. Join our 4 choirs: Mon/Tue/Thu at 6pm.",
    img: "/ministry-choir.jpg",
  },
  {
    title: "Ushers Meeting",
    icon: "🚪",
    body: "Welcome guests with warmth. Meetings: Mon/Tue/Thu at 6pm.",
    img: "/ministry-ushers.jpg",
  },
  {
    title: "Media Teams",
    icon: "📹",
    body: "Amplify our message digitally. From streaming to graphics—get involved!",
    img: "/ministry-media.jpg",
  },
  {
    title: "Prayer Meetings",
    icon: "🙏",
    body: "Intercede together. Mon nights 6pm, mornings on WhatsApp/Zoom, Fridays 6-8pm.",
    img: "/ministry-prayer.jpg",
  },
  {
    title: "Sunday School",
    icon: "👨‍👩‍👧‍👦",
    body: "Teaching 300+ kids every Sunday. Nurture the next generation!",
    img: "/ministry-sunday-school.jpg",
  },
  {
    title: "Cleaning Crew",
    icon: "🧹",
    body: "Keep our space welcoming. Join as a custodian volunteer.",
    img: "/ministry-cleaning.jpg",
  },
]

const firstRow = ministries.slice(0, ministries.length / 2)
const secondRow = ministries.slice(ministries.length / 2)

const MinistryCard = ({
  img,
  title,
  icon,
  body,
}: {
  img: string
  title: string
  icon: string
  body: string
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-80 cursor-pointer overflow-hidden rounded-lg border p-6 shadow-md",
        // Theme: Orange accents, white bg
        "border-[#F09F2C]/30 bg-white hover:border-[#F09F2C] hover:shadow-lg hover:bg-orange-50/50",
        // Dark mode support (if applicable)
        "dark:border-[#F09F2C]/20 dark:bg-gray-800/50 dark:hover:border-[#F09F2C] dark:hover:bg-gray-700/70"
      )}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          {/* <img 
            className="rounded-full w-16 h-16 object-cover border-2 border-[#F09F2C]" 
            width="64" 
            height="64" 
            alt="" 
            src={img} 
          /> */}
          <span className="rounded-full w-56 h-56 object-cover border-2">{icon}</span>
        </div>
        <div className="space-y-2">
          <figcaption className="text-2xl font-bold text-[#F09F2C]">
            {title}
          </figcaption>
          <blockquote className="text-lg text-gray-600 leading-relaxed">{body}</blockquote>
        </div>
        <Link href="/about#ministries">
          <Button
            variant="outline"
            size="sm"
            className="text-[#F09F2C] border-[#F09F2C] hover:bg-[#F09F2C] hover:text-white transition-all mt-2"
          >
            Join Now
          </Button>
        </Link>
      </div>
    </figure>
  )
}

export function MinistryMarquee() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center mb-8">
          <h2 className="text-3xl font-bold text-[#F09F2C] mb-4 text-center">
            Discover Our Vibrant Ministries
          </h2>
          <p className="text-gray-600 text-center max-w-md">
            Scroll to explore ways to serve, grow, and connect in our community.
          </p>
        </div>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:25s] [mask-image:linear-gradient(to_right,transparent_0,white_20%,white_80%,transparent_100%)]">
            {firstRow.map((ministry) => (
              <MinistryCard key={ministry.title} {...ministry} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:25s] [mask-image:linear-gradient(to_right,transparent_0,white_20%,white_80%,transparent_100%)]">
            {secondRow.map((ministry) => (
              <MinistryCard key={ministry.title} {...ministry} />
            ))}
          </Marquee>
          {/* Fade edges for seamless scroll */}
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white to-transparent"></div>
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-transparent to-white"></div>
        </div>
        <div className="text-center mt-8">
          <Link href="/about#ministries">
            <Button
              size="lg"
              className="bg-[#F09F2C] text-white font-bold px-8 py-3 rounded-lg shadow-md hover:bg-amber-600 transition-all"
            >
              Explore All Ministries
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react"; // Install lucide-react if needed

export default function MinistriesSection() {
  const [open, setOpen] = useState<Record<number, boolean>>({}); // For accordion toggles

  const toggle = (id: number) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const ministries = [
    {
      title: "Salvation Classes",
      icon: "📖",
      description: "Deepen your faith journey. After taking our classes, over 6,000 people have been baptized!",
      details: "Classes Schedule:\n- Tuesday: 6:00pm - 7:30pm\n- Sunday: 7:30am - 9:00am",
      cta: { label: "Join a Class", link: "/contact?ministry=salvation" },
    },
    {
      title: "Care Groups",
      icon: "🏠",
      description: "Home-based fellowship for support and growth, assigned based on your living/working address for convenience.",
      details: "We're building our database—soon we'll have over 15 home cares this year!",
      cta: { label: "Sign Up for a Group", link: "/contact?ministry=care" },
    },
    {
      title: "Choir",
      icon: "🎤",
      description: "Praise through song with our dedicated choirs.",
      details: "Four choirs available:\n- Two on Monday at 6:00pm\n- Tuesday at 6:00pm\n- Thursday at 6:00pm",
      cta: { label: "Join Choir", link: "/contact?ministry=choir" },
    },
    {
      title: "Ushers Meeting",
      icon: "🚪",
      description: "Serve as welcoming hosts during services.",
      details: "Meetings:\n- Monday at 6:00pm\n- Tuesday at 6:00pm\n- Thursday at 6:00pm",
      cta: { label: "Become an Usher", link: "/contact?ministry=ushers" },
    },
    {
      title: "Media Teams",
      icon: "📹",
      description: "Handle the church's media needs, from streaming to graphics.",
      details: "Join our team to amplify our message digitally.",
      cta: { label: "Volunteer for Media", link: "/contact?ministry=media" },
    },
    {
      title: "Prayer Meetings",
      icon: "🙏",
      description: "Dedicated times for intercession and spiritual renewal.",
      details: "- Monday nights at 6:00pm; mornings on WhatsApp/Zoom at 5:30am\n- Fridays: 6:00pm - 8:00pm\n- 3 times a year: 40 Days Fast and Prayer",
      cta: { label: "Join Prayer", link: "/prayer?ministry=prayer" },
    },
    {
      title: "Sunday School",
      icon: "👨‍👩‍👧‍👦",
      description: "Teaching around 300 kids every Sunday with age-appropriate Bible lessons.",
      details: "Nurturing the next generation in faith.",
      cta: { label: "Volunteer or Enroll", link: "/contact?ministry=sunday-school" },
    },
    {
      title: "Cleaning Crew",
      icon: "🧹",
      description: "Maintain the cleanliness and order of our church facilities.",
      details: "Multiple volunteers serving as custodians—your help keeps our space welcoming!",
      cta: { label: "Join Cleaning Team", link: "/contact?ministry=cleaning" },
    },
  ];

  return (
    <section id="ministries" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#F09F2C] mb-12 text-center">
          Our Ministries: Serve, Grow, and Connect
        </h2>
        <p className="text-xl text-gray-600 mb-8 text-center max-w-3xl mx-auto">
          At YouGo Main Church, our ministries are the heart of our community. Whether through prayer, teaching, or service, there's a place for you to get involved and make an impact.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ministries.map((ministry, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border border-[#F09F2C] transition-all hover:shadow-xl">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{ministry.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-800">{ministry.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{ministry.description}</p>
                <button
                  onClick={() => toggle(index)}
                  className="w-full text-left text-[#F09F2C] font-medium flex justify-between items-center hover:underline"
                >
                  View Details {open[index] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {open[index] && (
                  <p className="text-gray-600 mt-2 whitespace-pre-line animate-fade-in">{ministry.details}</p>
                )}
              </div>
              <div className="p-6 pt-0">
                <Link href={ministry.cta.link}>
                  <Button className="w-full bg-[#F09F2C] text-white hover:bg-amber-600 transition-all">
                    {ministry.cta.label}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/donate?for=ministries">
            <Button size="lg" className="bg-[#F09F2C] text-white hover:bg-amber-600 mr-4">
              Support Our Ministries
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="text-[#F09F2C] border-[#F09F2C] hover:bg-[#F09F2C] hover:text-white">
              Learn More or Volunteer
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
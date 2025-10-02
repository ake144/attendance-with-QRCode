"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import icons from lucide-react (install if needed: npm i lucide-react)
import { useState } from "react";

export default function AyatChurchSection() {
  const [faqOpen, setFaqOpen] = useState([false, false, false]); // For FAQ accordion

  const toggleFaq = (index: number) => {
    const newOpen = [...faqOpen];
    newOpen[index] = !newOpen[index];
    setFaqOpen(newOpen);
  };


  const milestones = [
    {
      date: "Jan 2025",
      title: "Groundbreaking Ceremony",
      description: "Official start with community prayer.",
      complete: true,
    },
    {
      date: "Aug 2025",
      title: "Foundation Completed",
      description: "Solid base laid for the structure.",
      complete: true,
    },
    {
      date: "Nov 2025",
      title: "Framing Underway",
      description: "Walls and roof taking shape.",
      complete: true,
    },
    {
      date: "Jan 2026",
      title: "Interior Work Begins",
      description: "Plumbing, electrical, and worship space setup.",
      complete: false,
    },
    {
      date: "Mid-2026",
      title: "Grand Opening",
      description: "Dedication service and community celebration.",
      complete: false,
    },
  ];



  const mediaItems = [
    
       {
      type: "image",
      src: "/ayat2.jpg",
      alt: "Framing Progress",
      caption: "Yougo church Ayat construction in progress - Sep 2025",
    },
  
    {
      type: "facebookVideo",
      src: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fweb.facebook.com%2Freel%2F1267140475167981%2F&show_text=false&width=267&t=0",
      title: "Watch our latest construction update yougo church ayat",
    },
     {
      type: "facebookVideo",
      src: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fweb.facebook.com%2Freel%2F24221678690834799%2F&show_text=false&width=267&t=0",
      title: "Watch our latest construction update yougo church ayat",
    },
        {
      type: "facebookVideo",
      src: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fweb.facebook.com%2Freel%2F1003223545152532%2F&show_text=false&width=267&t=0",
      title: "yougo church ayat construction update",
    },
      {
      type: "image",
      src: "/ayat.jpg",
      alt: "Foundation Progress",
      caption: "Foundation Pour - Aug 2025",
    },
  ];

  const progressPercentage = 30; 

  return (
    <section id="ayat-church" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#F09F2C] mb-12 text-center animate-fade-in">
          Building Ayat Church: Our Vision Taking Shape
        </h2>

        {/* Hero Overview */}
        <div className="max-w-9xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-[#F09F2C] mb-12 transition-all hover:shadow-2xl">
          <div className="md:flex">
            <div className="md:flex-shrink-0 relative">
              <Image
                src="/ayat.jpg"
                alt="Ayat Church Construction Progress"
                width={600}
                height={400}
                className="h-full w-full object-cover md:w-96 transition-transform hover:scale-105"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 bg-[#F09F2C] text-white px-4 py-2 rounded-lg font-bold">
                {progressPercentage}% Complete
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Why We're Building Ayat Church
              </h3>
              <p className="text-gray-600 mb-6">
                Ayat Church represents our commitment to expanding God's kingdom
                in the Ethiopian community and beyond. This new worship space
                will host Bible studies, youth programs, and outreach events,
                fostering spiritual growth and unity. With modern facilities,
                we'll serve more families and deepen our impact.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/donate">
                  <Button
                    size="lg"
                    className="bg-[#F09F2C] text-white hover:bg-amber-600 transition-all"
                  >
                    Donate Now
                  </Button>
                </Link>
                {/* <Link href="/prayer">
                  <Button
                    variant="outline"
                    className="text-[#F09F2C] border-[#F09F2C] hover:bg-[#F09F2C] hover:text-white transition-all"
                  >
                    Submit a Prayer Request
                  </Button>
                </Link> */}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar & Milestones Timeline */}
        <div className="max-w-6xl mx-auto mb-12">
          <h3 className="text-2xl font-semibold text-[#F09F2C] mb-6 text-center">
            Project Milestones
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
            <div
              className="bg-[#F09F2C] h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="grid gap-6 md:grid-cols-5">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`text-center p-4 rounded-lg ${
                  milestone.complete
                    ? "bg-[#F09F2C] text-white"
                    : "bg-gray-100 text-gray-600"
                } transition-all hover:scale-105`}
              >
                <p className="font-bold">{milestone.date}</p>
                <p className="text-sm">{milestone.title}</p>
                <p className="text-xs">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>


        <div className="max-w-9xl  mx-auto mb-12">
          <h3 className="text-2xl font-semibold text-[#F09F2C] mb-6 text-center">
            Photos & Videos
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {mediaItems.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-[#F09F2C] rounded-lg overflow-hidden shadow-md transition-all hover:shadow-xl"
              >
                {item.type === "image" ? (
                  <Image
                    src={item.src}
                    alt={item.alt || "church media"}
                    width={300}
                    height={300}
                    className="w-full h-68 object-cover transition-transform hover:scale-105"
                    loading="lazy"
                  />
                ) : item.type === "facebookVideo" ? (
                  <iframe
                    className="w-full h-78"
                    src={item.src}
                    title={item.title}
                    width="267"
                    height="676"
                    style={{ border: "none", overflow: "hidden" }}
                    scrolling="no"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen={true}
                  ></iframe>
                ) : (
                  <video className="w-full h-48" controls>
                    <source src={item.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}

                <div className="p-4">
                  <p className="text-sm text-gray-600">
                    {item.caption || item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* For a real carousel, add react-responsive-carousel here */}
        </div>


        {/* Testimonials */}
        {/* <div className="max-w-5xl mx-auto mb-12">
          <h3 className="text-2xl font-semibold text-[#F09F2C] mb-6 text-center">
            What Our Community Says
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#F09F2C]">
              <p className="text-gray-600 mb-4">
                "Excited to see Ayat Church rise—it's a testament to our faith!"
              </p>
              <p className="font-bold text-[#F09F2C]">- Pastor John Doe</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#F09F2C]">
              <p className="text-gray-600 mb-4">
                "Volunteering here has strengthened my community bonds."
              </p>
              <p className="font-bold text-[#F09F2C]">- Member Jane Smith</p>
            </div>
          </div>
        </div> */}


        {/* <div className="max-w-5xl mx-auto mb-12">
          <h3 className="text-2xl font-semibold text-[#F09F2C] mb-6 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {[
              {
                q: "What is the target completion date?",
                a: "Mid-2026, God willing.",
              },
              {
                q: "How can I get involved?",
                a: "Donate, pray, or volunteer—links below!",
              },
              {
                q: "Where is Ayat Church located?",
                a: "Ayat District, Addis Ababa, Ethiopia.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md border border-[#F09F2C] overflow-hidden"
              >
                <button
                  className="w-full p-4 text-left font-semibold text-gray-800 flex justify-between items-center hover:bg-gray-50 transition-all"
                  onClick={() => toggleFaq(index)}
                >
                  {faq.q}
                  {faqOpen[index] ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                {faqOpen[index] && (
                  <p className="p-4 text-gray-600 border-t border-gray-200">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div> */}

        {/* How You Can Help - CTAs */}
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl font-semibold text-[#F09F2C] mb-6">
            How You Can Help
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/donate?project=ayat">
              <Button
                size="lg"
                className="bg-[#F09F2C] text-white hover:bg-amber-600 transition-all"
              >
                Donate to the Build
              </Button>
            </Link>
            <Link href="/prayer?topic=ayat-church">
              <Button
                variant="outline"
                className="text-[#F09F2C] border-[#F09F2C] hover:bg-[#F09F2C] hover:text-white transition-all"
              >
                Pray for Progress
              </Button>
            </Link>
            <Button
              variant="outline"
              className="text-[#F09F2C] border-[#F09F2C] hover:bg-[#F09F2C] hover:text-white transition-all"
            >
              Volunteer Opportunities
            </Button>
            <Button
              variant="outline"
              className="text-[#F09F2C] border-[#F09F2C] hover:bg-[#F09F2C] hover:text-white transition-all"
            >
              Share on Social Media
            </Button>
            <Link href="/contact">
              <Button
                variant="outline"
                className="text-[#F09F2C] border-[#F09F2C] hover:bg-[#F09F2C] hover:text-white transition-all"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

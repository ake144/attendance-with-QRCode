import { Calendar, Heart, Users } from "lucide-react";
import Link from "next/link";
import { FaPray } from "react-icons/fa";
import { Button } from "../ui/button";
import Image from "next/image";

export function MinistryOverview() {
  const ministries = [
    {
      icon: <Calendar className="w-8 h-8 text-[#F09F2C]" />,
      title: "Salvation Classes & Baptisms",
      description: "We've led over 6,000 souls to Christ through transformative classes. Join Tuesdays (6-7:30 PM) or Sundays (7:30-9 AM) to explore faith's depths.",
      stat: "6,000+ Baptized",
    },
    {
      icon: <Users className="w-8 h-8 text-[#F09F2C]" />,
      title: "Care Groups & Fellowship",
      description: "Convenient home-based groups assigned by your address—building bonds and support. Over 15 groups launching this year for deeper community.",
      stat: "15+ Groups in 2025",
    },
    {
      icon: <Heart className="w-8 h-8 text-[#F09F2C]" />,
      title: "Choir & Ushers: Worship & Welcome",
      description: "Four choirs rehearse Mon/Tue/Thu at 6 PM; ushers meet the same days to prepare warm greetings. Your gifts make services shine!",
      stat: "4 Active Choirs",
    },
    {
      icon: <FaPray className="w-8 h-8 text-[#F09F2C]" />,
      title: "Prayer Meetings & Sunday School",
      description: "Intercede Mon nights (6 PM), Fridays (6-8 PM), or mornings via WhatsApp/Zoom. Plus, weekly lessons for 300 kids in Sunday School.",
      stat: "300 Kids Weekly",
    },
    {
      title: "Behind-the-Scenes Teams",
      description: "Media Teams handle our digital reach; Cleaning Crew keeps spaces sacred. Every role—from tech to tidying—fuels our mission.",
      stat: "Volunteers Welcome",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#F09F2C] mb-12 text-center">
          Our Ministries: Heartbeat of the Church
        </h2>
        <p className="text-xl text-gray-600 mb-8 text-center max-w-3xl mx-auto">
          At YouGo Main Church, ministries aren't programs—they're pathways to grow in Christ, serve others, and build family. From prayer to praise, find your place.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ministries.map((ministry, index) => (
            <div key={index} className="bg-white border border-[#F09F2C]/30 rounded-lg shadow-md p-6 hover:shadow-lg transition-all">
              <div className="flex items-center mb-4">{ministry.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{ministry.title}</h3>
              <p className="text-gray-600 mb-4">{ministry.description}</p>
              <p className="text-[#F09F2C] font-bold text-lg mb-4">{ministry.stat}</p>
              <Link href="/events">
                <Button variant="outline" className="w-full text-[#F09F2C] border-[#F09F2C] hover:bg-[#F09F2C] hover:text-white">
                  Get Involved
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// New: Impact Stories Component
export function ImpactStories() {
  const stories = [
    {
      title: "A Journey to Baptism",
      body: "After our Salvation Class, I felt God's call clearly. Being baptized with 50 others was life-changing—now I lead a Care Group!",
      author: "— Sarah T., Member",
      image: "/story-baptism.jpg", // Placeholder
    },
    {
      title: "Prayer That Heals",
      body: "Our Friday Prayer Meetings brought breakthrough during tough times. From fasting seasons to daily Zoom calls, we've seen miracles unfold.",
      author: "— Elder Mark A., Leader",
      image: "/story-prayer.jpg",
    },
    {
      title: "Nurturing the Next Generation",
      body: "Watching 300 kids light up in Sunday School reminds us why we serve. One volunteer's story: 'Their questions fuel my faith.'",
      author: "— Teacher Lisa K., Volunteer",
      image: "/story-sunday-school.jpg",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#F09F2C] mb-12 text-center">
          Lives Transformed: Our Church's Impact
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {stories.map((story, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-[#F09F2C]/20">
              <Image
                src={story.image}
                alt={story.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{story.title}</h3>
                <p className="text-gray-600 mb-4 italic">{story.body}</p>
                <p className="text-[#F09F2C] font-bold">{story.author}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/prayer">
            <Button size="lg" className="bg-[#F09F2C] text-white hover:bg-amber-600 mr-4">
              Share Your Story
            </Button>
          </Link>
          <Link href="/donate">
            <Button variant="outline" className="text-[#F09F2C] border-[#F09F2C] hover:bg-[#F09F2C] hover:text-white">
              Support Our Impact
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
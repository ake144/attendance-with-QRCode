import Image from "next/image";
import { Button } from "@/components/ui/button";

const events = [
  {
    title: "New Year Celebration ",
    date: "Wednesday Sep 10, 2025",
    time: "7:00 PM - 8:30 PM",
    description: "Join us for Ethiopian New Year celebrations.",
    image: "/newyear1.jpg",
  },
  {
    title: "40 Days of Prayer",
    date: "Monday - Sunday",
    time: "9:00 PM - 1:00 PM",
    description: "A dedicated time for prayer and fasting.",
    image: "/ev8.jpg",
  },
  {
    title: "Conference 2025",
    date: "Aug 24,2025",
    time: "12:30pm",
    description: "Join us for our annual conference featuring guest speakers and workshops.",
    image: "/ev9.jpg",
  },
  {
    title: "Sunday Worship Service",
    date: "Every Sunday",
    time: "10:00 AM - 12:00 PM",
    description: "Join us for praise, worship, and an inspiring message.",
    image: "/ev5.jpg",
  },
  {
    title: "Prayer Meeting",
    date: "Every Tuesday",
    time: "6:00 AM - 7:00 AM",
    description: "Start your day with prayer and fellowship.",
    image: "/ev3.jpg",
  },
  {
    title: "Women's Ministry",
    date: "Second Saturday of every month",
    time: "2:00 PM - 4:00 PM",
    description: "A time for women to gather, share, and grow in faith.",
    image: "/ev1.jpg",
  },
];

export default function EventList() {
  return (
    <section id="events" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#F09F2C] mb-12 text-center">
          Upcoming Events
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white border border-[#F09F2C] rounded-lg shadow-md overflow-hidden"
            >
              <Image
                src={event.image}
                alt={event.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {event.date} | {event.time}
                </p>
                <p className="text-gray-600 mb-6">{event.description}</p>
                <Button
                  variant="outline"
                  className="text-[#F09F2C] border-[#F09F2C] hover:bg-[#F09F2C] hover:text-white"
                >
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

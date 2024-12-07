import Image from "next/image"
import { Button } from "@/components/ui/button"

const events = [
  {
    title: "Weekly Bible Study",
    date: "Every Wednesday",
    time: "7:00 PM - 8:30 PM",
    description: "Join us for an in-depth study of the scriptures.",
    image: "/ev1.jpg"
  },
  {
    title: "Youth Group Meeting",
    date: "Every Friday",
    time: "6:30 PM - 8:30 PM",
    description: "A time for young people to connect, learn, and have fun.",
    image: "/ev2.jpg"
  },
  {
    title: "Community Outreach",
    date: "First Saturday of every month",
    time: "9:00 AM - 12:00 PM",
    description: "Serve our local community through various outreach programs.",
    image: "/ev4.jpg"
  },
  {
    title: "Sunday Worship Service",
    date: "Every Sunday",
    time: "10:00 AM - 12:00 PM",
    description: "Join us for praise, worship, and an inspiring message.",
    image: "/ev5.jpg"
  },
  {
    title: "Prayer Meeting",
    date: "Every Tuesday",
    time: "6:00 AM - 7:00 AM",
    description: "Start your day with prayer and fellowship.",
    image: "/ev3.jpg"
  },
  {
    title: "Women's Ministry",
    date: "Second Saturday of every month",
    time: "2:00 PM - 4:00 PM",
    description: "A time for women to gather, share, and grow in faith.",
    image: "/ev1.jpg"
  }
]

export default function EventList() {
  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Upcoming Events</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={event.image}
                alt={event.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.date} | {event.time}</p>
                <p className="text-gray-600 mb-6">{event.description}</p>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


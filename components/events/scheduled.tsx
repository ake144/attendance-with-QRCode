import Image from "next/image";
import { Button } from "@/components/ui/button";

const schedules = [
  {
    title: "Sunday Worship Service",
    day: "Every Sunday",
    time: "8:30 AM - 10:00 PM and 11:00 AM - 1:30 PM",
    description: "Join us for praise, worship, and an inspiring message.",
    image: "/fam5.jpg", // Reuse from your events
    location: "YouGo Main Church",
  },
  {
    title: "Sunday Worship Service",
    day: "Every Sunday",
    time: "12:30 AM - 3:00 PM",
    description: "Join us for praise, worship, and an inspiring message.",
    image: "/fam13.jpg", // Reuse from your events
    location: "VA(Virginia) Church",
  },
//   {
//     title: "Prayer Meeting",
//     day: "Every Friday and Monday night at 6:00 PM",
//     time: "6:00 PM - 8:00 PM",
//     description: "3 Times a year a 40 days Fast and Prayer;  Monday nights 6:00pm and mornings on WhatsApp and zoom at 5:30am ",
//     image: "/yougo.jpg",
//     location: "YouGo Main Church",
//   },
  {
    title: "Salvation Classes",
    day: "Tuesdays & Sundays",
    time: "Tue: 6:00 PM - 7:30 PM | Sun: 7:30 AM - 9:00 AM",
    description: "Deepen your faith journey—over 6,000 baptized through these classes!",
    image: "/fam7.jpg",
    location: "YouGo Main Church",
  },
  {
    title: "Choir Rehearsals",
    day: "Mon, Tue, Thu",
    time: "6:00 PM",
    description: "Praise through song with our dedicated choirs. There are 4 choirs. 2 gathered on monday, 1 on tuesday and 1 on thursday",
    image: "/newyear5.jpg",
    location: "YouGo Main Church",
  },
  {
    title: "Ushers Meeting",
    day: "Mon, Tue, Thu",
    time: "6:00 PM",
    description: "Prepare to welcome and serve during services.",
    image: "/ushers.jpg",
    location: "YouGo Main Church",
  },
  {
    title: "Prayer Meetings",
    day: "Mondays & Fridays",
    time: "Mon: 6:00 PM | Fri: 6:00 PM - 8:00 PM (Mornings: 5:30 AM on WhatsApp/Zoom)",
    description: "Dedicated times for intercession and renewal. 3 Times a year a 40 days Fast and Prayer;",
    image: "/yougo.jpg",
    location: "YouGo Main Church",
  },
  {
    title: "Sunday School",
    day: "Every Sunday",
    time: "During Worship (Post-10:00 AM)",
    description: "Teaching around 300 kids with Bible lessons.",
    image: "/fam16.jpg",
    location: "YouGo Main Church",
  },
  {
    title: "Care Groups",
    day: "Weekly (TBD by Location)",
    time: "Evenings (Flexible)",
    description: "Home-based fellowship—over 15 groups launching this year!",
    image: "/ministry-care.jpg",
    location: "Various Home Locations",
  },
];

export default function ScheduleCards() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#F09F2C] mb-12 text-center">
          Weekly Schedule
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {schedules.map((schedule, index) => (
            <div
              key={index}
              className="bg-white border border-[#F09F2C] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <Image
                src={schedule.image}
                alt={schedule.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {schedule.title}
                </h3>
                <p className="text-[#F09F2C] font-bold mb-1">{schedule.day}</p>
                <p className="text-sm text-gray-600 mb-1">
                  ⏰ {schedule.time}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  📍 {schedule.location}
                </p>
                <p className="text-gray-600 mb-6">{schedule.description}</p>
                <Button
                  variant="outline"
                  className="w-full text-[#F09F2C] border-[#F09F2C] hover:bg-[#F09F2C] hover:text-white transition-all"
                >
                  Add to Calendar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
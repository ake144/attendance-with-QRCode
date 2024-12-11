import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function EventHero() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-[#379AFE]">
            <div className="md:flex">
              {/* Image Section */}
              <div className="md:flex-shrink-0">
                <Image
                  src="/ev2.jpg"
                  alt="Summer Celebration 2024"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover md:w-96"
                />
              </div>

              {/* Content Section */}
              <div className="p-8">
                <h1 className="text-4xl font-bold text-[#379AFE] mb-4">
                  Upcoming Featured Event
                </h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Summer Celebration 2024
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  A day of worship, fellowship, and fun for the whole family!
                </p>

                {/* Event Details */}
                <ul className="text-gray-600 mb-8 space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2">📅</span> <span>July 15, 2024</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">⏰</span> <span>10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">📍</span> <span>You Go Church Main Campus</span>
                  </li>
                </ul>

                {/* Call-to-Action Button */}
                <Button
                  size="lg"
                  className="bg-[#379AFE] text-white font-bold px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all"
                >
                  Register Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

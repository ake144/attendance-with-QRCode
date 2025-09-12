import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function EventHero() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-[#F09F2C]">
            <div className="md:flex">
              {/* Image Section */}
              <div className="md:flex-shrink-0">
                <Image
                  src="/bible.jpg"
                  alt="Summer Celebration 2024"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover md:w-96"
                />
              </div>

              {/* Content Section */}
              <div className="p-8">
                <h1 className="text-4xl font-bold text-[#F09F2C] mb-4">
                  Upcoming Featured Event
                </h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                   Bible Study Schedule for 2025
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  A yearly bible study schedule to deepen understanding of the scriptures.
                </p>

                {/* Event Details */}
                <ul className="text-gray-600 mb-8 space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2">📅</span> <span>Sep 12, 2025</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">⏰</span> <span>Flexible timing—join at your convenience</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">📍</span> <span>YouGo Main Church</span>
                  </li>
                </ul>

                {/* Call-to-Action Button */}
                <Button
                  size="lg"
                  className="bg-[#F09F2C] text-white font-bold px-6 py-3 rounded-lg shadow-md hover:bg-amber-600 transition-all"
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

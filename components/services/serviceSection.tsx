"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ServicesSection = () => {
  const services = [
    {
      title: "Sunday Morning Worship",
      time: "9:00 AM",
      description:
        "Join us for inspiring worship, biblical teaching, and fellowship.",
      audience: "All Ages Welcome",
      features: [
        "Contemporary Worship",
        "Children's Ministry",
        "Coffee & Fellowship",
      ],
      image: "/com7.jpg", // <- Add a nice worship image here
    },
    {
      title: "Sunday Evening Service",
      time: "6:00 PM",
      description:
        "A more intimate gathering focused on prayer and deeper study.",
      audience: "Teens & Adults",
      features: ["Prayer Focus", "Bible Study", "Small Group Discussion"],
      image: "/com8.jpg", // <- Add evening church/prayer image
    },
    {
      title: "Wednesday Bible Study",
      time: "7:00 PM",
      description:
        "Dive deeper into God's word with our midweek study groups.",
      audience: "All Ages",
      features: [
        "Verse-by-Verse Study",
        "Group Discussion",
        "Prayer Time",
      ],
      image: "/com7.jpg", // <- Add Bible study image
    },
  ];

  return (
    <section id="services" className="py-24 ">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
            Service Times
          </h2>
          <p className="max-w-3xl text-gray-700 mx-auto text-lg leading-relaxed">
            Come as you are and experience the love of Christ in a welcoming
            environment. We have services designed to meet you wherever you are
            in your faith journey.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10 mb-16">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-0 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              {/* Top Image */}
              {service.image && (
                <div className="relative h-40 w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Card Header */}
              <CardHeader className="bg-amber-400 text-amber-900 p-6">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-xl font-semibold">{service.title}</span>
                  <Clock className="h-5 w-5 text-amber-900" />
                </CardTitle>
                <div className="font-bold text-2xl mt-2">{service.time}</div>
              </CardHeader>

              {/* Card Content */}
              <CardContent className="p-6 bg-white">
                <p className="mb-4 text-gray-700 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex items-center gap-2 mb-4 text-sm font-medium text-amber-700">
                  <Users className="h-4 w-4" />
                  {service.audience}
                </div>

                <div className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-white shadow-xl rounded-2xl p-10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-amber-900">
              First Time Visiting?
            </h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              We'd love to meet you! Our greeters will help you find your way
              around, and we have special seating reserved for first-time
              guests.
            </p>
            <Link href="/sign-up">
              <Button className="bg-amber-400 text-amber-900 hover:bg-amber-500 hover:text-white rounded-xl px-6 py-3 text-lg shadow-md transition-all">
                Plan Your Visit
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

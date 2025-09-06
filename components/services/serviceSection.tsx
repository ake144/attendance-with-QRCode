'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Users, Calendar } from 'lucide-react';
import Link from 'next/link';

const ServicesSection = () => {
  const services = [
    {
      title: "Sunday Morning Worship",
      time: "9:00 AM",
      description: "Join us for inspiring worship, biblical teaching, and fellowship.",
      audience: "All Ages Welcome",
      features: ["Contemporary Worship", "Children's Ministry", "Coffee & Fellowship"]
    },
    {
      title: "Sunday Evening Service",
      time: "6:00 PM",
      description: "A more intimate gathering focused on prayer and deeper study.",
      audience: "Teens & Adults",
      features: ["Prayer Focus", "Bible Study", "Small Group Discussion"]
    },
    {
      title: "Wednesday Bible Study",
      time: "7:00 PM",
      description: "Dive deeper into God's word with our midweek study groups.",
      audience: "All Ages",
      features: ["Verse-by-Verse Study", "Group Discussion", "Prayer Time"]
    }
  ];

  return (
    <section id="services" className="py-20" >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-400" >
            Service Times
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: '#6b7280' }}>
            Come as you are and experience the love of Christ in a welcoming environment. 
            We have services designed to meet you wherever you are in your faith journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-white rounded-t-lg bg-[#379AFE]" >
                <CardTitle className="flex items-center justify-between">
                  <span className="text-xl">{service.title}</span>
                  <Clock className="h-5 w-5" />
                </CardTitle>
                <div className="font-bold text-2xl text-[#acaec5] mt-2">
                  {service.time}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="mb-4 leading-relaxed" style={{ color: '#6b7280' }}>
                  {service.description}
                </p>
                
                <div className="flex items-center gap-2 mb-4 text-sm font-medium" style={{ color: '#8b4513' }}>
                  <Users className="h-4 w-4" />
                  {service.audience}
                </div>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm" style={{ color: '#6b7280' }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#ffd700' }}></div>
                      {feature}
                    </div>
                  ))}
                </div>
              
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className=" p-8" >
            <h3 className="text-2xl font-bold mb-4">
              First Time Visiting?
            </h3>
            <p className="mb-6 max-w-2xl mx-auto" style={{ color: '#6b7280' }}>
              We'd love to meet you! Our greeters will help you find your way around, 
              and we have special seating reserved for first-time guests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              <Link href="/sign-up">
                <Button variant="outline" className="text-[#379AFE] border-[#379AFE] hover:bg-[#379AFE] hover:text-white">
                   Plan Your Visit
                </Button>
                </Link>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const ServicesSection = () => {
  const services = [
    {
      title: 'Wednesday Evening Worship (Bole Church)',
      time: '6:00 PM - 8:00 PM',
      description: 'Join us for a powerful evening of worship, biblical teaching, and heartfelt prayer to deepen your faith.',
      audience: 'All Ages Welcome',
      features: ['Contemporary Worship', 'Biblical Teaching', 'Prayer Time'],
      image: '/com7.jpg',
    },
    {
      title: 'Friday Evening Worship (Bole Church)',
      time: '6:00 PM - 8:00 PM',
      description: 'A vibrant gathering focused on worship, the Word of God, and community fellowship.',
      audience: 'All Ages Welcome',
      features: ['Worship Music', 'Sermon', 'Fellowship'],
      image: '/com8.jpg',
    },
    {
      title: 'Sunday Worship (Two Shift - Bole Church)',
      time: '8 AM - 10 AM &',
      time2:'11 AM - 1:30 PM',
      description: 'Experience an uplifting morning service with dynamic worship, preaching, and community connection.',
      audience: 'All Ages Welcome',
      features: ['Contemporary Worship', 'Biblical Teaching', 'Community Time'],
      image: '/fam9.jpg',
    },
    {
      title: "Sunday's service (Virginia Church)",
      time: '12:30 PM - 3:00 PM',
      description: 'Weekly meeting times service offering vibrant worship, biblical teaching, and opportunities for fellowship.',
      audience: 'All Ages Welcome',
      features: ['Contemporary Worship','Biblical Teaching', 'Coffee & Fellowship'],
      image: '/com4.jpg',
    },
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-orange-900 mb-6 tracking-tight">
            Join Our Services
          </h2>
          <p className="max-w-3xl text-gray-700 mx-auto text-lg leading-relaxed">
            Experience the love of Christ in a warm and welcoming environment. Our services are designed to inspire, uplift, and connect you with our vibrant community.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-0 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-white"
            >
              {/* Top Image */}
              {service.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}

              {/* Card Header */}
              <CardHeader className="bg-orange-100 p-6">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-orange-900">{service.title}</span>
                  <Clock className="h-5 w-5 text-orange-700" />
                </CardTitle>
                <div className="font-bold text-2xl text-orange-800 mt-2">{service.time}</div>
                {service.time2 && <div className="font-bold text-2xl text-orange-800 mt-1">{service.time2}</div>}
              </CardHeader>

              {/* Card Content */}
              <CardContent className="p-6">
                <p className="mb-4 text-gray-700 leading-relaxed text-sm">
                  {service.description}
                </p>

                <div className="flex items-center gap-2 mb-4 text-sm font-medium text-orange-700">
                  <Users className="h-4 w-4" />
                  {service.audience}
                </div>

                <div className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 rounded-full bg-orange-400"></div>
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
          <div className="bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl p-10 max-w-3xl mx-auto shadow-2xl transform transition-all duration-300 hover:scale-105">
            <div className="flex justify-center mb-4">
              <Heart className="h-12 w-12 text-white animate-pulse" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              New to YouGo Church?
            </h3>
            <p className="mb-6 text-white text-opacity-90 leading-relaxed max-w-xl mx-auto">
              We can’t wait to welcome you! Our friendly greeters will guide you, and we have special seating for first-time guests to make you feel at home.
            </p>
            <Link href="/sign-up">
              <Button className="bg-white text-orange-900 hover:bg-orange-100 hover:text-orange-800 rounded-full px-8 py-4 text-lg font-semibold shadow-md transition-all duration-300 hover:shadow-lg">
                Plan Your Visit Now
              </Button>
            </Link>
            <p className="mt-4 text-sm text-white text-opacity-80">
              Join us and become part of our growing family in Christ!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

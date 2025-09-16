'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { MapPin, Phone, Mail, Clock, Car, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ChurchMapLeaflet = dynamic(() => import('../maps'), { ssr: false });

interface Location {
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  email: string;
  parking: string;
  accessibility: string;
  serviceTimes: { day: string; time: string }[];
}

const locations: Location[] = [
  {
    name: 'Addis Ababa, Ethiopia',
    address: 'Bole Medhanialem Road\nAddis Ababa, Ethiopia',
    lat: 8.99276,
    lng: 38.791764,
    phone: '0911639350',
    email: 'amlak2002@yahoo.com',
    parking: 'Free parking available in our main lot and street parking on Sundays.',
    accessibility: 'Wheelchair accessible with reserved seating and accessible restrooms.',
    serviceTimes: [
      { day: 'Wednesday Evening Worship', time: '8:00 PM - 10:00 PM' },
      { day: 'Friday Evening Worship', time: '8:00 PM - 10:00 PM' },
      { day: 'Sunday Morning (First Shift)', time: '10:00 AM - 12:00 PM' },
      { day: 'Sunday Morning (Second Shift)', time: '1:00 PM - 3:00 PM' },
    ],
  },
  {
    name: 'Alexandria, VA, USA',
    address: '5725 Castlewellan Dr\nAlexandria, VA',
    lat: 38.7788,
    lng: -77.13306,
    phone: '0911639350', // Placeholder; update with real phone if available
    email: 'amlak2002@yahoo.com', // Placeholder; update if different
    parking: 'Free parking available in our main lot and street parking on Sundays.',
    accessibility: 'Wheelchair accessible with reserved seating and accessible restrooms.',
    serviceTimes: [
      { day: 'Sunday Morning', time: '9:00 AM' }, // Placeholder; update if specific times available
      { day: 'Sunday Evening', time: '6:00 PM' },
      { day: 'Wednesday Bible Study', time: '7:00 PM' },
    ],
  },
];

const LocationSection = () => {
  return (
    <section id="location" className="py-24 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <Heart className="h-8 w-8 text-orange-300 animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-orange-900 mb-6 tracking-tight">
            Visit Our Church
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Join our welcoming community in Ethiopia or the USA. Select a location below to find service times, contact details, and plan your visit.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue={locations[0].name} className="space-y-8">
          <TabsList className="flex justify-center gap-4 bg-transparent p-0">
            {locations.map((loc) => (
              <TabsTrigger
                key={loc.name}
                value={loc.name}
                className="rounded-full px-6 py-3 text-sm font-medium text-gray-700 bg-orange-100 data-[state=active]:bg-orange-500 data-[state=active]:text-white hover:bg-orange-200 transition-all duration-300"
              >
                {loc.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {locations.map((loc) => (
            <TabsContent key={loc.name} value={loc.name} className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Map Component */}
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <ChurchMapLeaflet lat={loc.lat} lng={loc.lng} address={loc.address} />
                </div>

                {/* Contact and Service Information */}
                <div className="space-y-6">
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-2xl">
                    <CardHeader className="bg-orange-100 py-4">
                      <CardTitle className="flex items-center gap-2 text-orange-900">
                        <MapPin className="h-5 w-5 text-orange-600" aria-hidden="true" />
                        Address & Contact
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                      <div>
                        <h4 className="font-semibold text-orange-800 text-sm mb-1">Address</h4>
                        <p className="text-gray-600 text-sm whitespace-pre-line">{loc.address}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-orange-600" aria-hidden="true" />
                        <span className="text-gray-600 text-sm">{loc.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-orange-600" aria-hidden="true" />
                        <span className="text-gray-600 text-sm">{loc.email}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-2xl">
                    <CardHeader className="bg-orange-100 py-4">
                      <CardTitle className="flex items-center gap-2 text-orange-900">
                        <Clock className="h-5 w-5 text-orange-600" aria-hidden="true" />
                        Service Times
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-4">
                      {loc.serviceTimes.map((service, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="font-medium text-orange-800 text-sm">{service.day}</span>
                          <span className="text-gray-600 text-sm">{service.time}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-2xl">
                    <CardHeader className="bg-orange-100 py-4">
                      <CardTitle className="flex items-center gap-2 text-orange-900">
                        <Car className="h-5 w-5 text-orange-600" aria-hidden="true" />
                        Parking & Accessibility
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-4">
                      <div>
                        <h4 className="font-semibold text-orange-800 text-sm mb-1">Parking</h4>
                        <p className="text-gray-600 text-sm">{loc.parking}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-orange-800 text-sm mb-1">Accessibility</h4>
                        <p className="text-gray-600 text-sm">{loc.accessibility}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl p-10 max-w-3xl mx-auto shadow-2xl transform transition-all duration-300 hover:scale-105">
            <div className="flex justify-center mb-4">
              <Heart className="h-12 w-12 text-white animate-pulse" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Plan Your Visit Today
            </h3>
            <p className="mb-6 text-white text-opacity-90 leading-relaxed max-w-xl mx-auto text-sm">
              We can’t wait to welcome you to YouGo Church! Our greeters are ready to guide you, and we have special seating for first-time guests to make you feel at home.
            </p>
            <Link href="/sign-up">
              <Button className="bg-white text-orange-900 hover:bg-orange-100 hover:text-orange-800 rounded-full px-8 py-4 text-lg font-semibold shadow-md transition-all duration-300 hover:shadow-lg">
                Join Us This Week
              </Button>
            </Link>
            <p className="mt-4 text-sm text-white text-opacity-80">
              Become part of our vibrant church family!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
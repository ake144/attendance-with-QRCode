import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; // Add if not installed
import { MapPin, Phone, Mail, Clock, Car } from 'lucide-react';
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
  },
  {
    name: 'Alexandria, VA, USA',
    address: '5725 Castlewellan Dr\nAlexandria, VA',
    lat: 38.7788,
    lng: -77.13306,
    phone: '0911639350', // Placeholder; update with real phone if different
    email: 'amlak2002@yahoo.com', // Placeholder; update if different
    parking: 'Free parking available in our main lot and street parking on Sundays.', // Customize if needed
    accessibility: 'Wheelchair accessible with reserved seating and accessible restrooms.', // Customize if needed
  },
];

const LocationSection = () => {
  return (
    <section id="location" className="py-20 bg-church-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F09F2C] mb-6">
            Visit Us
          </h2>
          <p className="text-md text-muted-foreground max-w-xl mx-auto">
            We have welcoming locations in Ethiopia and the USA. Select a location below to see details and plan your visit to our church family.
          </p>
        </div>

        <Tabs defaultValue={locations[0].name} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:grid-cols-none justify-center rounded-full bg-muted p-1">
            {locations.map((loc) => (
              <TabsTrigger
                key={loc.name}
                value={loc.name}
                className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"
              >
                {loc.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {locations.map((loc) => (
            <TabsContent key={loc.name} value={loc.name}>
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Map Component */}
                <div>
                  <ChurchMapLeaflet lat={loc.lat} lng={loc.lng} address={loc.address} />
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  <Card className="border-0 shadow-lg hover:shadow-amber-400 border-amber-200 transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-church-text">
                        <MapPin className="h-5 w-5 text-church-primary" aria-hidden="true" />
                        Address & Contact
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-church-text mb-1">Address</h4>
                        <p className="text-muted-foreground whitespace-pre-line">{loc.address}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-church-primary" aria-hidden="true" />
                        <span className="text-muted-foreground">{loc.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-church-primary" aria-hidden="true" />
                        <span className="text-muted-foreground">{loc.email}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg hover:shadow-amber-400 border-amber-200 transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-church-text">
                        <Clock className="h-5 w-5 text-church-primary" aria-hidden="true" />
                        Service Times
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-church-text">Sunday Morning</span>
                        <span className="text-muted-foreground">9:00 AM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-church-text">Sunday Evening</span>
                        <span className="text-muted-foreground">6:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-church-text">Wednesday Bible Study</span>
                        <span className="text-muted-foreground">7:00 PM</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg hover:shadow-amber-400 border-amber-200 transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-church-text">
                        <Car className="h-5 w-5 text-church-primary" aria-hidden="true" />
                        Parking & Accessibility
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-church-text mb-1">Parking</h4>
                        <p className="text-muted-foreground text-sm">{loc.parking}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-church-text mb-1">Accessibility</h4>
                        <p className="text-muted-foreground text-sm">{loc.accessibility}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default LocationSection;
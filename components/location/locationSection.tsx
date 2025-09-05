import React from 'react';
// import ChurchMap from './ChurchMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock, Car } from 'lucide-react';
import ChurchMapLeaflet from '../maps';

const LocationSection = () => {
  return (
    <section id="location" className="py-20 bg-church-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-church-text mb-6">
            Visit Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're located in the heart of the community and can't wait to welcome you 
            to our church family. Here's everything you need to know for your visit.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Map Component */}
          <div>
            {/* <ChurchMap /> */}
            <ChurchMapLeaflet />
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-church-text">
                  <MapPin className="h-5 w-5 text-church-primary" />
                  Address & Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-church-text mb-1">Address</h4>
                  <p className="text-muted-foreground">
                    123 Faith Street<br />
                    New York, NY 10001
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-church-primary" />
                  <span className="text-muted-foreground">(555) 123-HOPE</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-church-primary" />
                  <span className="text-muted-foreground">info@gracecommunity.org</span>
                </div>
              </CardContent>
            </Card>

            {/* <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-church-text">
                  <Clock className="h-5 w-5 text-church-primary" />
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
            </Card> */}

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-church-text">
                  <Car className="h-5 w-5 text-church-primary" />
                  Parking & Accessibility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-church-text mb-1">Parking</h4>
                  <p className="text-muted-foreground text-sm">
                    Free parking available in our main lot and street parking on Sundays.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-church-text mb-1">Accessibility</h4>
                  <p className="text-muted-foreground text-sm">
                    Wheelchair accessible with reserved seating and accessible restrooms.
                  </p>
                </div>
              </CardContent>
            </Card>

           
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
import churchBackground from "@/assets/church-background.jpg";
import { PrayerRequestForm } from "@/components/prayer-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Clock, Shield, Sparkles } from "lucide-react";

const Index = () => {
  const images = "https://images.unsplash.com/photo-1473122430480-d00e6dd25ba8?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${images})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-orange-50/80 to-background/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-orange-100 p-4 rounded-full shadow-lg">
              <Heart className="h-10 w-10 text-orange-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Prayer <span className="text-orange-600">Requests</span>
          </h1>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
            <p className="text-xl text-gray-800 md:text-2xl font-medium leading-relaxed italic">
              "Again, truly I tell you that if two of you on earth agree about anything they ask for,
              it will be done for them by my Father in heaven." 
              <span className="block text-lg text-orange-700 mt-2 not-italic">- Matthew 18:19</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Prayer Request Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-orange-100 rounded-2xl overflow-hidden">
              <div className="bg-orange-600 py-3 text-center">
                <p className="text-white text-sm font-medium flex items-center justify-center">
                  <Sparkles className="h-4 w-4 mr-2" /> 
                  Share Your Prayer Need
                </p>
              </div>
              <PrayerRequestForm />
            </Card>
          </div>

          {/* Information Sidebar */}
          <div className="space-y-6">
            {/* Prayer Team Info */}
            <Card className="shadow-lg border-orange-100 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Our Prayer Team</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Our dedicated team of prayer warriors is committed to lifting up your requests 
                  before God each week. 3 Times a year a 40 days Fast and Prayer is held.
                </p>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-sm text-orange-800">
                    <span className="font-semibold">Meeting Times:</span> Monday nights 6:00pm and morning on WhatsApp and zoom at 5:30pm. Friday from 6:00pm - 8:00pm
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="shadow-lg border-orange-100 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Response Time</h3>
                </div>
                <p className="text-gray-700 mb-2">
                  We strive to acknowledge all prayer requests within a short period and add them to
                  our prayer list immediately.
                </p>
                <div className="mt-3 bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-lg border border-orange-200">
                  <p className="text-xs text-orange-700">
                    You may receive a follow-up email or call from our pastoral team to check on you.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Confidentiality */}
            <Card className="shadow-lg border-orange-100 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <Shield className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Confidentiality</h3>
                </div>
                <p className="text-gray-700">
                  All prayer requests are handled with the utmost confidentiality and compassion. 
                  You can specify if your request should remain private.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full mt-4 border-orange-300 text-orange-600 hover:bg-orange-50"
                >
                  View Our Privacy Policy
                </Button>
              </CardContent>
            </Card>

          
          </div>
        </div>

        <div className="text-center mt-12">
          <Card className="bg-orange-50 border-orange-200 inline-flex px-6 py-3 rounded-full">
            <p className="text-orange-800 text-sm">
              All prayer requests are handled with confidentiality and compassion by our prayer team.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
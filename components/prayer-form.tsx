'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Heart, Send, CheckCircle } from "lucide-react";
import { apiClient } from "@/lib/api-client";

interface PrayerFormData {
  name: string;
  email?: string;
  phone?: string;
  prayerRequest: string;
  isAnonymous: boolean;
}

export const PrayerRequestForm = () => {
  const [formData, setFormData] = useState<PrayerFormData>({
    name: "",
    phone: "",
    email: "",
    prayerRequest: "",
    isAnonymous: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

       try{
         const response = await apiClient.submitPrayerRequest(formData);
         toast({
           title: "Prayer Request Submitted",
           description: "Your prayer request has been received. May God bless you.",
         });
       } catch (error) {
         toast({
           title: "Error Submitting Prayer Request",
           className: "bg-red-600 text-white",
           description: "There was an error submitting your prayer request. Please try again later.",
         });
       }

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-card via-spiritual-light/20 to-card border-spiritual/20 shadow-peaceful">
        <CardContent className="pt-12 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-spiritual animate-pulse" />
          </div>
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Your Prayer Has Been Received
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Thank you for sharing your heart with us. Our prayer team will lift your request up in prayer.
            May God's peace be with you.
          </p>
          <Button
            variant="default"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: "",
                email: "",
                phone: "",
                prayerRequest: "",
                isAnonymous: false,
              });
            }}
          >
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-card via-spiritual-light/20 to-card border-spiritual/20 shadow-peaceful">
      <CardHeader className="text-center pb-2">
        <div className="flex justify-center mb-4">
          <Heart className="h-12 w-12 text-spiritual" />
        </div>
        <CardTitle className="text-3xl font-bold text-foreground">Submit a Prayer Request</CardTitle>
        <CardDescription className="text-lg text-muted-foreground mt-2">
          Share your heart with us. We believe in the power of prayer and would be honored to pray for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-medium">
                Your Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
                className="bg-background/80 border-spiritual/30 focus:border-spiritual transition-colors"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground font-medium">
                Phone number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              
                className="bg-background/80 border-spiritual/30 focus:border-spiritual transition-colors"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
              
                className="bg-background/80 border-spiritual/30 focus:border-spiritual transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prayerRequest" className="text-foreground font-medium">
              Your Prayer Request
            </Label>
            <Textarea
              id="prayerRequest"
              name="prayerRequest"
              value={formData.prayerRequest}
              onChange={handleInputChange}
              placeholder="Please share what you would like us to pray for..."
              required
              rows={6}
              className="bg-background/80 border-spiritual/30 focus:border-spiritual transition-colors resize-none"
            />
          </div>

          <div className="bg-spiritual-light/30 p-4 rounded-lg border border-spiritual/20">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Privacy Notice:</strong> Your prayer requests are confidential and will only be shared with our prayer team. 
              We respect your privacy and handle all requests with care and compassion.
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
            variant="secondary"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting Prayer...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Prayer Request
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};


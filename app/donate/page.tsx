'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { 
  Heart, 
  CreditCard, 
  Smartphone, 
  Building2, 
  QrCode,
  Copy,
  ExternalLink,
  Gift,
  Users,
  Church
} from 'lucide-react';
import Image from 'next/image';


interface DonationMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  details: string;
  instructions: string[];
  url: string;
  qrCode?: string;
}

const donationMethods: DonationMethod[] = [
  {
    id: 'telebirr',
    name: 'TeleBirr',
    description: 'Fast and secure mobile money transfer',
    icon: <Smartphone className="h-6 w-6" />,
    url: '/tellebirr.png',
    details: '0912345678',
    instructions: [
      'Open your TeleBirr app',
      'Scan the QR code or enter the number',
      'Enter the amount you wish to donate',
      'Add your name as reference',
      'Confirm the transaction'
    ],
    qrCode: '/telebirr-qr.png' // You'll need to add this image
  },
  {
    id: 'cbe',
    name: 'Commercial Bank of Ethiopia',
    description: 'Direct bank transfer to church account',
    icon: <Building2 className="h-6 w-6" />,
    url: '/cbe.jpeg',
    details: 'Account: 1000123456789\nBranch: Addis Ababa Main',
    instructions: [
      'Visit any CBE branch or use CBE Birr app',
      'Provide the account number: 1000123456789',
      'Mention "YouGo Church Donation" as reference',
      'Complete the transfer'
    ]
  },
  {
    id: 'awash',
    name: 'Awash Bank',
    description: 'Convenient bank transfer option',
    icon: <Building2 className="h-6 w-6" />,
    url: '/awash.png',
    details: 'Account: 0134567890123\nBranch: Addis Ababa',
    instructions: [
      'Use Awash Bank mobile app or visit branch',
      'Enter account: 0134567890123',
      'Add "YouGo Church" in reference field',
      'Complete your donation'
    ]
  },
  {
    id: 'cash',
    name: 'Cash Donation',
    description: 'Direct cash donation at church',
    icon: <Gift className="h-6 w-6" />,
    url: '/m-pesa.png',
    details: 'Visit us during service hours',
    instructions: [
      'Visit YouGo Church during service hours',
      'Speak with our ushers or pastors',
      'Make your donation in person',
      'Receive a donation receipt'
    ]
  }
];

export default function DonatePage() {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [amount, setAmount] = useState('');
  const { toast } = useToast();

  const handleCopyDetails = (details: string) => {
    navigator.clipboard.writeText(details);
    toast({
      title: 'Copied!',
      description: 'Payment details copied to clipboard',
    });
  };

  const handleDonationSubmit = () => {
    if (!selectedMethod || !amount) {
      toast({
        title: 'Error',
        description: 'Please select a payment method and enter amount',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Thank You!',
      description: 'Your donation will help our church grow. God bless you!',
    });

    // Reset form
    setAmount('');
  };

  const selectedMethodData = donationMethods.find(m => m.id === selectedMethod);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Heart className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Support YouGo Church
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your generous donations help us spread God&apos;s love, maintain our facilities,
            and support our community programs. Every contribution makes a difference.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="lg:col-span-2 my-5">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Gift className="h-5 w-5" />
                  Make a Donation
                </CardTitle>
                <CardDescription>
                  Choose your preferred payment method and amount
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Method Selection */}
                <div>
                  <Label className="text-base font-medium">Payment Method</Label>
                  <RadioGroup 
                    value={selectedMethod} 
                    onValueChange={setSelectedMethod}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3"
                  >
                    {donationMethods.map((method) => (
                      <div key={method.id} className="flex items-center space-x-3">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Label 
                          htmlFor={method.id} 
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Image src={method.url} alt={method.name} width={40}
                           height={50} />
                         
                          <span className="font-medium">{method.name}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Button 
                  onClick={handleDonationSubmit}
                  className="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-lg py-9"
                  disabled={!selectedMethod || !amount}
                >
                  <Heart className="h-5 w-5 mr-2" />
                  God Bless You
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Payment Instructions */}
          <div className="space-y-6">
            {selectedMethodData && (
              <Card className="shadow-lg border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    {selectedMethodData.icon}
                    {selectedMethodData.name}
                  </CardTitle>
                  <CardDescription>
                    {selectedMethodData.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Label className="text-sm font-medium text-blue-800">Payment Details</Label>
                    <div className="flex items-center justify-between mt-1">
                      <code className="text-sm text-blue-700">{selectedMethodData.details}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyDetails(selectedMethodData.details)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Instructions</Label>
                    <ol className="list-decimal list-inside space-y-1 mt-2 text-sm text-gray-600">
                      {selectedMethodData.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ol>
                  </div>

                  {selectedMethodData.qrCode && (
                    <div className="text-center">
                      <Label className="text-sm font-medium">Scan QR Code</Label>
                      <div className="mt-2 p-4 bg-white rounded-lg">
                        <QrCode className="h-24 w-24 mx-auto text-gray-400" />
                        <p className="text-xs text-gray-500 mt-2">QR Code Placeholder</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Impact Card */}
            <Card className="shadow-lg bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Users className="h-5 w-5" />
                  Your Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">Community Programs</span>
                  <span className="text-sm font-medium text-green-800">40%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">Facility Maintenance</span>
                  <span className="text-sm font-medium text-green-800">30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">Outreach Missions</span>
                  <span className="text-sm font-medium text-green-800">20%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">Administrative</span>
                  <span className="text-sm font-medium text-green-800">10%</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Church className="h-5 w-5" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">
                  If you have any questions about donations or need assistance, 
                  please contact our finance team.
                </p>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Contact Finance Team
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 
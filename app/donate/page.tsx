'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
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
  Church,
  Share,
  Sparkles,
  Target,
  ChevronRight,
  CheckCircle
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
    id: 'cbe',
    name: 'Commercial Bank of Ethiopia',
    description: 'Direct bank transfer to church account\nAccount: 1000285127107\nBranch: Addis Ababa Main',
    icon: <Building2 className="h-6 w-6" />,
    url: '/cbe.jpeg',
    details: 'Account: 1000285127107\nBranch: Addis Ababa Main',
    instructions: [
      'Use any CBE App or use CBE Birr app or visit a branch',
      'Provide the account number: 1000285127107',
      'Mention "YouGo Church Donation" as reference',
      'Complete the transfer'
    ]
  },
  {
    id: 'abyssinia',
    name: 'Abyssinia Bank',
    description: 'Reliable bank transfer option\nAccount: 1287422972\nBranch: Addis Ababa',
    icon: <Building2 className="h-6 w-6" />,
    url: '/abysinia.png',
    details: 'Account: 1287422972\nBranch: Addis Ababa',
    instructions: [
      'Use Abyssinia Bank app or visit a branch',
      'Enter account: 1287422972',
      'Add "YouGo Church" in the reference field',
      'Complete your donation'
    ]
  },
  {
    id: 'awash',
    name: 'Awash Bank',
    description: 'Convenient bank transfer option\nAccount: 013521113121500\nBranch: Addis Ababa',
    icon: <Building2 className="h-6 w-6" />,
    url: '/awash.png',
    details: 'Account: 013521113121500\nBranch: Addis Ababa',
    instructions: [
      'Use Awash Bank mobile app or visit branch',
      'Enter account: 013521113121500',
      'Add "YouGo Church" in reference field',
      'Complete your donation'
    ]
  },
  {
    id: 'united',
    name: 'United Bank',
    description: 'Direct transfer to United Bank account\nAccount: 1181810802589012\nBranch: Addis Ababa',
    icon: <Building2 className="h-6 w-6" />,
    url: '/united.jpg',
    details: 'Account: 1181810802589012\nBranch: Addis Ababa',
    instructions: [
      'Visit any United Bank branch',
      'Provide the account number: 1181810802589012',
      'Mention "YouGo Church Donation" as reference',
      'Complete the transfer'
    ]
  },
  {
    id: 'coop',
    name: 'Cooperative Bank',
    description: 'Bank transfer option for donations\nAccount: 1011700167802\nBranch: Addis Ababa',
    icon: <Building2 className="h-6 w-6" />,
    url: '/coop.png',
    details: 'Account: 1011700167802\nBranch: Addis Ababa',
    instructions: [
      'Use Cooperative Bank app or visit branch',
      'Enter account: 1011700167802',
      'Add "YouGo Church" in reference field',
      'Complete your donation'
    ]
  },
  {
    id: 'dashen',
    name: 'Dashen Bank',
    description: 'Secure donation through Dashen Bank\nAccount: 0076420596011\nBranch: Addis Ababa',
    icon: <Building2 className="h-6 w-6" />,
    url: '/dashn.jpg',
    details: 'Account: 0076420596011\nBranch: Addis Ababa',
    instructions: [
      'Visit any Dashen Bank branch',
      'Provide the account number: 0076420596011',
      'Mention "YouGo Church Donation" as reference',
      'Complete the transfer'
    ]
  },
  {
    id: 'berhan',
    name: 'Berhan Bank',
    description: 'Easy transfer option\nAccount: 260001001 5495\nBranch: Addis Ababa',
    icon: <Building2 className="h-6 w-6" />,
    url: '/berhan.png',
    details: 'Account: 260001001 5495\nBranch: Addis Ababa',
    instructions: [
      'Use Berhan Bank app or visit branch',
      'Enter account: 260001001 5495',
      'Add "YouGo Church" in reference field',
      'Complete your donation'
    ]
  },
  {
    id: 'siinqee',
    name: 'Siinqee Bank',
    description: 'Trustworthy bank transfer for donations\nAccount: 1608805851219\nBranch: Addis Ababa',
    icon: <Building2 className="h-6 w-6" />,
    url: '/siinqee.png',
    details: 'Account: 1608805851219\nBranch: Addis Ababa',
    instructions: [
      'Visit any Siinqee Bank branch',
      'Provide the account number: 1608805851219',
      'Mention "YouGo Church Donation" as reference',
      'Complete the transfer'
    ]
  },
];

export default function DonatePage() {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [openMobileDetails, setOpenMobileDetails] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const { toast } = useToast();

  const handleCopyDetails = (details: string) => {
    navigator.clipboard.writeText(details);
    toast({
      title: 'Copied!',
      description: 'Payment details copied to clipboard',
    });
  };

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount.toString());
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setAmount(value);
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
    setCustomAmount('');
  };

  const sharePage = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Support YouGo Church',
        text: 'Join me in supporting YouGo Church through donations',
        url: window.location.href,
      })
      .catch(() => {
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: 'Link copied!',
          description: 'Page link copied to clipboard',
        });
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied!',
        description: 'Page link copied to clipboard',
      });
    }
  };

  const selectedMethodData = donationMethods.find(m => m.id === selectedMethod);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <Sparkles className="h-8 w-8 text-orange-300 animate-pulse" />
          </div>
          <div className="flex justify-center mb-4">
            <div className="bg-orange-100 p-4 rounded-full shadow-lg">
              <Heart className="h-10 w-10 text-orange-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Support <span className="text-orange-600">YouGo</span> Church
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Your generous donations help us spread God's love, maintain our facilities,
            and support our community programs. Every contribution makes a difference.
          </p>
          
          <Button 
            onClick={sharePage}
            variant="outline" 
            className="mt-6 rounded-full border-orange-300 text-orange-600 hover:bg-orange-50"
          >
            <Share className="h-4 w-4 mr-2" />
            Share this page
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-orange-100 rounded-2xl overflow-hidden">
              <div className="bg-orange-600 py-2 text-center">
                <p className="text-white text-sm font-medium flex items-center justify-center">
                  <Target className="h-4 w-4 mr-2" /> 
                  Make an impact today
                </p>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <Gift className="h-6 w-6" />
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
                      <div key={method.id} className="relative">
                        <RadioGroupItem 
                          value={method.id} 
                          id={method.id} 
                          className="sr-only" 
                        />
                        <Label 
                          htmlFor={method.id} 
                          className={`flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all ${
                            selectedMethod === method.id
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-gray-200 hover:border-orange-300'
                          }`}
                          onClick={() => {
                            if (window.innerWidth < 1024) {
                              setOpenMobileDetails(openMobileDetails === method.id ? null : method.id);
                            } else {
                              setSelectedMethod(method.id);
                            }
                          }}
                        >
                          <div className="bg-white p-2 rounded-lg shadow-sm mb-3">
                            <Image 
                              src={method.url} 
                              alt={method.name} 
                              width={48} 
                              height={48} 
                              className="object-contain"
                            />
                          </div>
                          <span className="font-medium text-gray-900 text-sm sm:text-base text-center">{method.name}</span>
                          <span className="text-xs text-gray-600 text-center mt-2 whitespace-pre-wrap leading-relaxed">
                            {method.details}
                          </span>
                          <ChevronRight 
                            className={`h-4 w-4 mt-2 mx-auto ${
                              selectedMethod === method.id ? 'text-orange-600' : 'text-gray-400'
                            }`} 
                          />
                        </Label>
                        {/* Mobile: Additional details popup */}
                        <div className="block lg:hidden">
                          {openMobileDetails === method.id && (
                            <div className="absolute left-0 right-0 z-20 mt-2 bg-white border border-orange-200 rounded-xl shadow-lg p-4 animate-fade-in">
                              <Label className="text-sm font-medium text-orange-800">Payment Details</Label>
                              <div className="flex items-center justify-between mt-2">
                                <code className="text-sm text-orange-700 whitespace-pre-wrap">{method.details}</code>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCopyDetails(method.details)}
                                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-100"
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="mt-4">
                                <Label className="text-sm font-medium">How to donate:</Label>
                                <ol className="mt-3 space-y-3">
                                  {method.instructions.map((instruction, index) => (
                                    <li key={index} className="flex items-start">
                                      <div className="bg-orange-100 text-orange-700 rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">
                                        {index + 1}
                                      </div>
                                      <span className="text-sm text-gray-700">{instruction}</span>
                                    </li>
                                  ))}
                                </ol>
                              </div>
                              {method.qrCode && (
                                <div className="text-center pt-4">
                                  <Label className="text-sm font-medium block mb-3">Scan QR Code</Label>
                                  <div className="p-4 bg-white rounded-xl border border-orange-200 inline-block">
                                    <div className="bg-orange-100 p-4 rounded-lg">
                                      <QrCode className="h-24 w-24 mx-auto text-gray-700" />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Scan with your payment app</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Button 
                  onClick={handleDonationSubmit}
                  className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-lg py-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                  disabled={!selectedMethod || !amount}
                >
                  <Heart className="h-5 w-5 mr-2" />
                  God Bless You
                </Button>
                
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Secure and encrypted payment process</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Instructions Sidebar (Desktop) */}
          <div className="space-y-6 hidden lg:block">
            {selectedMethodData ? (
              <Card className="shadow-lg border-orange-200 rounded-2xl">
                <CardHeader className="bg-orange-50 py-4">
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    {selectedMethodData.icon}
                    {selectedMethodData.name} Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="bg-orange-50 p-4 rounded-xl">
                    <Label className="text-sm font-medium text-orange-800">Payment Details</Label>
                    <div className="flex items-center justify-between mt-2">
                      <code className="text-sm text-orange-700 whitespace-pre-wrap">{selectedMethodData.details}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyDetails(selectedMethodData.details)}
                        className="text-orange-600 hover:text-orange-700 hover:bg-orange-100"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">How to donate:</Label>
                    <ol className="mt-3 space-y-3">
                      {selectedMethodData.instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start">
                          <div className="bg-orange-100 text-orange-700 rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-sm text-gray-700">{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {selectedMethodData.qrCode && (
                    <div className="text-center pt-4">
                      <Label className="text-sm font-medium block mb-3">Scan QR Code</Label>
                      <div className="p-4 bg-white rounded-xl border border-orange-200 inline-block">
                        <div className="bg-orange-100 p-4 rounded-lg">
                          <QrCode className="h-32 w-32 mx-auto text-gray-700" />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Scan with your payment app</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg border-orange-200 rounded-2xl">
                <CardHeader className="bg-orange-50 py-4">
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <Sparkles className="h-5 w-5" />
                    How to Donate
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-700 mb-4">
                    Select a payment method to see specific instructions. We offer multiple convenient ways to support our church.
                  </p>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="text-xs text-orange-700 font-medium">
                      All donations are tax-deductible and you will receive a receipt for your records.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Impact Card */}
            <Card className="shadow-lg bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200 rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <Users className="h-5 w-5" />
                  Your Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { program: 'Community Programs', percentage: 40, color: 'bg-orange-500' },
                  { program: 'Facility Maintenance', percentage: 30, color: 'bg-orange-400' },
                  { program: 'Outreach Missions', percentage: 20, color: 'bg-orange-300' },
                  { program: 'Administrative', percentage: 10, color: 'bg-orange-200' }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-orange-800">{item.program}</span>
                      <span className="font-medium text-orange-900">{item.percentage}%</span>
                    </div>
                    <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} rounded-full`} 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-orange-700 mt-3">
                  Your donation directly supports these areas of our ministry
                </p>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="shadow-lg border-orange-100 rounded-2xl">
              <CardHeader className="py-4">
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <Church className="h-5 w-5" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-700">
                  If you have any questions about donations or need assistance, 
                  please contact our finance team.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
                >
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
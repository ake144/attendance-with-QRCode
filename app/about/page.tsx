// 'use client'

// import React from 'react'
// import Image from 'next/image'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ChevronRight, Heart, Calendar, Users, MessageCircle, Bell, Zap } from 'lucide-react'
// import FooterPage from '@/components/footer'

// const LearnMore = () => {

//    const communityImg = [
//     '/yougocomm.jpg',
//     '/yougocomm2.jpg',
//     '/yougocomm3.jpg',
//     '/yougo6.jpg',
//     '/yougo7.jpg',
//     '/yougo8.jpg',
//     '/yougo5.jpg',
//     '/yougointerior.jpg'
//   ]


//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
//       {/* Hero Section */}
//       <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
//         <Image
//           src='/yougocomm.jpg'
//           alt="Church community gathering"
//           layout="fill"
//           objectFit="cover"
//           className="absolute z-0"
//         />
//         <div className="absolute inset-0 bg-black/50 z-10" />
//         <div className="relative z-20 text-center text-white">
//           <h1 className="text-5xl font-bold mb-4">You GO Church Community</h1>
//           <p className="text-xl max-w-2xl mx-auto">
//             Building Connections, Tracking Attendance, and Growing Together in Faith
//           </p>
//         </div>
//       </section>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-16">
//         {/* Why Identification Matters Section */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold mb-8 text-center">Why Identification Matters</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               { icon: Heart, title: "Build Relationships", description: "Foster meaningful connections within our church family." },
//               { icon: Calendar, title: "Track Attendance", description: "Support and encourage regular participation in our community." },
//               { icon: Users, title: "Grow Together", description: "Ensure everyone feels they belong and can contribute." }
//             ].map((item, index) => (
//               <Card key={index} className="transition-all duration-300 hover:shadow-lg">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <item.icon className="h-6 w-6 text-primary" />
//                     {item.title}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p>{item.description}</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </section>

//         {/* How It Works Section */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
//           <Tabs defaultValue="register" className="w-full">
//             <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
//               <TabsTrigger value="register">Register</TabsTrigger>
//               <TabsTrigger value="checkin">Fill-Info</TabsTrigger>
//               <TabsTrigger value="connect">Connect</TabsTrigger>
//             </TabsList>
//             <TabsContent value="register" className="mt-4">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Register with You GO Church</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p>Sign up to the site by entering your email or using your google accounts.</p>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//             <TabsContent value="checkin" className="mt-4">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Fill Your Information</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p>Fill your Full information aaccording to the request from the site and then submit your information, then your unique Qr code is generated.</p>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//             <TabsContent value="connect" className="mt-4">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Connect with Us</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p>Receive updates, event invitations, and support from our ministry team. Stay connected and grow in your faith journey.</p>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </section>

//         {/* Benefits Section */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold mb-8 text-center">Benefits of Joining</h2>
//           <div className="grid md:grid-cols-2 gap-8">
//             {[
//               { icon: MessageCircle, title: "Personal Connection", description: "Receive personalized support and guidance from our pastoral team." },
//               { icon: Bell, title: "Stay Informed", description: "Get first access to community events and volunteer opportunities." },
//               { icon: Zap, title: "Spiritual Growth", description: "Access resources and programs tailored to your faith journey." },
//               { icon: Users, title: "Community Belonging", description: "Feel valued and connected as an integral part of our church family." }
//             ].map((item, index) => (
//               <Card key={index} className="transition-all duration-300 hover:shadow-lg">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <item.icon className="h-6 w-6 text-primary" />
//                     {item.title}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p>{item.description}</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </section>

//         {/* Testimonials Section */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold mb-8 text-center">What Our Members Say</h2>
//           <div className="grid md:grid-cols-2 gap-8">
//             {[
//               { image: "/yougo7.jpg", name: "Sarah Johnson", quote: "Joining the community identification program made me feel seen and supported in my faith journey. I've never felt more connected to my church family." },
//               { image: "/yougo8.jpg", name: "Michael Chen", quote: "The You GO Church feels more like family now. I always know what's happening and feel like I truly belong. It's transformed my spiritual life." }
//             ].map((testimonial, index) => (
//               <Card key={index} className="overflow-hidden">
//                 <div className="relative h-48">
//                   <Image
//                     src={testimonial.image}
//                     alt={`${testimonial.name}'s photo`}
//                     layout="fill"
//                     objectFit="cover"
//                   />
//                 </div>
//                 <CardContent className="pt-4">
//                   <blockquote className="italic mb-2">&ldquo;{testimonial.quote}&rdquo;</blockquote>
//                   <p className="font-semibold">- {testimonial.name}</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </section>

//         {/* Community Gallery */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold mb-8 text-center">Our Vibrant Community</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {communityImg.map((img, index) => (
//               <div key={index} className="relative h-48 rounded-lg overflow-hidden">
//                 <Image
//                   src={img}
//                   alt={`Community image ${index + 1}`}
//                   layout="fill"
//                   objectFit="cover"
//                   className="transition-all duration-300 hover:scale-110"
//                 />
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="text-center  ">
//           <h2 className="text-3xl font-bold mb-4">Ready to Become Part of the You GO Family?</h2>
//           <p className="text-xl mb-8">Join us today and experience the power of community.</p>
//           <Button size="lg" className="text-lg px-8">
//             Join Our Community <ChevronRight className="ml-2 h-5 w-5" />
//           </Button>
//         </section>
//       </main>

//       {/* Footer */}
//       <FooterPage  />
//     </div>
//   )
// }

// export default LearnMore
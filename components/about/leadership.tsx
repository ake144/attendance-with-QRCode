import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const leaders = [
  {
    name: "Pastor John Doe",
    role: "Senior Pastor",
    image: "/p1.jpg",
    bio: "Pastor John has been leading our congregation for over 15 years, bringing wisdom and compassion to our community."
  },
  {
    name: "Sarah Smith",
    role: "Worship Leader",
    image: "/p1.jpg",
    bio: "Sarah's passion for music and worship has been inspiring our congregation and bringing us closer to God."
  },
  {
    name: "Michael Johnson",
    role: "Youth Pastor",
    image:"/p1.jpg",
    bio: "Michael's energy and dedication to our youth program has been transforming the lives of young people in our church."
  }
]

export default function Leadership() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#379AFE]  mb-12">Our Leadership</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {leaders.map((leader) => (
            <Card key={leader.name} className='border border-[#379AFE] rounded-lg shadow-md overflow'>
              <CardHeader>
                <Image
                  src={leader.image}
                  alt={leader.name}
                  width={300}
                  height={300}
                  className="rounded-full mx-auto"
                />
                <CardTitle className="text-center mt-4">{leader.name}</CardTitle>
                <CardDescription className="text-center">{leader.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center">{leader.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


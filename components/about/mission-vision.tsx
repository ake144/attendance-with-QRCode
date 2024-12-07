import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MissionVision() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Mission & Vision</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
              <CardDescription>What drives us every day</CardDescription>
            </CardHeader>
            <CardContent>
              <p>To provide a refuge of hope, healing, and transformation through the love of Christ, empowering individuals to live purposeful lives and build stronger communities.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
              <CardDescription>Where we&apos;re headed</CardDescription>
            </CardHeader>
            <CardContent>
              <p>To be a beacon of light, fostering a global community of believers who are equipped to make a positive impact in their spheres of influence, bringing about lasting change and spiritual revival.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}


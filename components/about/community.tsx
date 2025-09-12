import Image from 'next/image';

export function Community() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#F09F2C]  text-center mb-12">Our Community</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-lg mb-4">
              At City of Refuge Church, we believe in the power of community. Our congregation is a diverse family of believers, united in our faith and commitment to serving others.
            </p>
            <p className="text-lg mb-4">
              From weekly services to small group meetings, youth programs to senior ministries, we offer a place for everyone to belong, grow, and make a difference.
            </p>
            <p className="text-lg">
              Join us in our mission to spread love, hope, and compassion in our local community and beyond.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/fam2.jpg"
              alt="Community event"
              width={300}
              height={200}
              className="rounded-lg"
            />
            <Image
              src="/newyear3.jpg"
              alt="Youth group"
              width={300}
              height={200}
              className="rounded-lg"
            />
            <Image
              src="/com3.jpg"
              alt="Worship service"
              width={300}
              height={200}
              className="rounded-lg"
            />
            <Image
              src="/com4.jpg"
              alt="Volunteer work"
              width={300}
              height={200}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );

}
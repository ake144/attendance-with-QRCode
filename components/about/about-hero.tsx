import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      <Image
        src="/newyear.jpg"
        alt="Church background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
      <h1 className="text-10xl sm:text-6xl md:text-8xl font-bold mb-6">
              ABOUT  US
        </h1>
      </div>
    </section>
  );
}

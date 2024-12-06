import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      <Image
        src="/yougonew.jpg"
        alt="Church background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          <span className="text-blue-400">YouGo City Church</span>
        </h1>
        <p className="text-xl sm:text-2xl mb-8 max-w-2xl mx-auto">
          A place of hope, healing, and community. Join us in our journey of faith and service.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
                className="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
                href="/dashboard"
              >
                <span className="absolute -start-full transition-all group-hover:start-4">
                  <svg
                    className="size-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="text-sm font-medium transition-all group-hover:ms-4">  Get Involved
                  </span>
              </a>
        </div>
      </div>
    </section>
  );
}

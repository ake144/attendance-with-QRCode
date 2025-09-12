export default function Timeline() {
  const timelineEvents = [
    {
      year: "2005",
      title: "Founded",
      description: "City of Refuge Church was established with a vision to serve the community and spread the love of Christ.",
    },
    {
      year: "2010",
      title: "Youth Ministry Launched",
      description: "Our dynamic youth ministry began, focusing on empowering the next generation of believers.",
    },
    {
      year: "2015",
      title: "Community Outreach Expanded",
      description: "We expanded our outreach programs, providing food, shelter, and support to those in need.",
    },
    {
      year: "2020",
      title: "Online Services Started",
      description: "Adapted to the global pandemic by launching online services, reaching a wider audience.",
    },
    {
      year: "2023",
      title: "New Worship Center Opened",
      description: "Opened our new state-of-the-art worship center to accommodate our growing congregation.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#F09F2C]  text-center mb-12">Our Journey</h2>
        <div className="relative border-l border-gray-200 dark:border-gray-700">
          {timelineEvents.map((event, index) => (
            <div key={index} className="mb-10 ml-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <svg
                  className="w-2.5 h-2.5 text-amber-600 dark:text-blue-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a16 16 0 11-16-4h16z" />
                </svg>
              </span>
              <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <time className="mb-1 text-sm font-normal text-gray-400 dark:text-gray-500">
                  {event.year}
                </time>
                <h3 className="text-lg font-semibold text-[#F09F2C]  dark:text-white">
                  {event.title}
                </h3>
                <p className="mb-4 text-base font-normal text-gray-600 dark:text-gray-400">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

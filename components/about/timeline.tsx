export default function Timeline() {
  const timelineEvents = [
    {
      year: "1999",
      title: "Vision to Plant a Church",
      description: "In mid-1999, Molalign Adugna felt called by the Lord to plant a local church in Addis Ababa, Ethiopia, marking the beginning of the City of Refuge Church's journey.",
    },
    {
      year: "2001",
      title: "Church Planting Begins",
      description: "Molalign Adugna moved to Ethiopia, rented a house in the Bole Homes area, and started a Bible study with childhood friends, leading to one-on-one evangelism and growth in new converts.",
    },
    {
      year: "2002",
      title: "New Meeting Hall Miracle",
      description: "With the rented house overflowing, a nearby nightclub was shut down by God's grace, allowing the Bible study group to move into the larger former nightclub as their new meeting hall.",
    },
    {
      year: "2003",
      title: "Official Church Planting",
      description: "On May 18, 2003, after affiliating with Sovereign Grace Ministries and attending their Pastor College in the US, the City of Refuge Church was officially planted in Addis Ababa.",
    },
    {
      year: "2004",
      title: "Government Recognition",
      description: "In mid-October 2004, the church was officially recognized by the Ethiopian government, receiving a certificate from the Ministry of Justice to perform baptisms, weddings, and burials.",
    },
    {
      year: "2005",
      title: "First Baptism Service",
      description: "On February 5, 2005, the church held its first baptism service in the Yugo Club, transforming a former party venue into a place where lives were changed through the proclamation of Jesus Christ.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#F09F2C] text-center mb-12">Our Journey</h2>
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
                <h3 className="text-lg font-semibold text-[#F09F2C] dark:text-white">
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
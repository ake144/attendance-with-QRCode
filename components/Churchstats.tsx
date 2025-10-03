import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const ministries = [
  {
    title: "Salvation Classes",
    icon: "📖",
    body: "Deepen your faith—over 6,000 baptized! Tuesdays 6-7:30pm & Sundays 7:30-9am.",
    img: "/ministry-salvation.jpg",
  },
  {
    title: "Care Groups",
    icon: "🏠",
    body: "Home-based fellowship assigned by location. Over 15 groups launching this year!",
    img: "/ministry-care.jpg",
  },
  {
    title: "Choir",
    icon: "🎤",
    body: "Praise through song. Join our 4 choirs: Mon/Tue/Thu at 6pm.",
    img: "/ministry-choir.jpg",
  },
  {
    title: "Ushers Meeting",
    icon: "🚪",
    body: "Welcome guests with warmth. Meetings: Mon/Tue/Thu at 6pm.",
    img: "/ministry-ushers.jpg",
  },
  {
    title: "Media Teams",
    icon: "📹",
    body: "Amplify our message digitally. From streaming to graphics—get involved!",
    img: "/ministry-media.jpg",
  },
  {
    title: "Prayer Meetings",
    icon: "🙏",
    body: "Intercede together. Mon nights 6pm, mornings on WhatsApp/Zoom, Fridays 6-8pm.",
    img: "/ministry-prayer.jpg",
  },
  {
    title: "Sunday School",
    icon: "👨‍👩‍👧‍👦",
    body: "Teaching 300+ kids every Sunday. Nurture the next generation!",
    img: "/ministry-sunday-school.jpg",
  },
  {
    title: "Cleaning Crew",
    icon: "🧹",
    body: "Keep our space welcoming. Join as a custodian volunteer.",
    img: "/ministry-cleaning.jpg",
  },
]

// Duplicate array multiple times for seamless infinite loop (3x for better coverage in three columns)
const duplicatedMinistries = [...ministries, ...ministries, ...ministries]

const MinistryCard = ({
  img,
  title,
  icon,
  body,
}: {
  img: string
  title: string
  icon: string
  body: string
}) => {
  return (
    <figure
      className={cn(
        "relative flex-shrink-0 h-[250px] w-full max-w-sm cursor-pointer overflow-hidden rounded-lg border p-6 shadow-md mx-2",
        // Theme: Orange accents, white bg
        "border-[#F09F2C]/30 bg-white hover:border-[#F09F2C] hover:shadow-lg hover:bg-orange-50/50",
        // Dark mode support
        "dark:border-[#F09F2C]/20 dark:bg-gray-800/50 dark:hover:border-[#F09F2C] dark:hover:bg-gray-700/70"
      )}
      role="figure"
      aria-label={`${title}: ${body}`} // Accessibility improvement
    >
      <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
        <div className="relative flex-shrink-0">
          {/* Using icon as fallback; uncomment img if needed */}
          {/* <img 
            className="rounded-full w-16 h-16 object-cover border-2 border-[#F09F2C] flex-shrink-0" 
            width="64" 
            height="64" 
            alt={title}
            src={img} 
          /> */}
          <span className="text-6xl flex-shrink-0">{icon}</span>
        </div>
        <div className="space-y-2 flex-1 flex flex-col justify-center px-2">
          <figcaption className="text-xl font-bold text-[#F09F2C] flex-shrink-0">
            {title}
          </figcaption>
          <blockquote className="text-base text-gray-600 leading-relaxed flex-1 overflow-hidden">{body}</blockquote>
        </div>
        <Link href="/about#ministries" className="flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="text-[#F09F2C] border-[#F09F2C] hover:bg-[#F09F2C] hover:text-white transition-all mt-2"
            aria-label={`Join ${title}`}
          >
            Join Now
          </Button>
        </Link>
      </div>
    </figure>
  )
}

export function MinistryMarquee() {
  // Offset data for each column to create variety and matching flow
  const getOffsetArray = (offset: number) => {
    const len = ministries.length
    return duplicatedMinistries.slice(offset).concat(duplicatedMinistries.slice(0, offset))
  }

  const col1Data = getOffsetArray(0) // Starts with first ministry
  const col2Data = getOffsetArray(Math.floor(ministries.length / 3)) // Offset by ~2-3 items
  const col3Data = getOffsetArray((ministries.length / 3) * 2) // Offset by ~5-6 items

  return (
    <section className="py-12 bg-white overflow-hidden" aria-labelledby="ministries-heading">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center mb-8">
          <h2 
            id="ministries-heading"
            className="text-3xl font-bold text-[#F09F2C] mb-4 text-center"
          >
            Discover Our Vibrant Ministries
          </h2>
          <p className="text-gray-600 text-center max-w-md">
            Scroll to explore ways to serve, grow, and connect in our community.
          </p>
        </div>
        
        {/* Vertical Infinite Marquee - Three Columns */}
        <div className="relative w-full h-[800px] flex flex-col md:flex-row items-start justify-center gap-4 overflow-hidden">
    
          {/* Column 1 */}
          <div className="flex flex-col w-full md:w-1/3 px-2">
            <div 
              className="flex flex-col animate-scroll-vertical"
              style={{ 
                animationDuration: '50s', // Slightly slower for three columns
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite'
              }}
            >
              {col1Data.map((ministry, index) => (
                <div key={`${ministry.title}-${index}`} className="flex justify-center py-4">
                  <MinistryCard {...ministry} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Column 2 */}
          <div className="flex flex-col w-full md:w-1/3 px-2">
            <div 
              className="flex flex-col animate-scroll-vertical-reverse"
              style={{ 
                animationDuration: '50s',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite'
              }}
            >
              {col2Data.map((ministry, index) => (
                <div key={`${ministry.title}-${index}`} className="flex justify-center py-4">
                  <MinistryCard {...ministry} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Column 3 */}
          <div className="flex flex-col w-full md:w-1/3 px-2">
            <div 
              className="flex flex-col animate-scroll-vertical"
              style={{ 
                animationDirection: '50s',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite'
              }}
            >
              {col3Data.map((ministry, index) => (
                <div key={`${ministry.title}-${index}`} className="flex justify-center py-4">
                  <MinistryCard {...ministry} />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link href="/about#ministries">
            <Button
              size="lg"
              className="bg-[#F09F2C] text-white font-bold px-8 py-3 rounded-lg shadow-md hover:bg-amber-600 transition-all"
              aria-label="Explore all ministries"
            >
              Explore All Ministries
            </Button>
          </Link>
        </div>
      </div>

      {/* Custom CSS for vertical infinite scroll - Add to globals.css or inline */}
      <style jsx>{`
        @keyframes scroll-vertical {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-33.33%); /* Adjusted for 3x duplication */
          }
        }
        @keyframes scroll-vertical-reverse {
          0% {
            transform: translateY(-33.33%);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-scroll-vertical {
          animation: scroll-vertical 50s linear infinite;
        }
        .animate-scroll-vertical-reverse {
          animation: scroll-vertical-reverse 50s linear infinite;
        }
        .animate-scroll-vertical:hover,
        .animate-scroll-vertical-reverse:hover {
          animation-play-state: paused; /* Pause on hover for better UX */
        }
      `}</style>
    </section>
  )
}
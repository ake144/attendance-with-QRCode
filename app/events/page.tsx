import MinistriesSection from "@/components/about/minstriesSection"
import EventHero from "@/components/events/event-hero"
import EventList from "@/components/events/event-list"
import EventTop from "@/components/events/event-top"
import { Metadata } from "next"


export const metadata: Metadata = {
    title: 'Events| YouGo City Church' ,
    description: 'Learn Events of yougo church and be part of it',
  }

  
const EventPage= () => {
    return(<>
    
    <EventTop  />
    <MinistriesSection />
     <EventHero  />
     <EventList />

    
    </>)

}


export default EventPage
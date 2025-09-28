import AboutHero from "@/components/about/about-hero"
import {Community} from "@/components/about/community"
import ConstructionCenter from "@/components/about/constructionCenter"
import ContactCTA from "@/components/about/contact-cta"
import Leadership from "@/components/about/leadership"
import MissionVision from "@/components/about/mission-vision"
import Timeline from "@/components/about/timeline"
import { Construction } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'About Us | City of Refuge Church',
    description: 'Learn about the history, mission, and leadership of City of Refuge Church.',
  }

const AboutPage=()=>{
return(
  
  <>
   <div className="min-h-screen bg-background">
      <AboutHero />
      <MissionVision />
       <ConstructionCenter />
      <Leadership />
      <Timeline />
      <Community />
     
      <ContactCTA />
    </div>
  
    
  
  </>)
}

export default AboutPage
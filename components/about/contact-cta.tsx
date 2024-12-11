import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ContactCTA() {
  return (
    <section className="bg-gray-100 text-gray-900 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#379AFE] ">Join Our Community</h2>
        <p className="text-xl mb-8 ">
          We&apos;d love to welcome you to our church family. Get in touch with us to learn more about our services and how you can get involved.
        </p>
        <Button asChild size="lg"  className="text-[#379AFE] border-[#379AFE] hover:bg-[#379AFE] hover:text-white"
  variant="outline">
          <Link href="mailto:amlak2002@yahoo.com" >Contact Us</Link>
        </Button>

      </div>
    </section>
  )
}


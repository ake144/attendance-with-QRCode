import Link from "next/link"

const FooterPage = ()=>{

    return(
        <>
        <footer id='contact' className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">You GO Church</h3>
              <p>Spreading the Gospel of our Lord and Saviour Jesus Christ. He is more than enough!</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
              <li><Link href="/" className="hover:underline">Home</Link></li>
                <li><Link href="/about" className="hover:underline">About Us</Link></li>
                <li><Link href="#" className="hover:underline">Events</Link></li>
                <li><Link href="#contact" className="hover:underline">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
              <p>  Bole Medhanialem Road, Addis Ababa, Ethiopia </p>
              <p>Phone: 091 163 9350</p>
              <p>Email: amlak2002@yahoo.com</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; {new Date().getFullYear()} You GO Church. All rights reserved.</p>
          </div>
        </div>
      </footer>
        
        </>
    )
}


export default FooterPage
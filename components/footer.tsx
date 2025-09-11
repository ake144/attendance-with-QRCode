import Link from "next/link"
import { FaFacebookF, FaInstagram, FaTwitter, FaTelegram, FaYoutube, FaTiktok } from "react-icons/fa";

const FooterPage = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="bg-amber-400 text-amber-900 py-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Left Section */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold tracking-wide">YouGo City Church</h3>
            <p className="text-lg font-medium">
              Spreading the Gospel of our Lord and Saviour Jesus Christ. <br />
              He is more than enough!
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FaFacebookF, label: "Facebook", href: "https://web.facebook.com/YouGoChurch" },
                { icon: FaTwitter, label: "Twitter", href: "https://x.com/YougoCityChurch" },
                { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/yougocitychurch/" },
                { icon: FaTelegram, label: "Telegram", href: "https://t.me/yougochurch" },
                { icon: FaYoutube, label: "YouTube", href: "https://youtube.com/@You_Go_City_Church" },
                { icon: FaTiktok, label: "TikTok", href: "https://tiktok.com/@you_go_church" },
              ].map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white rounded-full shadow hover:bg-amber-600 transition-all"
                >
                  <Icon className="h-5 w-5 text-amber-900 hover:text-white" />
                </Link>
              ))}
            </div>
          </div>

          {/* Middle Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Events", href: "/events" },
                { label: "Donate", href: "/donate" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-lg font-medium hover:text-white transition-colors duration-300 underline-offset-4 hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Connect With Us</h3>
            <address className="not-italic space-y-4 text-lg font-medium">
              <p>Bole Medhanialem Road, Addis Ababa, Ethiopia</p>
              <p>
                Phone:{" "}
                <a href="tel:+251911639350" className="hover:text-white transition-colors duration-300">
                  +251 91 163 9350
                </a>
              </p>
              <p>
                Email:{" "}
                <a href="mailto:amlak2002@yahoo.com" className="hover:text-white transition-colors duration-300">
                  amlak2002@yahoo.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-amber-300 text-center">
          <p className="text-lg font-medium">
            &copy; {currentYear} YouGo City Church. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default FooterPage

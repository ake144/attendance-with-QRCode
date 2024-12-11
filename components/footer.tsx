import Link from "next/link"
import { FaFacebookF, FaInstagram, FaTwitter, FaTelegram, FaYoutube, FaTiktok } from 'react-icons/fa';

const FooterPage = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="bg-[#409EEF] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold">YouGo City Church</h3>
            <p className="text-white text-lg">Spreading the Gospel of our Lord and Saviour Jesus Christ. He is more than enough!</p>
            <div className="flex space-x-6">
              {[
                { icon: FaFacebookF, label: "Facebook", href: "https://l.instagram.com/?u=https%3A%2F%2Fwww.facebook.com%2FYouGoChurch%3Fmibextid%3DZbWKwL&e=AT2-pG8vnfa8hRo4LEK2Rhn_7eXs1M0Qj8GTlzY5WdIP6QJcu_JiWSN7ZkcGYTtCwRbYxGIkUkhCvAlaQqFObwzTl7-nuJl95k1S8m8" },
                { icon: FaTwitter, label: "Twitter", href: "https://x.com/YougoCityChurch" },
                { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/yougocitychurch/" },
                { icon: FaTelegram, label: "Telegram", href: "https://t.me/yougochurch" },
                { icon: FaYoutube, label: "YouTube", href: "https://l.facebook.com/l.php?u=https%3A%2F%2Fyoutube.com%2F%40https%253A%252F%252Fyoutube.com%252F%2540You_Go_City_Church%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR3mq7LwptcRr0jBIB0iIZqvVI1j_ksPVmxSx7Vrfs7B4djeLZnKuOId_m0_aem_-2jA8slRsiHNrPKAkbOxHw&h=AT3KFsbExbZmmRjl4lw9gstYOXWudl_jQ_Qeb-wP6KxM1K33NdN7hJG4CfupG9-2tY0w9DigrCsHQsY7LYVK_wzxU2RSFDauBlF_jpC8FU2-ZPKMAVJkb3Xmk6xF" },
                { icon: FaTiktok, label: "TikTok", href: "https://l.facebook.com/l.php?u=https%3A%2F%2Ftiktok.com%2F%40you_go_church%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR0CJJAdu6GW7Ot6VlHz2cvQe_kb95Gjkw5rCyFWPjBXQVfnnbosjIMZmKk_aem_sxx3VG8ATaT-FKIYtkO8Jg&h=AT1dbvdEfRys8NL9ITc1sOhyK6bXqF232lt1HUXfGOTZ-rJU2qoUsYG0bgnS_U0nnTOorC-zYiLGwMk_1OUSD9y-ked_tbWA_HzyN0IrD2DmSN9ri174uLpIgMmm" },
              ].map(({ icon: Icon, label, href }) => (
                <Link key={label} href={href} aria-label={label}>
                  <Icon className="h-6 w-6 text-white hover:text-white transition-colors duration-300" />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Events", href: "#" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-white hover:text-white transition-colors duration-300 text-lg">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-6">Connect With Us</h3>
            <address className="not-italic text-white space-y-4">
              <p className="text-lg">Bole Medhanialem Road, Addis Ababa, Ethiopia</p>
              <p className="text-lg">
                Phone: <a href="tel:+251911639350" className="hover:text-white transition-colors duration-300">+251 91 163 9350</a>
              </p>
              <p className="text-lg">
                Email: <a href="mailto:amlak2002@yahoo.com" className="hover:text-white transition-colors duration-300">amlak2002@yahoo.com</a>
              </p>
            </address>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-800 text-center">
          <p className="text-white text-lg">&copy; {currentYear} YouGo City Church. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default FooterPage


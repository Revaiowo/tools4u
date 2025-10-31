import { Github, Mail, Twitter, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer
      id="contact"
      className="bg-background mt-40 border-t border-amber-300/30 text-gray-300 py-10 px-6 md:px-16"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-3xl font-bold text-white">
            Tools<span className="text-amber-300">4</span>You
          </h2>
          <p className="mt-2 text-gray-400 text-sm max-w-sm">
            Smart, simple, and secure tools to help you convert, create, and
            manage your files — all in one place.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="hidden items-center md:flex md:flex-col md:items-start">
          <h3 className="text-xl font-semibold text-amber-300 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a
                href="#home"
                className="hover:text-amber-300 transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="hover:text-amber-300 transition-colors duration-300"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#why-tools4u"
                className="hover:text-amber-300 transition-colors duration-300"
              >
                Why Tools4You
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-amber-300 transition-colors duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold text-amber-300 mb-3">
            Connect With Us
          </h3>
          <div className="flex gap-5 mb-4">
            <a
              href="https://github.com/Revaiowo"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300 transition-colors duration-300"
            >
              <Github size={22} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300 transition-colors duration-300"
            >
              <Twitter size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/aaditya-sharma-38b069250"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300 transition-colors duration-300"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="mailto:contact@tools4u.com"
              className="hover:text-amber-300 transition-colors duration-300"
            >
              <Mail size={22} />
            </a>
          </div>
          <p className="text-sm text-gray-500">contact@tools4you.com</p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-amber-300/20 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Tools4You. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

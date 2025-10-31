"use client";

import { useState } from "react";
import { Hammer, Menu, X } from "lucide-react";

function Header() {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setOpen(false); // close mobile menu after click
    }
  };

  return (
    <header className="flex justify-between px-4 py-3 items-center bg-background backdrop-blur-md border-b border-amber-300/20 z-50 sticky top-0">
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => scrollToSection("home")}
      >
        <div className="text-amber-300">
          <Hammer size={30} />
        </div>
        <div className="text-3xl font-semibold text-white">
          Tools<span className="text-amber-300">4</span>You
        </div>
      </div>

      {/* Menu toggle (mobile) */}
      <button
        onClick={() => setOpen(!open)}
        className="sm:hidden text-amber-300 focus:outline-none"
      >
        {open ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* Dropdown menu (mobile) */}
      {open && (
        <div
          className={`absolute top-full left-0 w-full bg-black/95 border-t border-amber-300/30 flex flex-col items-center gap-6 py-6 font-medium text-2xl text-gray-300 transition-all duration-500 ${
            open
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div
            onClick={() => scrollToSection("home")}
            className="hover:text-amber-300 cursor-pointer"
          >
            Home
          </div>
          <div
            onClick={() => scrollToSection("why-tools4u")}
            className="hover:text-amber-300 cursor-pointer"
          >
            Why Tools4You
          </div>
          <div
            onClick={() => scrollToSection("services")}
            className="hover:text-amber-300 cursor-pointer"
          >
            Our Services
          </div>
          <div
            onClick={() => scrollToSection("contact")}
            className="hover:text-amber-300 cursor-pointer"
          >
            Contact
          </div>
        </div>
      )}

      {/* Links for desktop */}
      <nav className="hidden sm:flex gap-8 font-medium text-xl text-white">
        <div
          onClick={() => scrollToSection("home")}
          className="hover:text-amber-300 cursor-pointer transition-colors"
        >
          Home
        </div>
        <div
          onClick={() => scrollToSection("why-tools4u")}
          className="hover:text-amber-300 cursor-pointer transition-colors"
        >
          Why Tools4You
        </div>
        <div
          onClick={() => scrollToSection("services")}
          className="hover:text-amber-300 cursor-pointer transition-colors"
        >
          Our Services
        </div>
        <div
          onClick={() => scrollToSection("contact")}
          className="hover:text-amber-300 cursor-pointer transition-colors"
        >
          Contact
        </div>
      </nav>
    </header>
  );
}

export default Header;

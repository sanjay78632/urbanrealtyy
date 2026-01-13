"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone, Instagram, Facebook } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const PHONE = process.env.NEXT_PUBLIC_PHONE || "7990900080";
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917990900080";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const waText = encodeURIComponent("Hello! I'd like to book a site visit.");
  const waUrl = `https://wa.me/${WHATSAPP}?text=${waText}`;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <nav className="mx-auto flex min-h-[88px] max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="UrbanRealtyy Logo"
            width={52}
            height={52}
            priority
            className="object-contain"
          />
          <span className="text-xl font-semibold">UrbanRealtyy</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-sm font-medium hover:text-rose-700">
            About Us
          </Link>

          <Link href="/contact" className="text-sm font-medium hover:text-rose-700">
            Contact Us
          </Link>

          <Link href="/#browse" className="text-sm font-medium hover:text-rose-700">
            Browse Properties
          </Link>

          <div className="h-6 w-px bg-gray-200" />

          <a
            href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <Phone className="h-4 w-4 text-rose-700" />
            {PHONE}
          </a>

          <a
            href={waUrl}
            target="_blank"
            className="rounded-md bg-rose-700 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-800 transition"
          >
            Book A Visit
          </a>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" className="text-gray-600 hover:text-rose-700">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/urbanrealtyy/" target="_blank" className="text-gray-600 hover:text-rose-700">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={waUrl} target="_blank" className="text-gray-600 hover:text-rose-700">
              <FaWhatsapp className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden h-10 w-10 rounded-md border flex items-center justify-center"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-4 flex flex-col gap-4">
            <Link href="/about" onClick={() => setOpen(false)}>About Us</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact Us</Link>
            <Link href="/#browse" onClick={() => setOpen(false)}>Browse Properties</Link>

            <a href={`tel:${PHONE}`} className="flex items-center gap-2 font-semibold">
              <Phone className="h-4 w-4 text-rose-700" />
              {PHONE}
            </a>

            <a
              href={waUrl}
              target="_blank"
              className="rounded-md bg-rose-700 px-4 py-2 text-center text-white font-semibold"
            >
              Book A Visit
            </a>

            <div className="flex gap-4 pt-2">
              <Facebook className="h-5 w-5" />
              <Instagram className="h-5 w-5" />
              <FaWhatsapp className="h-5 w-5" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

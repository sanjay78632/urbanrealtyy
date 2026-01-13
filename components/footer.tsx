"use client";

import Link from "next/link";
import { Facebook, Instagram, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/40 border-t">
      {/* MAIN FOOTER */}
      <div className="w-full px-16 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* LEFT */}
          <div>
            <h3 className="text-lg font-semibold mb-3">UrbanRealtyy</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Your trusted one-stop destination for all property needs — buy,
              rent, or invest with confidence. We help you find the right
              property within your budget.
            </p>
          </div>

          {/* CENTER */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-rose-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-rose-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-rose-600">
                  Contact Us
                </Link>
              </li>
              <Link href="/help-faqs" className="hover:text-rose-600">
                Help & FAQs
              </Link>

              <li>
                <Link href="/privacy-policy" className="hover:text-rose-600">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* RIGHT */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Connect with Us</h4>

            <div className="space-y-3 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-600" />
                <span>+91 7990900080</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-600" />
                <span>deepakurbanrealty@gmail.com</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-2">Follow us on</p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-rose-600"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/urbanrealtyy/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-rose-600">
                    <Instagram className="w-5 h-5" />
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} UrbanRealtyy. All rights reserved.
      </div>
    </footer>
  );
}

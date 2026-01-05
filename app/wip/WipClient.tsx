"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Phone, Clock, Instagram, Facebook, Youtube } from "lucide-react";

export default function WipClient({
  whatsapp,
  email,
}: {
  whatsapp: string;
  email: string;
}) {
  const [addr, setAddr] = useState("");

  function handleWhatsApp() {
    const msg =
      "Hi! I visited your site and saw it's under construction. Please notify me when it goes live.";
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }

  function handleMail() {
    window.location.href = `mailto:${email}?subject=Notify me&body=Hi, please let me know when the website is live.`;
  }

  return (
    <div className="min-h-[80vh] flex items-center">
      <div className="mx-auto max-w-6xl px-4 w-full">
        <Card className="grid gap-8 rounded-3xl border p-6 md:p-10 md:grid-cols-2">
          {/* Left: copy */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs text-zinc-600 w-max">
              <Clock className="h-3.5 w-3.5" />
              Work in Progress
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl leading-tight">
              We’re Building Something <span className="text-rose-600">Great</span> 🔧
            </h1>

            <p className="mt-3 text-zinc-600">
              Our full website is under construction. In the meantime, reach us for property
              inquiries or get notified when we launch.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button onClick={handleWhatsApp} className="h-11 rounded-xl">
                Contact on WhatsApp
              </Button>
              <Button variant="outline" onClick={handleMail} className="h-11 rounded-xl">
                <Mail className="mr-2 h-4 w-4" />
                Email Us
              </Button>
            </div>

            {/* Simple notify form using mailto (no backend) */}
            <form
              className="mt-6 flex flex-col gap-2 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `mailto:${email}?subject=Notify me&body=My email: ${addr}`;
              }}
            >
              <input
                type="email"
                required
                value={addr}
                onChange={(e) => setAddr(e.target.value)}
                placeholder="Enter your email for launch updates"
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-rose-100"
              />
              <Button type="submit" className="rounded-xl">Notify Me</Button>
            </form>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-4 text-zinc-700">
              <span className="text-sm text-zinc-500">Follow us:</span>
              <Link href="https://instagram.com" target="_blank" className="p-2 rounded-full border hover:bg-zinc-50">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="https://facebook.com" target="_blank" className="p-2 rounded-full border hover:bg-zinc-50">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="https://youtube.com" target="_blank" className="p-2 rounded-full border hover:bg-zinc-50">
                <Youtube className="h-4 w-4" />
              </Link>
              <a href={`tel:+${whatsapp}`} className="ml-auto inline-flex items-center gap-2 text-sm hover:underline">
                <Phone className="h-4 w-4" />
                +{whatsapp}
              </a>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="relative order-first md:order-last">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[640px] overflow-hidden rounded-2xl bg-gradient-to-b from-rose-50 to-white">
              <Image
                src="/under-construction.png"
                alt="Website under construction"
                fill
                className="object-contain p-6"
                priority
              />
            </div>

            {/* cosmetic progress bar */}
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-zinc-100">
              <div className="h-full w-1/2 animate-[progress_2.2s_ease_infinite] rounded-full bg-rose-500" />
            </div>
            <style jsx>{`
              @keyframes progress {
                0% { transform: translateX(-100%); }
                50% { transform: translateX(10%); }
                100% { transform: translateX(120%); }
              }
            `}</style>
          </div>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
function CountUp({
  end,
  duration = 1200,
}: {
  end: number;
  duration?: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOut
      const current = Math.floor(eased * end);

      setValue(current);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [end, duration]);

  return <>{value.toLocaleString("en-IN")}+</>;
}


export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 grid lg:grid-cols-2 gap-14 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1 text-sm shadow-sm"
          >
            ✨ Zero Brokerage · Verified Listings
          </motion.span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight">
            Your Dream{" "}
            <span className="text-rose-600 relative">
              Property
              <span className="absolute left-0 -bottom-2 h-1 w-full bg-rose-200 rounded-full" />
            </span>
            <br />
            Awaits
          </h1>

          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Discover premium homes & commercial spaces in Ahmedabad and beyond.
            Trusted listings, real prices, zero brokerage.
          </p>

          <div className="mt-8 flex gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/#browse"
                className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white shadow-lg hover:bg-rose-700"
              >
                Browse Properties
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border px-6 py-3 font-semibold hover:bg-muted"
              >
                Book a Visit
              </Link>
            </motion.div>
          </div>

          {/* TRUST STATS */}
          <div className="mt-10 grid grid-cols-2 gap-6 max-w-md">
            <Card className="p-4 text-center">
  <div className="text-3xl font-bold text-rose-600">
    <CountUp end={500} />
  </div>
  <div className="text-sm text-muted-foreground">
    Verified Properties
  </div>
</Card>

<Card className="p-4 text-center">
  <div className="text-3xl font-bold text-rose-600">
    <CountUp end={1000} />
  </div>
  <div className="text-sm text-muted-foreground">
    Happy Clients
  </div>
</Card>

          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        {/* RIGHT IMAGE */}
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  whileHover={{ y: -6 }}
  className="relative group"
>
  {/* Glow effect */}
  <div className="pointer-events-none absolute -inset-2 rounded-3xl opacity-0 blur-2xl transition duration-500 group-hover:opacity-100 bg-gradient-to-r from-rose-400/40 via-rose-500/30 to-rose-400/40" />

  {/* Border highlight */}
  <div className="absolute inset-0 rounded-3xl ring-1 ring-transparent transition duration-500 group-hover:ring-rose-400/60" />

  {/* Image card */}
  <Card className="relative overflow-hidden rounded-3xl shadow-xl">
    <div className="relative h-[420px] w-full">
      <Image
        src="/hero.png"
        alt="Luxury real estate"
        fill
        priority
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
  </Card>

  {/* Floating badge */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
    className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-4 shadow-lg"
  >
    <div className="text-sm font-semibold">
      📍 Ahmedabad · Gandhinagar
    </div>
    <div className="text-xs text-muted-foreground">
      Prime locations
    </div>
  </motion.div>
</motion.div>

      </div>
    </section>
  );
}

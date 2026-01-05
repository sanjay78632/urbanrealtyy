"use client";

import { useEffect, useState } from "react";
import type { Property } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Bed,
  Bath,
  Ruler,
  Download,
  Share2,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface PropertyCardProps {
  property: Property;
  builderName?: string | null;
  reraId?: string | null;
}

function publicUrl(bucket: "property-images" | "brochures", path: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return `${base}/storage/v1/object/public/${bucket}/${path}`;
}

const inr = new Intl.NumberFormat("en-IN");
const siteBase = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const tidy = (s?: string | null) =>
  (s || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)
    .join(", ");

export function PropertyCard({ property, builderName }: PropertyCardProps) {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "91XXXXXXXXXX";

  const slides =
    (property.images?.length ?? 0) > 0
      ? [...property.images!]
          .sort((a, b) => a.position - b.position)
          .map((img) => ({
            url: publicUrl("property-images", img.file_path),
            alt: property.title,
          }))
      : property.image_url
      ? [{ url: property.image_url, alt: property.title }]
      : [];

  const [i, setI] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 3500);
    return () => clearInterval(t);
  }, [slides.length]);

  const brochureUrl = property.brochure_path
    ? publicUrl("brochures", property.brochure_path)
    : null;

  const location = tidy(property.location);
  const builder = property.builder_name || builderName || null;
  const detailUrl = `/property/${property.id}`;

  function handleWhatsAppInquiry() {
    const msg = `Hi, I'm interested in "${property.title}" at ${location}. Price: ₹${inr.format(
      property.price
    )}. ${siteBase}${detailUrl}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }

  async function handleShare() {
    const url = `${siteBase}${detailUrl}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: property.title, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    }
  }

  const isNewLaunch = (property.transaction_type || "").toLowerCase() === "buy";

  return (
    <Card className="rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition">
      {/* IMAGE */}
      <div className="relative w-full aspect-[16/9] bg-muted overflow-hidden">
        {slides.length ? (
          slides.map((s, idx) => (
            <Image
              key={idx}
              src={s.url}
              alt={s.alt}
              fill
              priority={idx === 0}
              className={`object-cover transition-opacity duration-700 ${
                idx === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No image available
          </div>
        )}

        <span className="absolute top-3 left-3 text-xs bg-black/80 text-white px-2 py-1 rounded-lg">
          Zero Brokerage
        </span>

        {isNewLaunch && (
          <span className="absolute top-3 right-3 text-xs bg-rose-600 text-white px-2 py-1 rounded-lg">
            New Launch
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-xl font-semibold leading-snug">
            {property.title}
          </h3>
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="mt-1 flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <Link href={detailUrl} className="text-rose-600 font-medium">
            {location || property.city}
          </Link>
        </div>

        {builder && (
          <div className="mt-2 text-sm text-muted-foreground">
            Builder:{" "}
            <span className="bg-neutral-100 text-neutral-900 px-2 py-1 rounded-md">
              {builder}
            </span>
          </div>
        )}

        <div className="mt-3 grid grid-cols-2 gap-3 border rounded-xl p-3">
          <div>
            <div className="font-medium capitalize">{property.type}</div>
            <div className="flex gap-3 text-sm text-muted-foreground">
              {property.bedrooms && (
                <span className="flex items-center gap-1">
                  <Bed className="w-4 h-4" />
                  {property.bedrooms}
                </span>
              )}
              {property.bathrooms && (
                <span className="flex items-center gap-1">
                  <Bath className="w-4 h-4" />
                  {property.bathrooms}
                </span>
              )}
            </div>
          </div>

          <div className="text-right text-sm">
            <div className="font-medium">Super Builtup</div>
            <div className="text-muted-foreground">
              {property.area_sqft
                ? `${inr.format(property.area_sqft)} sqft`
                : "—"}
            </div>
            <div className="font-semibold">
              ₹ {inr.format(property.price)}
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {brochureUrl ? (
            <Button
              asChild
              className="rounded-xl h-10 bg-rose-600 text-white hover:bg-rose-700"
            >
              <a href={brochureUrl} target="_blank" download>
                <Download className="w-4 h-4 mr-2" />
                Brochure
              </a>
            </Button>
          ) : (
            <Button disabled className="rounded-xl h-10">
              Brochure
            </Button>
          )}

          {/* ✅ WhatsApp Button */}
          <Button
            onClick={handleWhatsAppInquiry}
            className="rounded-xl h-10 bg-[#25D366] text-white hover:bg-[#1ebe5d]"
          >
            <FaWhatsapp className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>

          <Button asChild className="rounded-xl h-10 bg-rose-600 text-white hover:bg-rose-700">
            <Link href={detailUrl}>View Details</Link>
          </Button>

        </div>
      </div>
    </Card>
  );
}

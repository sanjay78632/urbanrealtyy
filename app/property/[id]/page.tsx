"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bed,
  Bath,
  Ruler,
  MessageCircle,
  Download,
} from "lucide-react";

const inr = new Intl.NumberFormat("en-IN");
const supabase = createClient();

function publicUrl(bucket: string, path: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
}

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("properties")
        .select(
          `
          *,
          images:property_images(file_path, position)
        `
        )
        .eq("id", id)
        .single();

      if (error || !data) return notFound();

      setProperty(data);

      const gallery =
        data.images?.length > 0
          ? data.images
              .sort((a: any, b: any) => a.position - b.position)
              .map((i: any) =>
                publicUrl("property-images", i.file_path)
              )
          : data.image_url
          ? [data.image_url]
          : [];

      setImages(gallery);
    })();
  }, [id]);

  if (!property) return null;

  const next = () => setIdx((i) => (i + 1) % images.length);
  const prev = () => setIdx((i) => (i === 0 ? images.length - 1 : i - 1));

  const whatsappText = encodeURIComponent(
    `Hi, I'm interested in "${property.title}" at ${property.location}, ${property.city}.
Price: ₹${inr.format(property.price)}.`
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">{property.title}</h1>

      <div className="mt-1 flex items-center gap-2 text-muted-foreground">
        <MapPin className="w-4 h-4" />
        {property.location}, {property.city}
      </div>

      <div className="mt-2 text-2xl font-semibold text-rose-600">
        ₹ {inr.format(property.price)}
      </div>

      {/* Image Carousel */}
      <div className="relative mt-6 h-[420px] rounded-2xl overflow-hidden bg-muted">
        {images.length > 0 && (
          <>
            <Image
              src={images[idx]}
              alt={property.title}
              fill
              className="object-cover"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                >
                  <ChevronRight />
                </button>
              </>
            )}
          </>
        )}
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-3">
        {/* Left */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-muted-foreground mb-6">
            {property.description || "No description provided."}
          </p>

          <h2 className="text-xl font-semibold mb-2">Property Details</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>Type: {property.type}</div>
            <div>Transaction: {property.transaction_type}</div>
            <div className="flex gap-2"><Bed className="w-4" /> {property.bedrooms ?? "—"} Beds</div>
            <div className="flex gap-2"><Bath className="w-4" /> {property.bathrooms ?? "—"} Baths</div>
            <div className="flex gap-2"><Ruler className="w-4" /> {property.area_sqft ?? "—"} sqft</div>
            <div>Builder: {property.builder_name}</div>
          </div>
        </div>

        {/* CTA */}
        <div className="border rounded-2xl p-6 h-fit">
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${whatsappText}`}
            target="_blank"
            className="mb-3 flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-3 font-semibold text-white"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Inquiry
          </a>

          {property.brochure_path && (
            <a
              href={publicUrl("brochures", property.brochure_path)}
              target="_blank"
              className="flex items-center justify-center gap-2 rounded-xl border border-rose-600 px-4 py-3 font-semibold text-rose-600"
            >
              <Download className="w-4 h-4" />
              Download Brochure
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

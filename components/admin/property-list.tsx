"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Property } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Edit, Trash2, ImageIcon, Loader } from "lucide-react";

interface PropertyListProps {
  userId: string;
}

export function PropertyList({ userId }: PropertyListProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("properties")
        .select("*")
        .eq("created_by", userId)
        .order("created_at", { ascending: false });

      if (data) setProperties(data as Property[]);
      setLoading(false);
    };

    if (userId) fetchProperties();
  }, [userId]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    setDeletingId(id);
    const supabase = createClient();
    await supabase.from("properties").delete().eq("id", id);

    setProperties((prev) => prev.filter((p) => p.id !== id));
    setDeletingId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader className="w-8 h-8 animate-spin text-rose-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {properties.length === 0 && (
        <div className="text-center py-20 border rounded-xl">
          <p className="text-muted-foreground mb-4">
            No properties added yet.
          </p>
          <Link
            href="/admin/add-property"
            className="inline-block bg-rose-600 text-white px-6 py-2 rounded-lg font-medium"
          >
            + Add Property
          </Link>
        </div>
      )}

      {properties.map((property) => (
        <div
          key={property.id}
          className="flex flex-col md:flex-row gap-6 border rounded-2xl p-5 bg-white shadow-sm"
        >
          {/* IMAGE */}
          <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden bg-muted">
            {property.image_url ? (
              <Image
                src={property.image_url}
                alt={property.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <ImageIcon className="w-8 h-8" />
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold">
              {property.title}
            </h3>

            <div className="flex gap-2 mt-1 text-xs">
              <span className="px-2 py-0.5 rounded bg-gray-100">
                {property.type}
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-700">
                {property.transaction_type}
              </span>
            </div>

            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {property.description}
            </p>

            <p className="mt-2 text-sm">
              📍 {property.location}
            </p>

            <p className="mt-1 font-semibold text-rose-600">
              ₹ {property.price.toLocaleString("en-IN")}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex md:flex-col gap-3 justify-center">
            <Link
              href={`/admin/edit-property/${property.id}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Link>

            <button
              onClick={() => handleDelete(property.id)}
              disabled={deletingId === property.id}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                         bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
            >
              <Trash2 className="w-4 h-4" />
              {deletingId === property.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

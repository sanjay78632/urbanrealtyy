"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {PropertyCard}from "@/components/property-card";
import type { Property, PropertyType, TransactionType } from "@/lib/types";
import { Loader } from "lucide-react";
import TopFilters from "@/components/top-filters";

type Filters = {
  transactionType: TransactionType | "";
  propertyType: PropertyType | "";
  priceRange: [number, number];
  city: string;
};

export function ListingsContainer() {
  const supabase = createClient();

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<Filters>({
    transactionType: "",
    propertyType: "",
    priceRange: [0, 100000000],
    city: "",
  });

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("properties")
        .select(
          `
          id,
          title,
          description,
          price,
          location,
          city,
          type,
          transaction_type,
          bedrooms,
          bathrooms,
          area_sqft,
          image_url,
          brochure_path,
          builder_name,
          created_at,
          updated_at,
          created_by,
          images:property_images(id,property_id,file_path,position,created_at)
        `
        )
        .order("created_at", { ascending: false })
        .order("position", { ascending: true, foreignTable: "property_images" });

      if (!error && data) setProperties(data as Property[]);
      setLoading(false);
    })();
  }, [supabase]);

  const filtered = useMemo(() => {
    let result = [...properties];

    const tx = filters.transactionType ? filters.transactionType.toLowerCase() : "";
    if (tx) result = result.filter((p) => (p.transaction_type || "").toLowerCase() === tx);

    if (filters.propertyType) result = result.filter((p) => p.type === filters.propertyType);

    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    if (filters.city) result = result.filter((p) => p.city === filters.city);

    return result;
  }, [properties, filters]);

  return (
    <section id="browse" className="space-y-6">
      {/* Top search bar */}
      <TopFilters value={filters} onApply={(next) => setFilters(next)} />

      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center min-h-96">
          <Loader className="animate-spin w-8 h-8 text-primary" />
        </div>
      ) : filtered.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No properties found</h3>
          <p className="text-muted-foreground">Try adjusting your filters above.</p>
        </div>
      )}
    </section>
  );
}

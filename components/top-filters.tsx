"use client";

import { useEffect, useMemo, useState } from "react";
import type { PropertyType, TransactionType } from "@/lib/types";
import { Search } from "lucide-react";

type Filters = {
  transactionType: TransactionType | "";
  propertyType: PropertyType | "";
  priceRange: [number, number];
  city: string;
};

interface TopFiltersProps {
  value: Filters;
  onApply: (next: Filters) => void;
}

const PROPERTY_TYPES: PropertyType[] = [
  "apartment",
  "office",
  "house",
  "land",
  "commercial",
  "retail",
];

const TX_TYPES: TransactionType[] = ["rent", "buy"];

export default function TopFilters({ value, onApply }: TopFiltersProps) {
  const [draft, setDraft] = useState<Filters>(value);
  const [cities, setCities] = useState<string[]>(["Ahmedabad", "Gandhinagar"]);

  useEffect(() => setDraft(value), [value]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/cities");
        if (res.ok) {
          const data = await res.json();
          setCities(data.cities || []);
        }
      } catch {}
    })();
  }, []);

  const canSearch = useMemo(() => true, [draft]);

  return (
    <div className="w-full rounded-2xl border bg-white shadow-sm">
      <div className="grid gap-3 p-3 sm:grid-cols-2 lg:grid-cols-5">
        {/* Building Type */}
        <div className="flex flex-col">
          <label className="text-xs font-medium text-rose-700 mb-1">
            Building Type
          </label>
          <select
            className="h-11 rounded-full border px-4 text-sm outline-none
                       focus:ring-2 focus:ring-rose-500/30"
            value={draft.propertyType}
            onChange={(e) =>
              setDraft((d) => ({
                ...d,
                propertyType: e.target.value as PropertyType | "",
              }))
            }
          >
            <option value="">All Types</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t[0].toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="text-xs font-medium text-rose-700 mb-1">
            Category
          </label>
          <select
            className="h-11 rounded-full border px-4 text-sm outline-none
                       focus:ring-2 focus:ring-rose-500/30"
            value={draft.transactionType}
            onChange={(e) =>
              setDraft((d) => ({
                ...d,
                transactionType: e.target.value as TransactionType | "",
              }))
            }
          >
            <option value="">All</option>
            {TX_TYPES.map((t) => (
              <option key={t} value={t}>
                {t[0].toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label className="text-xs font-medium text-rose-700 mb-1">
            Location
          </label>
          <select
            className="h-11 rounded-full border px-4 text-sm outline-none
                       focus:ring-2 focus:ring-rose-500/30"
            value={draft.city}
            onChange={(e) =>
              setDraft((d) => ({ ...d, city: e.target.value }))
            }
          >
            <option value="">All Cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price */}
        <div className="flex flex-col">
          <label className="text-xs font-medium text-rose-700 mb-1">
            Min Price (₹)
          </label>
          <input
            type="number"
            className="h-11 rounded-full border px-4 text-sm outline-none
                       focus:ring-2 focus:ring-rose-500/30"
            value={draft.priceRange[0]}
            onChange={(e) =>
              setDraft((d) => ({
                ...d,
                priceRange: [Number(e.target.value || 0), d.priceRange[1]],
              }))
            }
            placeholder="0"
          />
        </div>

        {/* Max Price + Search */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-2">
          <div className="flex-1">
            <label className="text-xs font-medium text-rose-700 mb-1">
              Max Price (₹)
            </label>
            <input
              type="number"
              className="h-11 w-full rounded-full border px-4 text-sm outline-none
                         focus:ring-2 focus:ring-rose-500/30"
              value={draft.priceRange[1]}
              onChange={(e) =>
                setDraft((d) => ({
                  ...d,
                  priceRange: [d.priceRange[0], Number(e.target.value || 0)],
                }))
              }
              placeholder="10000000"
            />
          </div>

          <button
            onClick={() => onApply(draft)}
            disabled={!canSearch}
            className="lg:w-28 h-11 rounded-full
                       bg-rose-600 text-white font-medium px-5
                       hover:bg-rose-700 transition
                       inline-flex items-center justify-center"
            aria-label="Search"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

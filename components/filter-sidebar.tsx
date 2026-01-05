"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PropertyType, TransactionType } from "@/lib/types";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";

const PROPERTY_TYPES: PropertyType[] = [
  "apartment",
  "office",
  "house",
  "land",
  "commercial",
  "retail",
];

const TRANSACTION_TYPES: TransactionType[] = ["rent", "buy"];

interface FilterSidebarProps {
  filters: {
    transactionType: TransactionType | "";
    propertyType: PropertyType | "";
    priceRange: [number, number];
    location: string;
  };
  setFilters: (filters: any) => void;
}

export function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const [cities, setCities] = useState<string[]>(["Ahmedabad", "Gandhinagar"]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("/api/cities");
        if (response.ok) {
          const data = await response.json();
          setCities(data.cities);
        }
      } catch {
        console.log("Using default cities");
      }
    };
    fetchCities();
  }, []);

  const LOCATIONS = ["All Cities", ...cities];

  const activeClass = "bg-rose-600 text-white hover:bg-rose-700";
  const inactiveClass = "hover:bg-muted";

  return (
    <div className="w-full md:w-72 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* City */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">City</h3>
            <div className="space-y-2">
              {LOCATIONS.map((location) => {
                const active =
                  (filters.location === "" && location === "All Cities") ||
                  filters.location === location;

                return (
                  <button
                    key={location}
                    onClick={() =>
                      setFilters({
                        ...filters,
                        location: location === "All Cities" ? "" : location,
                      })
                    }
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      active ? activeClass : inactiveClass
                    }`}
                  >
                    {location}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Transaction Type */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">Transaction Type</h3>
            <div className="space-y-2">
              <button
                onClick={() =>
                  setFilters({ ...filters, transactionType: "" })
                }
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  filters.transactionType === ""
                    ? activeClass
                    : inactiveClass
                }`}
              >
                All
              </button>

              {TRANSACTION_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() =>
                    setFilters({ ...filters, transactionType: type })
                  }
                  className={`w-full text-left px-3 py-2 rounded-md text-sm capitalize transition-colors ${
                    filters.transactionType === type
                      ? activeClass
                      : inactiveClass
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Property Type */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">Property Type</h3>
            <div className="space-y-2">
              <button
                onClick={() =>
                  setFilters({ ...filters, propertyType: "" })
                }
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  filters.propertyType === ""
                    ? activeClass
                    : inactiveClass
                }`}
              >
                All Types
              </button>

              {PROPERTY_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() =>
                    setFilters({ ...filters, propertyType: type })
                  }
                  className={`w-full text-left px-3 py-2 rounded-md text-sm capitalize transition-colors ${
                    filters.propertyType === type
                      ? activeClass
                      : inactiveClass
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">Price Range</h3>

            <Slider
              min={0}
              max={100000000}
              step={100000}
              value={filters.priceRange}
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  priceRange: [value[0], value[1]],
                })
              }
              className="w-full
                [&_[role=slider]]:bg-rose-600
                [&_[role=slider]]:border-rose-600
                [&_.range]:bg-rose-600"
            />

            <div className="flex gap-2 mt-2 text-sm text-muted-foreground">
              <span>₹ {filters.priceRange[0].toLocaleString("en-IN")}</span>
              <span>-</span>
              <span>₹ {filters.priceRange[1].toLocaleString("en-IN")}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

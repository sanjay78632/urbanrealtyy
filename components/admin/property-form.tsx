"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Property, PropertyType, TransactionType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader, AlertCircle, CheckCircle, Upload, Trash2, FileText } from "lucide-react";

const PROPERTY_TYPES: PropertyType[] = ["apartment", "office", "house", "land", "commercial", "retail"];
const TRANSACTION_TYPES: TransactionType[] = ["rent", "buy"];

interface PropertyFormProps {
  userId: string;
  property?: Property;
}

export function PropertyForm({ userId, property }: PropertyFormProps) {
  const [formData, setFormData] = useState({
    title: property?.title || "",
    description: property?.description || "",
    price: property?.price?.toString() || "",
    location: property?.location || "",
    type: (property?.type as PropertyType) || "apartment",
    transaction_type: (property?.transaction_type as TransactionType) || "rent",
    bedrooms: property?.bedrooms?.toString() || "",
    bathrooms: property?.bathrooms?.toString() || "",
    area_sqft: property?.area_sqft?.toString() || "",
    city: property?.city || "",
    // NEW
    builder_name: (property as any)?.builder_name || "",
  });

  const [cities, setCities] = useState<string[]>(["Ahmedabad", "Gandhinagar"]);
  const [newCity, setNewCity] = useState("");
  const [showNewCityInput, setShowNewCityInput] = useState(false);

  // assets state (unchanged)
  const [existingImages, setExistingImages] = useState<{ id: string; file_path: string; position: number }[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [brochureFile, setBrochureFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [assetsLoading, setAssetsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // ---------------- Helpers ----------------
  function isImageAllowed(file: File) {
    return ["image/jpeg", "image/webp"].includes(file.type);
  }

  async function compressImageToWebp(file: File, maxW = 1600, quality = 0.8): Promise<Blob> {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
    const scale = Math.min(1, maxW / (img.naturalWidth || 1));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round((img.naturalWidth || 1) * scale);
    canvas.height = Math.round((img.naturalHeight || 1) * scale);
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const blob: Blob = await new Promise((resolve) =>
      canvas.toBlob((b) => resolve(b as Blob), "image/webp", quality)
    );
    URL.revokeObjectURL(img.src);
    return blob;
  }

  async function refreshExistingImages(propId: string) {
    const { data } = await supabase
      .from("property_images")
      .select("id,file_path,position")
      .eq("property_id", propId)
      .order("position", { ascending: true });
    setExistingImages(data ?? []);
  }

  // --------------- Effects -----------------
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("/api/cities");
        if (response.ok) {
          const data = await response.json();
          setCities(data.cities);
        }
      } catch {
        console.log("[v0] Failed to fetch cities");
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    if (property?.id) refreshExistingImages(property.id);
  }, [property?.id]);

  // --------------- Handlers ----------------
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCity = async () => {
    if (!newCity.trim()) return;
    try {
      const response = await fetch("/api/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: newCity.trim() }),
      });
      if (response.ok) {
        const data = await response.json();
        setCities(data.cities);
        setFormData((prev) => ({ ...prev, city: newCity.trim() }));
        setNewCity("");
        setShowNewCityInput(false);
      }
    } catch {
      console.log("[v0] Failed to add city");
    }
  };

  async function uploadAssets(propId: string) {
    setAssetsLoading(true);
    try {
      const remaining = Math.max(0, 5 - existingImages.length);
      const files = imageFiles.filter(isImageAllowed).slice(0, remaining);

      files.forEach((f) => {
        if (f.size > 2 * 1024 * 1024) {
          console.warn(`"${f.name}" > 2MB, compressing before upload...`);
        }
      });

      for (let i = 0; i < files.length; i++) {
        const blob = await compressImageToWebp(files[i], 1600, 0.8);
        const path = `${userId}/${propId}/${crypto.randomUUID()}.webp`;

        const up = await supabase.storage.from("property-images").upload(path, blob, {
          upsert: false,
          contentType: "image/webp",
        });
        if (up.error) throw up.error;

        const ins = await supabase.from("property_images").insert({
          property_id: propId,
          file_path: path,
          position: existingImages.length + i,
        });
        if (ins.error) throw ins.error;
      }

      if (brochureFile) {
        if (brochureFile.type !== "application/pdf") throw new Error("Brochure must be a PDF");
        if (brochureFile.size > 5 * 1024 * 1024) throw new Error("Brochure must be ≤ 5 MB");

        const bPath = `${userId}/${propId}/brochure.pdf`;
        const bUp = await supabase.storage.from("brochures").upload(bPath, brochureFile, {
          upsert: true,
          contentType: "application/pdf",
        });
        if (bUp.error) throw bUp.error;

        const upd = await supabase.from("properties").update({ brochure_path: bPath }).eq("id", propId);
        if (upd.error) throw upd.error;
      }

      await refreshExistingImages(propId);
      setImageFiles([]);
      setBrochureFile(null);
    } finally {
      setAssetsLoading(false);
    }
  }

  async function removeImage(rowId: string, filePath: string) {
    const rm = await supabase.storage.from("property-images").remove([filePath]);
    if (rm.error) {
      setError(rm.error.message);
      return;
    }
    const del = await supabase.from("property_images").delete().eq("id", rowId);
    if (del.error) {
      setError(del.error.message);
      return;
    }
    await refreshExistingImages(property!.id);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const payload: Record<string, any> = {
        title: formData.title,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        location: formData.location,
        city: formData.city,
        type: formData.type,
        transaction_type: formData.transaction_type,
        bedrooms: formData.bedrooms ? Number.parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? Number.parseInt(formData.bathrooms) : null,
        area_sqft: formData.area_sqft ? Number.parseFloat(formData.area_sqft) : null,
        // REMOVED image_url
        builder_name: formData.builder_name, // NEW
        updated_at: new Date().toISOString(),
      };

      let propId = property?.id;

      if (propId) {
        const { error: upErr } = await supabase.from("properties").update(payload).eq("id", propId);
        if (upErr) throw upErr;
      } else {
        const { data: ins, error: insErr } = await supabase
          .from("properties")
          .insert({ ...payload, created_by: userId })
          .select("id")
          .single();
        if (insErr) throw insErr;
        propId = ins.id;
      }

      if (propId && (imageFiles.length || brochureFile)) {
        await uploadAssets(propId);
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin");
      }, 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-muted/30 py-6 md:py-10">
      <div className="mx-auto w-full max-w-3xl px-4">
        <Card className="w-full">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert variant="default" className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    {property?.id ? "Property updated" : "Property created"} successfully! Redirecting...
                  </AlertDescription>
                </Alert>
              )}

              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Property Title *</label>
                <Input
                  name="title"
                  placeholder="e.g., Modern 2BR Apartment in Downtown"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* NEW: Builder Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Builder Name *</label>
                <Input
                  name="builder_name"
                  placeholder="e.g., Shree Developers"
                  value={formData.builder_name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  placeholder="Describe the property, amenities, and features..."
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                />
              </div>

              {/* Type and Transaction Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Property Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  >
                    {PROPERTY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Transaction Type *</label>
                  <select
                    name="transaction_type"
                    value={formData.transaction_type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  >
                    {TRANSACTION_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price and City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price (₹) *</label>
                  <Input
                    name="price"
                    type="number"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">City *</label>
                  <div className="flex gap-2">
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-foreground"
                      required
                    >
                      <option value="">Select a city</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <Button type="button" variant="outline" onClick={() => setShowNewCityInput(!showNewCityInput)}>
                      +
                    </Button>
                  </div>
                  {showNewCityInput && (
                    <div className="flex gap-2 mt-2">
                      <Input
                        type="text"
                        placeholder="New city name"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                      />
                      <Button type="button" onClick={handleAddCity}>
                        Add
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Location Details (Address) *</label>
                <Input
                  name="location"
                  placeholder="e.g., 123 Main St, Ahmedabad"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Bedrooms, Bathrooms, Area */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bedrooms</label>
                  <Input name="bedrooms" type="number" placeholder="0" value={formData.bedrooms} onChange={handleInputChange} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Bathrooms</label>
                  <Input name="bathrooms" type="number" placeholder="0" value={formData.bathrooms} onChange={handleInputChange} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Area (sqft)</label>
                  <Input
                    name="area_sqft"
                    type="number"
                    placeholder="0"
                    step="0.01"
                    value={formData.area_sqft}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Multiple images + brochure uploads */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Property Photos (JPEG/WebP) — Max 5</label>
                  <Input
                    type="file"
                    accept="image/jpeg,image/webp"
                    multiple
                    onChange={(e) => setImageFiles(Array.from(e.target.files ?? []))}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    You can add {Math.max(0, 5 - existingImages.length)} more. Each file ≤ 2 MB (will be compressed to WebP).
                  </p>

                  {existingImages.length > 0 && (
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-3">
                      {existingImages.map((img) => {
                        const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/property-images/${img.file_path}`;
                        return (
                          <div key={img.id} className="relative group">
                            <img src={url} className="w-full h-24 object-cover rounded" alt="" />
                            {property?.id && (
                              <button
                                type="button"
                                onClick={() => removeImage(img.id, img.file_path)}
                                className="absolute top-1 right-1 p-1 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition"
                                title="Remove"
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Brochure (PDF)</label>
                  <Input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setBrochureFile(e.target.files?.[0] ?? null)}
                  />
                  {property?.brochure_path && (
                    <div className="mt-2 text-sm flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>Existing brochure uploaded</span>
                    </div>
                  )}
                </div>

                {property?.id && (imageFiles.length || brochureFile) ? (
                  <Button
                    type="button"
                    onClick={() => uploadAssets(property.id!)}
                    disabled={assetsLoading}
                    className="gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    {assetsLoading ? "Uploading..." : "Upload Selected Files"}
                  </Button>
                ) : null}
              </div>

              {/* Submit */}
              <div className="flex gap-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      {property?.id ? "Updating..." : "Creating..."}
                    </>
                  ) : property?.id ? (
                    "Update Property"
                  ) : (
                    "Create Property"
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

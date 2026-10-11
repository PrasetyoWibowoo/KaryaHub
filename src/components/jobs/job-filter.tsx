"use client";

import * as React from "react";
import { CATEGORIES } from "@/constants/sample-cv-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, RotateCcw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export const JobFilter: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = React.useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = React.useState(
    searchParams.get("category") || "Semua Kategori"
  );
  const [selectedType, setSelectedType] = React.useState(
    searchParams.get("type") || "ALL"
  );

  const applyFilters = (newParams: { q?: string; category?: string; type?: string }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newParams.q !== undefined) {
      if (newParams.q) params.set("q", newParams.q);
      else params.delete("q");
    }

    if (newParams.category !== undefined) {
      if (newParams.category && newParams.category !== "Semua Kategori") {
        params.set("category", newParams.category);
      } else {
        params.delete("category");
      }
    }

    if (newParams.type !== undefined) {
      if (newParams.type && newParams.type !== "ALL") {
        params.set("type", newParams.type);
      } else {
        params.delete("type");
      }
    }

    router.push(`/jobs?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters({ q: search });
  };

  const handleReset = () => {
    setSearch("");
    setSelectedCategory("Semua Kategori");
    setSelectedType("ALL");
    router.push("/jobs");
  };

  return (
    <div className="space-y-4 rounded-lg border border-border-default bg-bg-surface p-4">
      {/* Search Input Bar */}
      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Cari posisi, keahlian, atau nama UMKM..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
        </div>
        <Button type="submit" size="md" variant="primary">
          Cari
        </Button>
      </form>

      {/* Filter Options Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border-default/60">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-text-secondary flex items-center gap-1">
            <Filter className="h-3.5 w-3.5" />
            Kategori:
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              applyFilters({ category: e.target.value });
            }}
            className="h-8 rounded-md border border-border-default bg-bg-surface px-2.5 py-1 text-xs text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Type Select */}
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              applyFilters({ type: e.target.value });
            }}
            className="h-8 rounded-md border border-border-default bg-bg-surface px-2.5 py-1 text-xs text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500"
          >
            <option value="ALL">Semua Tipe Pekerjaan</option>
            <option value="INTERNSHIP">Magang</option>
            <option value="PROJECT">Micro-Job</option>
            <option value="FREELANCE">Freelance</option>
          </select>
        </div>

        {(search || selectedCategory !== "Semua Kategori" || selectedType !== "ALL") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-xs text-text-muted hover:text-text-primary gap-1 h-8"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
};

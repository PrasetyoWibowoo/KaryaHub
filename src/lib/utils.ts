import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCompactRupiah(amount: number): string {
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    return `Rp ${millions % 1 === 0 ? millions : millions.toFixed(1)} jt`;
  }
  if (amount >= 1_000) {
    const thousands = amount / 1_000;
    return `Rp ${thousands % 1 === 0 ? thousands : thousands.toFixed(0)} rb`;
  }
  return `Rp ${amount}`;
}

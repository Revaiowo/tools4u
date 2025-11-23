import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const conversionModes = [
  {
    category: "Image Conversions",
    icon: "🖼️",
    modes: [
      { value: "png-jpg", label: "PNG → JPG", from: "png" },
      { value: "png-webp", label: "PNG → WebP", from: "png" },
      { value: "to-gif", label: "PNG → GIF", from: "png" },
      { value: "jpg-png", label: "JPG → PNG", from: "jpg" },
      { value: "jpg-webp", label: "JPG → WebP", from: "jpg" },
      { value: "to-gif", label: "JPG → GIF", from: "jpg" },
      { value: "webp-png", label: "WebP → PNG", from: "webp" },
      { value: "webp-jpg", label: "WebP → JPG", from: "webp" },
      { value: "gif-png", label: "GIF → PNG", from: "gif" },
      { value: "gif-jpg", label: "GIF → JPG", from: "gif" },
    ],
  },
  {
    category: "Image to PDF",
    icon: "📄",
    modes: [
      { value: "png-pdf", label: "PNG → PDF", from: "png" },
      { value: "jpg-pdf", label: "JPG → PDF", from: "jpg" },
      { value: "webp-pdf", label: "WebP → PDF", from: "webp" },
      { value: "img-pdf", label: "Image → PDF", from: "image" },
    ],
  },
  {
    category: "PDF Operations",
    icon: "📋",
    modes: [
      { value: "compress-pdf", label: "Compress PDF", from: "pdf" },
      { value: "pdf-merge", label: "Merge PDFs", from: "pdf" },
    ],
  },
  {
    category: "Text Operations",
    icon: "📝",
    modes: [{ value: "txt-pdf", label: "Text → PDF", from: "txt" }],
  },
  {
    category: "Compression",
    icon: "🗜️",
    modes: [
      { value: "compress-png", label: "Compress PNG", from: "png" },
      { value: "compress-jpg", label: "Compress JPG", from: "jpg" },
      { value: "compress-webp", label: "Compress WebP", from: "webp" },
    ],
  },
];

"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryProps {
  images: GalleryImage[];
}

export default function Gallery({ images }: GalleryProps) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % total);
  }, [total]);

  const previous = useCallback(() => {
    setCurrent((i) => (i - 1 + total) % total);
  }, [total]);

  if (total === 0) return null;

  const activeImage = images[current];

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-forest/10 shadow-xl">
        <img
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          className="aspect-[16/10] w-full object-cover"
        />
        <button
          type="button"
          onClick={previous}
          aria-label="Foto anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-cream/90 p-2 text-forest shadow-md hover:bg-cream transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Próxima foto"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-cream/90 p-2 text-forest shadow-md hover:bg-cream transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-forest/70 px-3 py-1 text-xs font-medium text-cream">
          {current + 1} / {total}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {images.map((image, index) => (
          <button
            key={image.src + index}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Ver ${image.alt}`}
            aria-current={index === current ? "true" : undefined}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              index === current ? "bg-terracotta" : "bg-forest/30 hover:bg-forest/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

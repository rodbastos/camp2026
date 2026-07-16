"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  edition: string;
  location: string;
}

const PAST_EDITIONS_IMAGES: GalleryImage[] = [
  {
    src: "/camp2019.JPG",
    alt: "Participantes do Camp 2019 em atividade ao ar livre na Fazenda Furquilha",
    edition: "Camp 2019",
    location: "Faz. Furquilha - Monte Alegre do Sul - SP",
  },
  {
    src: "/camp2019_2.JPG",
    alt: "Paisagem e convivência do Camp 2019 na Fazenda Furquilha",
    edition: "Camp 2019",
    location: "Faz. Furquilha - Monte Alegre do Sul - SP",
  },
  {
    src: "/camp2022.jpg",
    alt: "Roda de conversa do Camp 2022 na Fazenda Furquilha",
    edition: "Camp 2022",
    location: "Faz. Furquilha - Monte Alegre do Sul - SP",
  },
  {
    src: "/camp2022_2.jpg",
    alt: "Momento de conexão entre participantes do Camp 2022",
    edition: "Camp 2022",
    location: "Faz. Furquilha - Monte Alegre do Sul - SP",
  },
  {
    src: "/camp2022_3.JPG",
    alt: "Vista do Camp 2022 na Fazenda Furquilha",
    edition: "Camp 2022",
    location: "Faz. Furquilha - Monte Alegre do Sul - SP",
  },
  {
    src: "/camp2023.jpg",
    alt: "Participantes do Camp 2023 no Patrimônio Matutu",
    edition: "Camp 2023",
    location: "Patrimônio Matutu - Aiuruoca - MG",
  },
  {
    src: "/camp2023_2.jpg",
    alt: "Atividades em grupo no Camp 2023, em Aiuruoca",
    edition: "Camp 2023",
    location: "Patrimônio Matutu - Aiuruoca - MG",
  },
  {
    src: "/camp2023_3.jpg",
    alt: "Natureza e acolhimento do Camp 2023 no Matutu",
    edition: "Camp 2023",
    location: "Patrimônio Matutu - Aiuruoca - MG",
  },
  {
    src: "/camp2024.jpg",
    alt: "Cenas do Camp 2024 no Patrimônio Matutu",
    edition: "Camp 2024",
    location: "Patrimônio Matutu - Aiuruoca - MG",
  },
  {
    src: "/camp2024_2.jpg",
    alt: "Participantes reunidos no Camp 2024 em Aiuruoca",
    edition: "Camp 2024",
    location: "Patrimônio Matutu - Aiuruoca - MG",
  },
  {
    src: "/camp2025.jpg",
    alt: "Camp 2025 à beira da praia de Itanema",
    edition: "Camp 2025",
    location: "Praia de Itanema - Paraty Mirim - RJ",
  },
  {
    src: "/camp2025_2.jpg",
    alt: "Integração do Camp 2025 em Paraty Mirim",
    edition: "Camp 2025",
    location: "Praia de Itanema - Paraty Mirim - RJ",
  },
];

export default function Gallery() {
  const [current, setCurrent] = useState(0);
  const images = PAST_EDITIONS_IMAGES;
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
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-forest/10 shadow-xl">
        <Image
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/90 via-forest/60 to-transparent p-5 pt-14 text-cream">
          <h3 className="font-serif text-xl font-bold">{activeImage.edition}</h3>
          <p className="mt-1 flex items-center gap-2 text-sm text-cream/90">
            <MapPin className="h-4 w-4 shrink-0" />
            {activeImage.location}
          </p>
        </div>
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
        <div className="absolute right-3 top-3 rounded-full bg-forest/70 px-3 py-1 text-xs font-medium text-cream">
          {current + 1} / {total}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {images.map((image, index) => (
          <button
            key={image.src + index}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Ver foto do ${image.edition}`}
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

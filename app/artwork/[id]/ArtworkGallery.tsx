"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function ArtworkGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-forest/5">
        {images.map((img, i) => (
          <Image key={i} src={img} alt={`${title} ${i + 1}`} fill
            className={`object-cover transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-0"}`} />
        ))}
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`relative w-20 h-24 flex-shrink-0 overflow-hidden border-2 transition-all ${active === i ? "border-forest dark:border-rose" : "border-transparent opacity-50 hover:opacity-100"}`}>
              <Image src={img} alt={`${title} ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ArtCardSlideshow({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (hovered && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrent(p => (p + 1) % images.length);
      }, 800);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCurrent(0);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [hovered, images.length]);

  return (
    <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-forest/5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {images.map((img, i) => (
        <Image key={i} src={img} alt={`${title} ${i + 1}`} fill
          className={`object-cover transition-opacity duration-300 ${current === i ? "opacity-100" : "opacity-0"}`} />
      ))}
      {images.length > 1 && hovered && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <span key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? "bg-white" : "bg-white/40"}`} />
          ))}
        </div>
      )}
    </div>
  );
}

"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const IMAGES = [
  "https://images.unsplash.com/photo-1490750967868-88df5691cc5e?w=900&q=85",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=85",
  "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=900&q=85",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=85",
  "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=900&q=85",
  "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=900&q=85",
  "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=85",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=85",
];

// Layout: hero image fills left ~60%, collage fills right ~40%
// Cards are positioned so they never overlap
const CARDS = [
  // Right column — top to bottom, no overlap
  { src: IMAGES[1], top: "4%",  left: "62%", w: 200, h: 260 },
  { src: IMAGES[2], top: "4%",  left: "80%", w: 180, h: 240 },
  { src: IMAGES[3], top: "46%", left: "62%", w: 190, h: 250 },
  { src: IMAGES[4], top: "46%", left: "80%", w: 175, h: 230 },
];

export default function HeroSection() {
  const heroRef    = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<(HTMLDivElement | null)[]>([]);
  const hintRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      // progress 0→1 over first viewport height of scroll
      const p = Math.min(scrollY / vh, 1);

      // Hero image: zoom out as we scroll (starts at scale 1.08, ends at 1.0)
      if (heroRef.current) {
        const scale = 1.08 - p * 0.08;
        heroRef.current.style.transform = `scale(${scale})`;
      }

      // Overlay gradient: gets more opaque as we scroll (fade bottom)
      if (overlayRef.current) {
        // bottom opacity goes from 0.5 → 0.85
        const bottomOpacity = 0.5 + p * 0.35;
        overlayRef.current.style.background =
          `linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,${bottomOpacity}) 100%)`;
      }

      // Text: stays visible at top, fades out as we scroll
      if (textRef.current) {
        const textOpacity = Math.max(1 - p * 2.5, 0);
        const textY = p * -30;
        textRef.current.style.opacity = String(textOpacity);
        textRef.current.style.transform = `translateY(${textY}px)`;
      }

      // Side cards: fade in as we scroll
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        const delay = i * 0.12;
        const cp = Math.max(0, Math.min((p - delay) / (0.6 - delay), 1));
        el.style.opacity = String(cp);
        el.style.transform = `translateY(${(1 - cp) * 28}px)`;
      });

      // Scroll hint fades out immediately
      if (hintRef.current) {
        hintRef.current.style.opacity = String(Math.max(1 - p * 6, 0));
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // init
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ height: "180vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-dark">

        {/* ── Hero image (left ~60%) with zoom ── */}
        <div className="absolute inset-0" style={{ right: "38%" }}>
          <div
            ref={heroRef}
            className="w-full h-full"
            style={{ transformOrigin: "center center", willChange: "transform" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMAGES[0]}
              alt="Hero artwork"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Gradient overlay — clear at top, dark at bottom */}
          <div
            ref={overlayRef}
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.5) 100%)",
              willChange: "background",
            }}
          />

          {/* Text ON the hero image */}
          <div
            ref={textRef}
            className="absolute inset-0 flex flex-col justify-end pb-16 pl-10 md:pl-16"
            style={{ willChange: "transform, opacity" }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/60 mb-4">
              Anya by Hiranya
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-5 max-w-lg">
              Art rooted in<br />
              <em className="not-italic" style={{ color: "#DDAA9A" }}>nature</em>
              {" "}&amp; intention.
            </h1>
            <p className="text-sm text-white/60 max-w-xs leading-relaxed mb-8">
              Botanical art, resin jewellery &amp; acrylic paintings — made slowly, with love.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/portfolio"
                className="text-[10px] tracking-[0.2em] uppercase bg-white text-dark px-8 py-3.5 hover:bg-beige transition-colors duration-300">
                View All Works
              </Link>
              <Link href="/commission"
                className="text-[10px] tracking-[0.2em] uppercase border border-white text-white px-8 py-3.5 hover:bg-white hover:text-dark transition-all duration-300">
                Commission
              </Link>
            </div>
          </div>
        </div>

        {/* ── Right collage — cards appear on scroll ── */}
        <div className="absolute top-0 bottom-0 bg-dark/95" style={{ left: "62%", right: 0 }}>
          {CARDS.map((card, i) => (
            <div
              key={i}
              ref={el => { cardsRef.current[i] = el; }}
              className="absolute overflow-hidden"
              style={{
                top: card.top,
                left: `calc(${card.left} - 62%)`,
                width: card.w,
                height: card.h,
                opacity: 0,
                willChange: "transform, opacity",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={card.src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* ── Bottom gradient — blends hero into page background ── */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-30"
          style={{
            height: "220px",
            background: "linear-gradient(to bottom, transparent 0%, var(--color-beige, #EFE7DA) 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-30 dark-gradient"
          style={{ height: "220px" }}
        />

        {/* Scroll hint */}
        <div
          ref={hintRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
          style={{ willChange: "opacity" }}
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/40">Scroll</span>
          <div className="relative h-10 w-px overflow-hidden bg-white/20">
            <div className="absolute top-0 h-[40%] w-full bg-white/60"
              style={{ animation: "scrollLine 1.5s ease-in-out infinite" }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
        .dark .dark-gradient {
          background: linear-gradient(to bottom, transparent 0%, #1C1C1A 100%);
        }
        .dark-gradient {
          background: transparent;
        }
      `}</style>
    </div>
  );
}

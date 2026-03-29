import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase-server";
import ArtCard from "./portfolio/ArtCard";

const PLACEHOLDER = [
  { id:"1", title:"Pressed Botanicals I", category:"Botanical & Pressed Flower", price:3200, availability:"Available", medium:"Pressed flowers on paper", image_url:"https://images.unsplash.com/photo-1490750967868-88df5691cc5e?w=800&q=80", images:["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80","https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80"] },
  { id:"2", title:"Wild Garden", category:"Botanical & Pressed Flower", price:2800, availability:"Sold", medium:"Pressed flowers, frame", image_url:"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80", images:[] },
  { id:"3", title:"Meadow Study", category:"Botanical & Pressed Flower", price:4500, availability:"On Request", medium:"Mixed botanicals", image_url:"https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80", images:[] },
  { id:"4", title:"Resin Garden Ring", category:"Resin Flower Jewellery", price:1800, availability:"Available", medium:"Resin, pressed flowers", image_url:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", images:[] },
  { id:"5", title:"Memory Pendant", category:"Resin Flower Jewellery", price:2200, availability:"On Request", medium:"Custom resin jewellery", image_url:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80", images:[] },
  { id:"6", title:"Bloom Earrings", category:"Resin Flower Jewellery", price:1400, availability:"Available", medium:"Resin, dried petals", image_url:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80", images:[] },
  { id:"7", title:"Forest Memory", category:"Acrylic Paintings", price:8000, availability:"Available", medium:"Acrylic on canvas, 24×30\"", image_url:"https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80", images:[] },
  { id:"8", title:"Tide", category:"Acrylic Paintings", price:6500, availability:"Sold", medium:"Acrylic on canvas, 18×24\"", image_url:"https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80", images:[] },
  { id:"9", title:"Root & Rise", category:"Acrylic Paintings", price:9500, availability:"On Request", medium:"Acrylic on canvas, 30×40\"", image_url:"https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80", images:[] },
];

const CATEGORIES = [
  { key:"Botanical & Pressed Flower", label:"Botanical & Pressed Flower Art" },
  { key:"Resin Flower Jewellery", label:"Resin Flower Jewellery" },
  { key:"Acrylic Paintings", label:"Acrylic Paintings" },
];

async function getArtworks() {
  try {
    const supabase = createClient();
    const { data } = await supabase.from("artworks").select("*").order("created_at", { ascending: false });
    return data && data.length > 0 ? data : PLACEHOLDER;
  } catch { return PLACEHOLDER; }
}

export default async function Home() {
  const artworks = await getArtworks();

  return (
    <div className="bg-beige dark:bg-dark min-h-screen">
      {/* Hero — mosaic grid */}
      <section className="relative h-screen overflow-hidden">
        {/* Image mosaic */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1">
          <div className="relative col-span-2 row-span-2 overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1490750967868-88df5691cc5e?w=1200&q=80"
              alt="" fill className="object-cover scale-105 hover:scale-100 transition-transform duration-700" priority />
          </div>
          <div className="relative overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
              alt="" fill className="object-cover scale-105 hover:scale-100 transition-transform duration-700" />
          </div>
          <div className="relative overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80"
              alt="" fill className="object-cover scale-105 hover:scale-100 transition-transform duration-700" />
          </div>
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-dark/50 z-10" />

        {/* Text */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
          <p className="text-xs tracking-[0.4em] uppercase text-white/60 mb-6 reveal">Anya by Hiranya</p>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-none mb-4 reveal reveal-delay-1">
            Art. Nature.
          </h1>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-rose leading-none mb-10 reveal reveal-delay-2 italic">
            Intention.
          </h1>
          <p className="text-sm text-white/70 max-w-md leading-relaxed mb-10 reveal reveal-delay-3">
            Botanical art, resin jewellery & acrylic paintings — each piece made slowly, with love.
          </p>
          <div className="flex gap-4 reveal reveal-delay-3">
            <Link href="/portfolio"
              className="text-xs tracking-widest uppercase bg-white text-dark px-8 py-3 hover:bg-rose hover:text-white transition-all duration-300">
              View All Works
            </Link>
            <Link href="/commission"
              className="text-xs tracking-widest uppercase border border-white text-white px-8 py-3 hover:bg-white hover:text-dark transition-all duration-300">
              Commission
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 reveal">
          <span className="text-xs tracking-widest uppercase text-white/40">Scroll</span>
          <div className="w-px h-12 bg-white/20 relative overflow-hidden">
            <div className="absolute top-0 w-full bg-white/60 animate-scroll-line" style={{height:"40%", animation:"scrollLine 1.5s ease-in-out infinite"}} />
          </div>
        </div>
      </section>

      {/* Works by category — 3 each */}
      {CATEGORIES.map(cat => {
        const pieces = artworks.filter((a: any) => a.category === cat.key).slice(0, 3);
        if (pieces.length === 0) return null;
        return (
          <section key={cat.key} className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs tracking-widest uppercase text-dark/40 dark:text-beige/40 mb-2 reveal">Collection</p>
                <h2 className="font-serif text-3xl md:text-4xl text-forest dark:text-beige reveal reveal-delay-1">{cat.label}</h2>
              </div>
              <Link href="/portfolio"
                className="text-xs tracking-widest uppercase text-forest dark:text-rose underline-anim pb-1 hover:opacity-70 transition-opacity whitespace-nowrap reveal">
                See More →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 stagger reveal">
              {pieces.map((art: any) => <ArtCard key={art.id} art={art} />)}
            </div>
          </section>
        );
      })}

      {/* Artist Intro */}
      <section className="py-20 px-6 md:px-16 bg-forest/5 dark:bg-darksurface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[3/4] overflow-hidden reveal-left shimmer">
            <Image src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80"
              alt="Artist" fill className="object-cover" />
          </div>
          <div className="reveal-right">
            <p className="text-xs tracking-widest uppercase text-dark/40 dark:text-beige/40 mb-4">The Artist</p>
            <h2 className="font-serif text-4xl md:text-5xl text-forest dark:text-beige mb-8 leading-tight">Hiranya</h2>
            <p className="text-dark/70 dark:text-beige/70 leading-relaxed mb-8">
              A multidisciplinary artist working across acrylic painting, pressed flower jewellery, resin experiments, and sustainable crafts. Her practice is rooted in the belief that creativity and nature can coexist in harmony.
            </p>
            <Link href="/about" className="text-xs tracking-widest uppercase text-forest dark:text-rose underline-anim pb-1 hover:opacity-70 transition-opacity">
              Read More
            </Link>
          </div>
        </div>
      </section>

      {/* Commission CTA */}
      <section className="py-20 px-6 md:px-16 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-dark/40 dark:text-beige/40 mb-4 reveal">Bespoke Work</p>
          <h2 className="font-serif text-4xl md:text-5xl text-forest dark:text-beige mb-6 reveal reveal-delay-1">Request a Commission</h2>
          <p className="text-dark/60 dark:text-beige/60 mb-10 leading-relaxed reveal reveal-delay-2">
            Have something specific in mind? Hiranya takes on a limited number of commissions each season — reach out to begin a conversation.
          </p>
          <Link href="/commission"
            className="inline-block text-xs tracking-widest uppercase bg-forest text-white px-10 py-4 hover:bg-teal transition-colors reveal reveal-delay-3">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import ArtCard from "./ArtCard";

const PLACEHOLDER = [
  { id:"1", title:"Pressed Botanicals I", category:"Botanical & Pressed Flower", price:3200, availability:"Available", medium:"Pressed flowers on paper", image_url:"https://images.unsplash.com/photo-1490750967868-88df5691cc5e?w=800&q=80", images:[] },
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
  { key:"Botanical & Pressed Flower", label:"Botanical & Pressed Flower Art", desc:"Pressed flower compositions and nature-inspired pieces with an organic, soft visual style." },
  { key:"Resin Flower Jewellery", label:"Resin Flower Jewellery", desc:"Pressed flowers preserved in resin — jewellery and small art objects, including custom memory-based pieces." },
  { key:"Acrylic Paintings", label:"Acrylic Paintings", desc:"Acrylic works on canvas or paper — abstract, expressive, and nature-influenced, focusing on texture, emotion, and storytelling." },
];

async function getArtworks() {
  try {
    const supabase = createClient();
    const { data } = await supabase.from("artworks").select("*").order("created_at", { ascending: false });
    return data && data.length > 0 ? data : PLACEHOLDER;
  } catch { return PLACEHOLDER; }
}

export default async function Portfolio() {
  const artworks = await getArtworks();

  return (
    <div className="bg-beige dark:bg-dark min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        <p className="text-xs tracking-widest uppercase text-dark/40 dark:text-beige/40 mb-3">Portfolio</p>
        <h1 className="font-serif text-5xl md:text-6xl text-forest dark:text-beige mb-6">Works</h1>
        <p className="text-dark/60 dark:text-beige/60 max-w-xl leading-relaxed mb-20">
          A collection of paintings, botanical compositions, and handcrafted jewellery — each piece made slowly, with intention.
        </p>

        {CATEGORIES.map(cat => {
          const pieces = artworks.filter((a: any) => a.category === cat.key);
          return (
            <section key={cat.key} className="mb-28">
              <div className="border-t border-forest/20 dark:border-beige/20 pt-10 mb-12 reveal">
                <h2 className="font-serif text-3xl md:text-4xl text-forest dark:text-beige mb-3">{cat.label}</h2>
                <p className="text-sm text-dark/60 dark:text-beige/60 max-w-lg">{cat.desc}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
                {pieces.map((art: any, i: number) => (
                  <div key={art.id} className={`reveal reveal-delay-${Math.min(i+1,3)}`}>
                    <ArtCard art={art} />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

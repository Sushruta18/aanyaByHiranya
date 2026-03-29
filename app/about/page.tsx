import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="bg-beige dark:bg-dark min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <p className="text-xs tracking-widest uppercase text-dark/40 dark:text-beige/40 mb-3">The Artist</p>
          <h1 className="font-serif text-5xl md:text-6xl text-forest dark:text-beige">Hiranya</h1>
        </div>

        {/* Main */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-24">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80"
              alt="Hiranya" fill className="object-cover" />
          </div>
          <div className="md:pt-8">
            <p className="text-dark/80 dark:text-beige/80 leading-relaxed text-lg mb-6">
              Hiranya is a multidisciplinary artist working across acrylic painting, pressed flower jewellery, resin experiments, and sustainable crafts.
            </p>
            <p className="text-dark/70 dark:text-beige/70 leading-relaxed mb-6">
              Her practice is rooted in the belief that creativity and nature can coexist in harmony. From vibrant acrylic canvases to delicately preserved botanical jewellery, her work explores themes of growth, healing, the passage of time, and the quiet stories found in nature.
            </p>
            <p className="text-dark/70 dark:text-beige/70 leading-relaxed mb-6">
              As she continues to experiment with acrylics, resin, and environmentally conscious materials, her goal is to build a personal brand grounded in sustainability, mindfulness, and honest expression rather than mass production.
            </p>
            <p className="text-dark/70 dark:text-beige/70 leading-relaxed mb-10">
              Alongside visual art, she writes poems and reflective blogs that document her creative journey, experiments, and evolving lifestyle. Through her art, writing, and community-led events, she hopes to create spaces where people can connect through creativity, beauty, and nature.
            </p>
            <Link href="/commission"
              className="inline-block text-xs tracking-widest uppercase bg-forest text-white px-8 py-3 hover:bg-teal transition-colors">
              Request a Commission
            </Link>
          </div>
        </div>

        {/* Values */}
        <div className="border-t border-forest/20 dark:border-beige/20 pt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title:"Sustainability", body:"Every material is chosen with care — for the earth, for longevity, and for meaning." },
            { title:"Slow Making", body:"Each piece is made without rush. The process is as important as the result." },
            { title:"Nature as Teacher", body:"Flowers, forests, and seasons are the primary influences behind every work." },
          ].map(v => (
            <div key={v.title}>
              <h3 className="font-serif text-2xl text-forest dark:text-beige mb-3">{v.title}</h3>
              <p className="text-sm text-dark/60 dark:text-beige/60 leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

const PLACEHOLDER_POSTS = [
  { id:1, slug:"on-pressing-flowers", title:"On Pressing Flowers", excerpt:"There is something meditative about the act of pressing — choosing a bloom at its peak, placing it between pages, and waiting.", cover_image_url:"https://images.unsplash.com/photo-1490750967868-88df5691cc5e?w=800&q=80", created_at:"2024-11-01" },
  { id:2, slug:"resin-experiments", title:"Resin Experiments: What I've Learned", excerpt:"Resin is unforgiving and generous at the same time. It captures everything — the good and the imperfect.", cover_image_url:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", created_at:"2024-10-15" },
  { id:3, slug:"slow-art", title:"In Defence of Slow Art", excerpt:"We live in a world that rewards speed. But some things — the best things — cannot be rushed.", cover_image_url:"https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80", created_at:"2024-09-28" },
];

async function getPosts() {
  try {
    const supabase = createClient();
    const { data } = await supabase.from("blog_posts").select("*").eq("published", true).order("created_at", { ascending: false });
    return data && data.length > 0 ? data : PLACEHOLDER_POSTS;
  } catch { return PLACEHOLDER_POSTS; }
}

export default async function Blog() {
  const posts = await getPosts();
  return (
    <div className="bg-beige dark:bg-dark min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        <p className="text-xs tracking-widest uppercase text-dark/40 dark:text-beige/40 mb-3">Writing</p>
        <h1 className="font-serif text-5xl md:text-6xl text-forest dark:text-beige mb-20">Journal</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post: any) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <div className="relative aspect-[4/3] overflow-hidden mb-5">
                <Image src={post.cover_image_url || "https://images.unsplash.com/photo-1490750967868-88df5691cc5e?w=800&q=80"}
                  alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <p className="text-xs text-dark/40 dark:text-beige/40 mb-2">
                {new Date(post.created_at).toLocaleDateString("en-IN", { year:"numeric", month:"long", day:"numeric" })}
              </p>
              <h2 className="font-serif text-2xl text-dark dark:text-beige mb-2 group-hover:text-forest dark:group-hover:text-rose transition-colors">{post.title}</h2>
              <p className="text-sm text-dark/60 dark:text-beige/60 leading-relaxed line-clamp-3">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

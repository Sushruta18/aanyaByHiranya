import Image from "next/image";
import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";

const PLACEHOLDER: any = {
  title:"On Pressing Flowers",
  cover_image_url:"https://images.unsplash.com/photo-1490750967868-88df5691cc5e?w=1200&q=80",
  created_at:"2024-11-01",
  content:`<p>There is something meditative about the act of pressing — choosing a bloom at its peak, placing it between pages, and waiting.</p><p>The flower doesn't know it's being preserved. It simply exists, and then it is held.</p><p>I've been pressing flowers for three years now. What began as a way to save petals from a garden I was leaving has become a central part of my practice.</p><h2>What I've learned</h2><p>Patience is the first lesson. You cannot rush a pressed flower. The moisture needs time to leave. The colour needs time to settle. The paper needs time to absorb.</p><p>The second lesson is acceptance. Not every flower presses beautifully. Some brown at the edges. Some lose their shape. And that's okay — those pieces have their own kind of honesty.</p>`,
};

async function getPost(slug: string) {
  try {
    const supabase = createClient();
    const { data } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("published", true).single();
    return data || (slug === "on-pressing-flowers" ? PLACEHOLDER : null);
  } catch { return slug === "on-pressing-flowers" ? PLACEHOLDER : null; }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <div className="bg-beige dark:bg-dark min-h-screen pt-16">
      <article className="max-w-3xl mx-auto px-6 py-24">
        <p className="text-xs tracking-widest uppercase text-dark/40 dark:text-beige/40 mb-4">
          {new Date(post.created_at).toLocaleDateString("en-IN", { year:"numeric", month:"long", day:"numeric" })}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-forest dark:text-beige mb-10 leading-tight">{post.title}</h1>
        {post.cover_image_url && (
          <div className="relative aspect-[16/9] overflow-hidden mb-12">
            <Image src={post.cover_image_url} alt={post.title} fill className="object-cover" />
          </div>
        )}
        <div className="prose prose-lg max-w-none
          prose-headings:font-serif prose-headings:text-forest dark:prose-headings:text-beige
          prose-p:text-dark/80 dark:prose-p:text-beige/80 prose-p:leading-relaxed
          prose-a:text-forest dark:prose-a:text-rose"
          dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}

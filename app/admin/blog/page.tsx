"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase-browser";

const EMPTY = { title:"", slug:"", excerpt:"", cover_image_url:"", content:"", published:false };

export default function AdminBlog() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [form, setForm] = useState<any>(EMPTY);
  const [editing, setEditing] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const supabase = createBrowserClient();

  useEffect(() => {
    if (localStorage.getItem("admin_auth") !== "true") { router.push("/admin"); return; }
    load();
  }, []);

  const load = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setPosts(data || []);
  };

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setMsg("");
    const payload = { ...form, slug: form.slug || slugify(form.title) };
    if (editing) {
      await supabase.from("blog_posts").update(payload).eq("id", editing);
      setMsg("Post updated.");
    } else {
      await supabase.from("blog_posts").insert(payload);
      setMsg("Post created.");
    }
    setForm(EMPTY); setEditing(null); setLoading(false); load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    load();
  };

  return (
    <div className="min-h-screen bg-beige dark:bg-dark pt-16">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-10">
          <button onClick={()=>router.push("/admin")} className="text-xs text-dark/50 dark:text-beige/50 hover:text-forest dark:hover:text-rose">← Back</button>
          <p className="font-serif text-4xl text-forest dark:text-beige">Blog Posts</p>
        </div>

        <form onSubmit={save} className="border border-forest/20 dark:border-beige/20 p-8 mb-12">
          <p className="font-serif text-2xl text-forest dark:text-beige mb-6">{editing ? "Edit Post" : "New Post"}</p>
          <div className="flex flex-col gap-5">
            {[["title","Title"],["slug","URL Slug (auto-generated if empty)"],["excerpt","Excerpt"],["cover_image_url","Cover Image URL"]].map(([id,label])=>(
              <div key={id}>
                <label className="text-xs tracking-widest uppercase text-dark/50 dark:text-beige/50 block mb-1">{label}</label>
                <input value={form[id]} onChange={e=>setForm({...form,[id]:e.target.value})}
                  className="w-full bg-transparent border-b border-forest/30 dark:border-beige/30 py-2 text-dark dark:text-beige focus:outline-none text-sm" />
              </div>
            ))}
            <div>
              <label className="text-xs tracking-widest uppercase text-dark/50 dark:text-beige/50 block mb-1">Content (HTML)</label>
              <textarea rows={10} value={form.content} onChange={e=>setForm({...form,content:e.target.value})}
                placeholder="<p>Your post content here...</p>"
                className="w-full bg-transparent border border-forest/20 dark:border-beige/20 p-3 text-dark dark:text-beige focus:outline-none text-sm resize-y font-mono" />
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="published" checked={form.published} onChange={e=>setForm({...form,published:e.target.checked})} />
              <label htmlFor="published" className="text-sm text-dark/70 dark:text-beige/70">Published (visible on site)</label>
            </div>
          </div>
          {msg && <p className="mt-4 text-sm text-forest dark:text-rose">{msg}</p>}
          <div className="mt-6 flex gap-4">
            <button type="submit" disabled={loading}
              className="text-xs tracking-widest uppercase bg-forest text-white px-8 py-3 hover:bg-teal transition-colors disabled:opacity-50">
              {loading ? "Saving…" : editing ? "Update Post" : "Publish Post"}
            </button>
            {editing && <button type="button" onClick={()=>{setForm(EMPTY);setEditing(null);}}
              className="text-xs tracking-widest uppercase border border-forest/30 dark:border-beige/30 text-dark/60 dark:text-beige/60 px-6 py-3">Cancel</button>}
          </div>
        </form>

        <div className="flex flex-col gap-4">
          {posts.map(p => (
            <div key={p.id} className="border border-forest/10 dark:border-beige/10 p-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-serif text-xl text-dark dark:text-beige">{p.title}</p>
                <p className="text-xs text-dark/50 dark:text-beige/50">/blog/{p.slug} · {p.published ? "Published" : "Draft"}</p>
              </div>
              <div className="flex gap-4">
                <button onClick={()=>{setForm(p);setEditing(p.id);window.scrollTo(0,0);}} className="text-xs text-dark/50 dark:text-beige/50 hover:text-forest dark:hover:text-rose">Edit</button>
                <button onClick={()=>del(p.id)} className="text-xs text-red-400 hover:text-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

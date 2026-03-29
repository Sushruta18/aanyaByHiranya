"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (localStorage.getItem("admin_auth") === "true") setAuthed(true);
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "";
    const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASS ?? "";
    if (email.trim() === adminEmail.trim() && pass === adminPass) {
      localStorage.setItem("admin_auth", "true");
      setAuthed(true);
    } else {
      setErr(`Incorrect email or password.`);
    }
  };

  if (!authed) return (
    <div className="min-h-screen bg-beige dark:bg-dark flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="font-serif text-3xl text-forest dark:text-beige mb-8">Admin Login</p>
        <form onSubmit={login} className="flex flex-col gap-5">
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required
            className="bg-transparent border-b border-forest/30 dark:border-beige/30 py-2 text-dark dark:text-beige focus:outline-none" />
          <input type="password" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)} required
            className="bg-transparent border-b border-forest/30 dark:border-beige/30 py-2 text-dark dark:text-beige focus:outline-none" />
          {err && <p className="text-sm text-red-500">{err}</p>}
          <button type="submit" className="bg-forest text-white py-3 text-sm tracking-widest uppercase hover:bg-teal transition-colors">Sign In</button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-beige dark:bg-dark pt-16">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-12">
          <p className="font-serif text-4xl text-forest dark:text-beige">Dashboard</p>
          <button onClick={()=>{localStorage.removeItem("admin_auth");setAuthed(false);}}
            className="text-xs tracking-widest uppercase text-dark/50 dark:text-beige/50 hover:text-red-500 transition-colors">
            Sign Out
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { href:"/admin/artworks", label:"Artworks", desc:"Add, edit, or remove artworks from your portfolio.", icon:"🖼" },
            { href:"/admin/blog", label:"Blog Posts", desc:"Write and publish journal entries.", icon:"✍️" },
            { href:"/admin/orders", label:"Orders", desc:"View and manage incoming orders.", icon:"📦" },
          ].map(item => (
            <Link key={item.href} href={item.href}
              className="block p-8 border border-forest/20 dark:border-beige/20 hover:border-forest dark:hover:border-beige transition-colors group">
              <p className="text-3xl mb-4">{item.icon}</p>
              <p className="font-serif text-2xl text-forest dark:text-beige mb-2 group-hover:text-teal dark:group-hover:text-rose transition-colors">{item.label}</p>
              <p className="text-sm text-dark/60 dark:text-beige/60">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

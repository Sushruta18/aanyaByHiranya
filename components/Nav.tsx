"use client";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "All Works" },
  { href: "/about", label: "About" },
  { href: "/workshops", label: "Workshops" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-forest/10 dark:border-beige/10 transition-all duration-300 ${scrolled ? "bg-beige/95 dark:bg-dark/95 shadow-sm" : "bg-beige/80 dark:bg-dark/80"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Anya by Hiranya" className="h-10 w-auto object-contain" />
          <span className="font-serif text-xl tracking-wide text-forest dark:text-beige">Anya by Hiranya</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className="font-sans text-sm tracking-widest uppercase text-dark/70 dark:text-beige/70 hover:text-forest dark:hover:text-rose transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={toggle} aria-label="Toggle theme"
            className="text-dark/60 dark:text-beige/60 hover:text-forest dark:hover:text-rose transition-colors">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link href="/commission"
            className="hidden md:inline-block text-xs tracking-widest uppercase border border-forest dark:border-beige/40 text-forest dark:text-beige px-4 py-2 hover:bg-forest hover:text-white dark:hover:bg-beige dark:hover:text-dark transition-all">
            Commission
          </Link>
          <button className="md:hidden text-dark dark:text-beige" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-beige dark:bg-dark border-t border-forest/10 dark:border-beige/10 px-6 py-6 flex flex-col gap-5">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="font-sans text-sm tracking-widest uppercase text-dark/70 dark:text-beige/70">
              {l.label}
            </Link>
          ))}
          <Link href="/commission" onClick={() => setOpen(false)}
            className="text-xs tracking-widest uppercase border border-forest dark:border-beige/40 text-forest dark:text-beige px-4 py-2 text-center">
            Commission
          </Link>
        </div>
      )}
    </header>
  );
}

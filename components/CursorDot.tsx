"use client";
import { useEffect, useRef } from "react";

export default function CursorDot() {
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.style.cursor = "none";
    document.documentElement.style.setProperty("--cursor", "none");

    const move = (e: MouseEvent) => {
      if (!cursor.current) return;
      cursor.current.style.left = e.clientX + "px";
      cursor.current.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <div ref={cursor} className="hidden md:block fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 text-2xl select-none">
      🌻
    </div>
  );
}

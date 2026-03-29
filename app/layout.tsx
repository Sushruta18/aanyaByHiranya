import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import CursorDot from "@/components/CursorDot";

export const metadata: Metadata = {
  title: "Anya by Hiranya — Art rooted in nature, memory, and slow intention.",
  description: "Hiranya is a multidisciplinary artist working across acrylic painting, pressed flower jewellery, resin art, and sustainable crafts.",
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title: "Anya by Hiranya",
    description: "Art rooted in nature, memory, and slow intention.",
    url: "https://anyabyhiranya.com",
    siteName: "Anya by Hiranya",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <CursorDot />
          <Nav />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

/*
  next/font/google downloads and self-hosts Google Fonts at build time.
  This means no third-party network request at runtime — better performance
  and privacy. The `variable` option exposes each font as a CSS custom
  property so Tailwind can reference it.
*/
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/*
  The `metadata` export is a Next.js App Router convention.
  Next.js reads this object and injects the correct <title>, <meta>, and
  Open Graph tags into <head>. Open Graph tags control how the page looks
  when shared as a link in Slack, LinkedIn, iMessage, etc.
*/
export const metadata: Metadata = {
  icons: { icon: "/favicon.svg" },
  title: "Yarin Solomon — Software Developerr",
  description:
    "Full-stack software developer with a CS background from Ben-Gurion University. Specialising in API development, microservices, and AI-integrated systems. Open to work.",
  openGraph: {
    title: "Yarin Solomon — Software Developerr",
    description:
      "Full-stack software developer with a CS background from Ben-Gurion University. Open to work.",
    url: "https://yarin-lab.vercel.app",
    siteName: "Yarin Solomon",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Yarin Solomon — Software Developerr",
    description:
      "Full-stack software developer with a CS background from Ben-Gurion University. Open to work.",
  },
};

/*
  RootLayout wraps every page in the app.
  Navbar is rendered here so it appears on every page (including the 404).
  Analytics is a zero-config Vercel Analytics component — it tracks
  page views and is automatically excluded from local dev builds.
*/
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-neutral-900">
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

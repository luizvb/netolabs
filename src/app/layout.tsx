import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://netolabs.dev"),
  title: "NetoLabs | We Build Companies",
  description:
    "NetoLabs is a venture builder founded by Luiz Neto. We conceive ideas, assemble founding teams, build products, and operate companies until they can stand on their own.",
  keywords: [
    "venture builder",
    "startup studio",
    "AI products",
    "Luiz Neto",
    "NetoLabs",
  ],
  authors: [{ name: "Luiz Neto" }],
  creator: "NetoLabs",
  openGraph: {
    type: "website",
    url: "https://netolabs.dev",
    title: "NetoLabs | We Build Companies",
    description:
      "From first insight to an independent company, we build the whole operating system.",
    siteName: "NetoLabs",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "NetoLabs venture laboratory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NetoLabs | We Build Companies",
    description:
      "From first insight to an independent company, we build the whole operating system.",
    images: ["/og.png"],
  },
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0f0e" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
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
  title: "Hooria Khan - Social Media Marketing Executive",
  description: "Creative Social Media Marketing Executive with 4+ years of experience driving brand growth through strategic digital campaigns. Expert in content creation, community management, and data-driven marketing strategies.",
  keywords: "social media marketing, digital marketing, content creation, brand management, social media strategy, marketing executive",
  authors: [{ name: "Hooria Khan" }],
  openGraph: {
    title: "Hooria Khan - Social Media Marketing Executive",
    description: "Creative Social Media Marketing Executive specializing in strategic digital campaigns and brand growth.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hooria Khan - Social Media Marketing Executive",
    description: "Creative Social Media Marketing Executive specializing in strategic digital campaigns and brand growth.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased page-transition`}
      >
        {/* Animated background particles */}
        <div className="theme-particles" />
        
        {/* Main Content */}
        {children}
      </body>
    </html>
  );
}

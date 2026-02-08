import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoSort - AI-Powered Waste Management & Recycling Platform",
  description:
    "Transform waste management with AI-powered segregation, real-time tracking, and gamified recycling rewards. Join 15,000+ users making a sustainable impact in India.",
  keywords:
    "waste management, AI waste sorting, recycling, waste segregation, eco-friendly, sustainability, India waste tracking, EcoSort",
  authors: [{ name: "EcoSort Team" }],
  creator: "EcoSort",
  publisher: "EcoSort",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ecosort.web.app",
    siteName: "EcoSort",
    title: "EcoSort - AI-Powered Waste Management",
    description:
      "Transform waste management with AI-powered segregation and real-time tracking across India",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EcoSort - Smart Waste Management Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoSort - AI-Powered Waste Management",
    description:
      "Transform waste management with AI-powered segregation and real-time tracking",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://ecosort.web.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

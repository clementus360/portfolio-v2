import type { Metadata } from "next";
import { Roboto, Sacramento, Space_Mono } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local'
import Header from "@/components/Header";
import { WeatherProvider } from "@/context/WeatherContext";

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

// Roboto (body, UI, readable)
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700"], // choose what you need
  variable: "--font-roboto",
});

// Sacramento (logo, hero, highlights)
const sacramento = Sacramento({
  subsets: ["latin"],
  weight: "400", // Sacramento only comes in one weight
  variable: "--font-sacramento",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

const Nexa = localFont({
  src: [
    { path: '../../fonts/Nexa Rust Sans W00 Black 03.otf', weight: '400' },
  ],
  variable: '--font-nexa',
  display: 'swap',
})


// add favicon and OG image in public/ and reference here if needed
const ogImageUrl = "https://res.cloudinary.com/dpfonnjv3/image/upload/v1772529878/twitter_hvlaq0.png";

export const metadata: Metadata = {
  title: "Ishimwe Clement",
  description: "Portfolio of Clementus360 — jack of all trades in design & development.",
  metadataBase: new URL("https://ishimwe.dev"),
  openGraph: {
    title: "Ishimwe Clement",
    description: "Portfolio of Clementus360 — jack of all trades in design & development.",
    url: "https://ishimwe.dev",
    siteName: "Ishimwe Clement Portfolio",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Ishimwe Clement Portfolio Preview",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ishimwe Clement",
    description: "Portfolio of Clementus360 — jack of all trades in design & development.",
    creator: "@clementus360",
    images: [ogImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const analyticsMode =
    process.env.NODE_ENV === "development" ? "development" : "auto";

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${sacramento.variable} ${spaceMono.variable} ${Nexa.variable} bg-[var(--background)] text-[var(--foreground)] antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[90] focus:bg-[var(--background)] focus:text-[var(--foreground)] focus:border focus:border-[var(--menu-border)] focus:px-4 focus:py-2"
        >
          Skip to main content
        </a>
        <Analytics mode={analyticsMode} debug={process.env.NODE_ENV === "development"} />
        <SpeedInsights />
        <Header />
        <WeatherProvider>
          {children}
        </WeatherProvider>

      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Roboto, Sacramento } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local'
import Header from "@/components/Header";
import { WeatherProvider } from "@/context/WeatherContext";

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

const Nexa = localFont({
  src: [
    { path: '../../fonts/NexaRustSans-Trial-Black2.ttf', weight: '400' },
  ],
  variable: '--font-nexa',
  display: 'swap',
})


// add favicon and OG image in public/ and reference here if needed
export const metadata: Metadata = {
  title: "Ishimwe Clement",
  description: "Portfolio of Clementus360 — jack of all trades in design & development.",
  openGraph: {
    title: "Ishimwe Clement",
    description: "Portfolio of Clementus360 — jack of all trades in design & development.",
    url: "https://ishimwe.dev",
    siteName: "Ishimwe Clement Portfolio",
    images: [
      {
        url: "https://res.cloudinary.com/dpfonnjv3/image/upload/v1772529878/twitter_hvlaq0.png",
        width: 1200,
        height: 630,
        alt: "Ishimwe Clement Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
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
        className={`${roboto.variable} ${sacramento.variable} ${Nexa.variable} bg-[var(--background)] text-[var(--foreground)] antialiased`}
      >
        <Header />
        <WeatherProvider>
          {children}
        </WeatherProvider>

      </body>
    </html>
  );
}
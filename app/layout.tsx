import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://coffee-for-eesha.vercel.app"),
  title: "Coffee for Eesha",
  description: "Every little moment feels warmer with coffee. A cinematic, personalized digital coffee experience dedicated to Eesha.",
  keywords: ["Coffee for Eesha", "Eesha", "Specialty Coffee", "Coffee Journey", "Cinematic Coffee", "Scrollytelling"],
  authors: [{ name: "Dedicated to Eesha" }],
  openGraph: {
    title: "Coffee for Eesha",
    description: "Every little moment feels warmer with coffee. A personalized digital coffee experience created especially for Eesha.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/eesha with coffee.jpeg",
        width: 899,
        height: 1599,
        alt: "Coffee for Eesha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coffee for Eesha",
    description: "Every little moment feels warmer with coffee.",
    images: ["/images/eesha with coffee.jpeg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#17110E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preload" as="image" href="/images/eesha%20with%20coffee.jpeg" />
        <link rel="preload" as="image" href="/images/ezgif-frame-300.jpg" />
      </head>
      <body className="bg-espresso-900 text-cream selection:bg-caramel selection:text-warm-ivory antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}

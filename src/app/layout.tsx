import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Self-hosted at build time by next/font: no render-blocking request to Google at runtime.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "SOKOPAY — Fast Cross-Border Payments",
  description:
    "Move money between East Africa and the GCC instantly. Low fees, great FX rates, bank-level security.",
  keywords: ["payments", "remittance", "East Africa", "GCC", "M-Pesa", "UAE", "Kenya"],
  openGraph: {
    title: "SOKOPAY",
    description: "Fast, low-cost payments across East Africa & the GCC",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${dmSans.variable}`}>
      <body style={{ margin: 0, padding: 0, background: "#F4F6F8" }}>
        {children}
      </body>
    </html>
  );
}

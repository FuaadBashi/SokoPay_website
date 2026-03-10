import type { Metadata } from "next";
import "./globals.css";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#F4F6F8" }}>
        {children}
      </body>
    </html>
  );
}

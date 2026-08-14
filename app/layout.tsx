import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://torquesheet.com"),
  title: { default: "TorqueSheet — Exact Vehicle Specs", template: "%s | TorqueSheet" },
  description: "Find torque values, firing orders, fluid capacities, spark plug gaps, timing data, and print-ready vehicle diagrams.",
  openGraph: {
    type: "website",
    siteName: "TorqueSheet",
    title: "TorqueSheet — Exact Vehicle Specs",
    description: "Verified mechanical reference data, organized by year, make, model, and engine.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "TorqueSheet exact vehicle specifications" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}

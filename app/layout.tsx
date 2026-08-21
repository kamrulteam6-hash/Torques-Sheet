import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://torquesheet.com"),
  applicationName: "TorqueSheet",
  title: { default: "TorqueSheet — Exact Vehicle Specs", template: "%s | TorqueSheet" },
  description: "Find torque values, firing orders, fluid capacities, spark plug gaps, timing data, and print-ready vehicle diagrams.",
  alternates: { canonical: "/" },
  authors: [{ name: "TorqueSheet Research Desk", url: "/editorial-policy" }],
  creator: "TorqueSheet Research Desk",
  publisher: "TorqueSheet",
  category: "Automotive technical reference",
  referrer: "origin-when-cross-origin",
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/favicon.svg?v=2", type: "image/svg+xml" }],
    shortcut: "/favicon.svg?v=2",
  },
  openGraph: {
    type: "website",
    siteName: "TorqueSheet",
    url: "/",
    title: "TorqueSheet — Exact Vehicle Specs",
    description: "Source-linked mechanical reference data with visible editorial status, organized by year, make, model, and engine.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "TorqueSheet exact vehicle specifications" }],
  },
  twitter: { card: "summary_large_image", title: "TorqueSheet — Exact Vehicle Specs", description: "Source-linked vehicle specifications with visible editorial status.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

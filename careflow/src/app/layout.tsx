import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareFlow – The Complete Healthcare Operating System",
  description:
    "Enterprise-grade SaaS platform for modern hospitals. Manage patients, doctors, labs, pharmacy, HR, finance, AI, and analytics from one secure cloud platform.",
  keywords:
    "healthcare, hospital management system, EMR, EHR, medical records, telemedicine, AI healthcare",
  openGraph: {
    title: "CareFlow – Healthcare Operating System",
    description:
      "The complete cloud-native healthcare platform for Level 6 hospitals and multi-branch healthcare organizations.",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}

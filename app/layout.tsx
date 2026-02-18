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

export const metadata = {
  title: "Dhruv Verma | Cybersecurity Portfolio | SOC, Blue Team, Threat Intelligence",
  description:
    "Dhruv Verma — Cybersecurity & Forensics student, CompTIA Security+ certified. Projects on Honeypots, SOC, Threat Intelligence, VPN Security, and Blue Teaming.",
  keywords: [
    "Dhruv Verma",
    "Cybersecurity Portfolio",
    "SOC Analyst",
    "Blue Team",
    "Threat Intelligence",
    "Honeypot",
    "VPN Security",
    "CompTIA Security+",
    "Cybersecurity Student",
  ],
  openGraph: {
    title: "Dhruv Verma | Cybersecurity Portfolio",
    description:
      "Cybersecurity & Forensics student. Projects on Honeypots, SOC, Threat Intelligence, and Blue Team security.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

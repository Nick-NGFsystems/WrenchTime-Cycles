import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NgfEditBridge from '@/components/NgfEditBridge'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WrenchTime Cycles",
  description: "Professional motorcycle service & repair. Book your appointment online.",
    other: { 'ngf-public-api': 'https://app.ngfsystems.com/api/public/website' },
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
        <NgfEditBridge />
        {children}
      </body>
    </html>
  );
}

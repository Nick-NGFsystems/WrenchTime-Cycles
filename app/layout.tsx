import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { Rajdhani, Sora } from "next/font/google";
import NgfEditBridge from '@/components/NgfEditBridge'
import "./globals.css";

const headingFont = Rajdhani({
  variable: "--font-heading",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const bodyFont = Sora({
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WrenchTime Cycles",
  description: "Professional motorcycle service & repair. Book your appointment online.",
  other: {
    'ngf-public-api': 'https://app.ngfsystems.com/api/public/content',
    'ngf-template-id': 'wrenchtime',
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
        className={`${headingFont.variable} ${bodyFont.variable} antialiased bg-[var(--bg)] text-[var(--text)]`}
      >
        <ClerkProvider>
          <NgfEditBridge />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}

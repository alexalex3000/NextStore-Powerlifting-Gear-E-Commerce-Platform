import type { Metadata } from "next";
import {Barlow_Condensed} from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Next Powerlifting Gear",
  description: "Buy the best powerlifting gear",
  keywords: ["powerlifting", "gear", "lift", "bar", "next"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="">{children}</body>
    </html>
  );
}

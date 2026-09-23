import type {Metadata} from "next";
import {Barlow_Condensed} from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    variable: '--font-barlow-condensed',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        template: "%s | Next Powerlifting Gear",
        default: "Next Powerlifting Gear",
    },
    description: "Buy the best powerlifting gear",
    keywords: ["powerlifting", "gear", "lift", "bar", "next"],
    icons: {
        icon: [
            {
                url: "/favicon.svg?v=1",
                type: "image/svg+xml",
            },
        ],
    },
    authors: {
        name: "Alexei Petrikevitch",
        url: "https://github.com/alexalex3000",
    },
    creator: "Next Gear Team",
    openGraph: {
        type: "website",
        locale: "en_EN",
        url: "/",
        siteName: "Next Powerlifting Gear",
        title: "Next Powerlifting Gear — gear for Champions",
        description: "Professional Next Powerlifting Gear",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Next Powerlifting Gear",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Next Powerlifting Gear",
        description: "Professional Next Powerlifting Gear",
        images: ["/og-image.jpg"],
    },
};

export default function RootLayout({children}: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={`${barlowCondensed.variable} h-full antialiased`}
        >
        <body suppressHydrationWarning className="">
            {children}
        </body>
        </html>
    );
}

import type { Metadata } from "next";
import { Providers } from './providers'
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

const siteUrl = "https://antar-portfolio.vercel.app"; // غيّرها لدومينك الفعلي بعد النشر

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Antar Maher Fayyad — Frontend React Developer",
    template: "%s | Antar Maher Fayyad",
  },
  description:
    "Portfolio of Antar Maher Fayyad — Frontend React Developer from Egypt. Building scalable dashboards, auth systems and production-grade React apps.",
  keywords: [
    "Antar Maher Fayyad",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Egypt Developer",
    "Web Developer Sohag",
  ],
  authors: [{ name: "Antar Maher Fayyad" }],
  creator: "Antar Maher Fayyad",
  icons: {
    icon: "./profile.png",
    shortcut: "./profile.png",
    apple: "./profile.png",

  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Antar Maher — Portfolio",
    title: "Antar Maher Fayyad — Frontend React Developer",
    description:
      "Portfolio of Antar Maher Fayyad — Frontend React Developer from Egypt. Building scalable dashboards, auth systems and production-grade React apps.",
    images: [
      {
        url: "/og-image.png", // لازم تحط صورة 1200x630 في public/
        width: 1200,
        height: 630,
        alt: "Antar Maher Fayyad — Frontend React Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Antar Maher Fayyad — Frontend React Developer",
    description:
      "Portfolio of Antar Maher Fayyad — Frontend React Developer from Egypt.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  other: {
    "theme-color": "#0a0a1a",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"

          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Antar Maher Fayyad",
              jobTitle: "Frontend React Developer",
              url: siteUrl,
              email: "mailto:antarmaherfayyad@gmail.com",
              telephone: "+201044348523",
              address: { "@type": "PostalAddress", addressCountry: "EG" },
              sameAs: ["https://github.com/AntarMaherFayyad"],
            }),
          }}
        />
      </head>
      <body>
        <main className="pt-16">
          <Providers>
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
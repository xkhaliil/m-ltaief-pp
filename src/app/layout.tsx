import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SmoothScroll } from "@/components/SmoothScroll";
// import { SplashGate } from "@/components/SplashGate"; // boot splash — disabled for now, re-enable later
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohamed-Ali Ltaief",
  description: "Artist, researcher, and performer.",
  openGraph: {
    title: "Mohamed-Ali Ltaief",
    description: "Artist, researcher, and performer.",
  },
};

// Light is the default regardless of OS preference — only an explicit prior
// toggle (stored as 'dark') switches it.
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme')==='dark'?'dark':'light';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {/* Loaded as a plain stylesheet (not next/font) so the literal family
            name "Libre Baskerville" — the value RichTextEditor's typography
            picker writes into stored article HTML — actually resolves;
            next/font renames the family internally, which would break that
            reference wherever it's later rendered. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
        />
      </head>
      <body className="bg-paper text-ink antialiased">
        <SmoothScroll />
        {/* <SplashGate>{children}</SplashGate> */}
        {children}
        <Analytics />
      </body>
    </html>
  );
}

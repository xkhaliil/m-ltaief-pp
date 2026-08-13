import type { Metadata } from "next";
import type { ReactNode } from "react";
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
      </head>
      <body className="bg-paper text-ink antialiased">
        <SmoothScroll />
        {/* <SplashGate>{children}</SplashGate> */}
        {children}
      </body>
    </html>
  );
}

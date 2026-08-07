import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohamed-Ali Ltaief",
  description: "Artist, researcher, and performer.",
  openGraph: {
    title: "Mohamed-Ali Ltaief",
    description: "Artist, researcher, and performer.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink antialiased">
        {children}
      </body>
    </html>
  );
}

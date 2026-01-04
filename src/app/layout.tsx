import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dom Pedro Delivery",
  description: "Landing page de planos para restaurantes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}


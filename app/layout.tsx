import type { Metadata } from "next";
import type { ReactNode } from "react";
import { APP_CONFIG } from "./config";
import "./globals.scss";

export const metadata: Metadata = {
  metadataBase: new URL(APP_CONFIG.url),
  title: APP_CONFIG.name,
  description: APP_CONFIG.description,
  robots: { index: APP_CONFIG.isIndexable, follow: APP_CONFIG.isIndexable },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={APP_CONFIG.locale}>
      <body>{children}</body>
    </html>
  );
}

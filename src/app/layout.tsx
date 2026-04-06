import type { Metadata } from "next";
import "@fontsource/ibm-plex-sans-arabic/300.css";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";
import "@fontsource/ibm-plex-sans-arabic/600.css";
import "@fontsource/ibm-plex-sans-arabic/700.css";
import "./globals.css";
import { Providers } from "@/components/providers";
import Footer from "@/components/footer";
import { TopNav } from "@/components/top-nav";

export const metadata: Metadata = {
  title: "Al Multaqa",
  description: "Luxury real estate platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <TopNav />
          <div className="flex min-h-[100dvh] flex-col">
            <div className="flex-1 pt-20">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { NuqsProvider } from "@/components/providers/nuqs-provider";
import { ThemeProvider } from "@/hooks/use-theme";

import { cn } from "@/lib/utils";
import { DynamicBackground } from "@/components/layout/DynamicBackground";
import { VoltageLightBrush } from "@/components/interaction/VoltageLightBrush";
import { SocialDock } from "@/components/layout/SocialDock";

const inter = Inter({ subsets: ["latin"], variable: "--font-switzer" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

import { client } from "@/lib/sanity/client";
import { settingsQuery } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(settingsQuery);

  const ogImageUrl = settings?.ogImage 
    ? urlForImage(settings.ogImage).width(1200).height(630).url() 
    : "https://aceinart.com/og-image.jpg";

  return {
    title: settings?.title || "AceInArt | Portfolio & Archives",
    description: settings?.description || "The digital portfolio and raw experiments of Creative Technologist Achilihu Chinedu Emmanuel.",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://aceinart.com",
      title: settings?.title || "AceInArt | Portfolio",
      description: settings?.description || "Digital archives and raw experiments.",
      siteName: settings?.title || "AceInArt",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: settings?.title || "AceInArt",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: settings?.title || "AceInArt",
      creator: "@aceinart",
      images: [ogImageUrl],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background text-foreground font-sans antialiased transition-colors duration-300 ease-in-out selection:bg-primary selection:text-white",
        inter.variable,
        jetbrains.variable
      )}>
      <NuqsProvider>
        <ThemeProvider>
          {/* Main Layout Shell */}
          <main className="relative min-h-screen">
            <DynamicBackground />
            <VoltageLightBrush />
            <SocialDock />

            {children}
          </main>
        </ThemeProvider>
      </NuqsProvider>
      </body>
    </html>
  );
}

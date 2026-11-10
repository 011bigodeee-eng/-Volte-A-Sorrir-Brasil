import type { Metadata, Viewport } from "next";
import { images } from "@/lib/images";
import "./globals.css";
import "@fontsource-variable/manrope";
const siteUrl = process.env.SITE_URL;
export const metadata: Metadata = {
  ...(siteUrl
    ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } }
    : {}),
  title: "Volte a Sorrir Brasil | Clínica odontológica em Buriticupu — MA",
  description:
    "Conheça a Volte a Sorrir Brasil, clínica odontológica em Buriticupu — MA. Implantes, próteses dentárias, dentaduras e aparelhos ortodônticos. Agende pelo WhatsApp.",
  openGraph: {
    title: "Seu sorriso merece um novo começo. | Volte a Sorrir Brasil",
    description:
      "Cuidado odontológico no Centro de Buriticupu, Maranhão. Conheça os tratamentos e converse com a nossa equipe.",
    locale: "pt_BR",
    type: "website",
    siteName: "Volte a Sorrir Brasil",
    ...(siteUrl
      ? {
          images: [
            {
              url: images.hero.src,
              width: images.hero.width,
              height: images.hero.height,
              alt: "Volte a Sorrir Brasil — um novo começo para o seu sorriso",
            },
          ],
        }
      : {}),
  },
  twitter: { card: "summary_large_image" },
  robots: { index: !!siteUrl, follow: true },
  icons: { icon: "/images/marca-original.jpeg" },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06448C",
};
const introScript = `try { if (sessionStorage.getItem('vas-intro') || matchMedia('(prefers-reduced-motion: reduce)').matches || location.hash) document.documentElement.dataset.skipIntro='true'; } catch { document.documentElement.dataset.skipIntro='true'; }`;
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

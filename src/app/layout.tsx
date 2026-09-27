import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppLayoutWrapper from "@/components/AppLayoutWrapper";
import { AuthProvider } from "@/lib/authContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RELASI: Sistem Pelaporan dan Perlindungan Siswa",
  description: "Saluran pelaporan mandiri bagi korban dan saksi perundungan dengan perlindungan identitas, enkripsi PIN, dan tindak lanjut yang terukur berstandar Permendikbudristek No. 46 Tahun 2023.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} lenis`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Core Styling & Design System Stylesheets */}
        <link rel="stylesheet" href="/assets/css/460d472b_grid-system.css" id="relasi-grid-system-css" />
        <link rel="stylesheet" href="/assets/css/1ccb5ee1_style.css" id="main-styles-css" />
        <link rel="stylesheet" href="/assets/css/342ead0f_element-toggles.css" id="relasi-toggle-panels-css" />
        <link rel="stylesheet" href="/assets/css/d1a834b7_element-milestone.css" id="relasi-milestone-css" />
        <link rel="stylesheet" href="/assets/css/b1cc9472_element-wpb-column-border.css" id="relasi-column-border-css" />
        <link rel="stylesheet" href="/assets/css/31179be1_nectar-brands.css" id="relasi-brands-css" />
        <link rel="stylesheet" href="/assets/css/8e98100a_responsive.css" id="responsive-css" />
        <link rel="stylesheet" href="/assets/css/39199a62_flickity.css" id="relasi-flickity-css" />
        <link rel="stylesheet" href="/assets/css/8d96ee62_skin-material.css" id="skin-material-css" />
        <link rel="stylesheet" href="/assets/css/3e3a838d_menu-dynamic.css" id="relasi-menu-dynamic-css" />
        <link rel="stylesheet" href="/assets/css/9fe89d39_js_composer.css" id="relasi-front-css" />
        <link rel="stylesheet" href="/assets/css/d9a12bf2_salient-dynamic-styles-multi-id-46.css" id="dynamic-css-css" />
        <link rel="stylesheet" href="/assets/css/ed0f05b1_fonts.css" id="relasi-fonts-css" />
        <link rel="stylesheet" href="/assets/css/18d0c2c5_font-awesome.min.css" id="font-awesome-css" />
        <link rel="stylesheet" href="/assets/css/f7682e09_style-non-critical.css" id="main-styles-non-critical-css" />
        <link rel="stylesheet" href="/assets/css/16ae8bae_jquery.fancybox.css" id="fancyBox-css" />
        <link rel="stylesheet" href="/assets/css/2b1b563d_lenis.css" id="smooth-scroll-css" />
        <link rel="stylesheet" href="/assets/css/fdd2e019_core.css" id="relasi-core-css" />
        <link rel="stylesheet" href="/assets/css/40fce696_fullscreen-legacy.css" id="relasi-fullscreen-css" />
        <link rel="stylesheet" href="/assets/css/salient-tether-dynamic.css" id="relasi-dynamic-css" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#F6F4F0] text-slate-900 font-sans antialiased`}>
        <AuthProvider>
          <AppLayoutWrapper>
            {children}
          </AppLayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}

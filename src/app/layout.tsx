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
  title: "Ruang Suara: Sistem Pelaporan dan Penanganan Kasus Siswa",
  description: "Platform pelaporan terenkripsi bagi siswa dan pendukung investigasi terstruktur guru BK berstandar Permendikbudristek No. 46 Tahun 2023.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} js js_active vc_desktop vc_transform lenis`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Salient Tether Theme Stylesheets */}
        <link rel="stylesheet" href="/assets/css/460d472b_grid-system.css" id="salient-grid-system-css" />
        <link rel="stylesheet" href="/assets/css/1ccb5ee1_style.css" id="main-styles-css" />
        <link rel="stylesheet" href="/assets/css/342ead0f_element-toggles.css" id="nectar-element-toggle-panels-css" />
        <link rel="stylesheet" href="/assets/css/d1a834b7_element-milestone.css" id="nectar-element-milestone-css" />
        <link rel="stylesheet" href="/assets/css/b1cc9472_element-wpb-column-border.css" id="nectar-element-wpb-column-border-css" />
        <link rel="stylesheet" href="/assets/css/31179be1_nectar-brands.css" id="nectar-brands-css" />
        <link rel="stylesheet" href="/assets/css/8e98100a_responsive.css" id="responsive-css" />
        <link rel="stylesheet" href="/assets/css/39199a62_flickity.css" id="nectar-flickity-css" />
        <link rel="stylesheet" href="/assets/css/8d96ee62_skin-material.css" id="skin-material-css" />
        <link rel="stylesheet" href="/assets/css/3e3a838d_menu-dynamic.css" id="salient-wp-menu-dynamic-css" />
        <link rel="stylesheet" href="/assets/css/9fe89d39_js_composer.css" id="js_composer_front-css" />
        <link rel="stylesheet" href="/assets/css/d9a12bf2_salient-dynamic-styles-multi-id-46.css" id="dynamic-css-css" />
        <link rel="stylesheet" href="/assets/css/ed0f05b1_fonts.css" id="salient-redux-local-google-fonts-salient_redux-css" />
        <link rel="stylesheet" href="/assets/css/18d0c2c5_font-awesome.min.css" id="font-awesome-css" />
        <link rel="stylesheet" href="/assets/css/f7682e09_style-non-critical.css" id="main-styles-non-critical-css" />
        <link rel="stylesheet" href="/assets/css/16ae8bae_jquery.fancybox.css" id="fancyBox-css" />
        <link rel="stylesheet" href="/assets/css/2b1b563d_lenis.css" id="nectar-smooth-scroll-css" />
        <link rel="stylesheet" href="/assets/css/fdd2e019_core.css" id="nectar-ocm-core-css" />
        <link rel="stylesheet" href="/assets/css/40fce696_fullscreen-legacy.css" id="nectar-ocm-fullscreen-legacy-css" />
        <link rel="stylesheet" href="/assets/css/salient-tether-dynamic.css" id="salient-tether-dynamic-css" />
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

'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import TetherNavbar from "@/components/TetherNavbar";
import TetherFooter from "@/components/TetherFooter";
import ModalDialogs from "@/components/ModalDialogs";

export default function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  useEffect(() => {
    // Keep warm background #F6F4F0 universally across all pages
    document.body.style.backgroundColor = "#F6F4F0";
    document.documentElement.style.backgroundColor = "#F6F4F0";

    if (isHomepage) {
      document.body.className = "home wp-singular page-template-default page page-id-667 wp-theme-salient material wpb-js-composer js-comp-ver-8.7.3 vc_responsive nectar-delay-js-loaded font-sans antialiased text-slate-900";
      document.body.setAttribute("data-header-color", "custom");
      document.body.setAttribute("data-header-format", "default");
      document.body.setAttribute("data-permanent-transparent", "false");
      document.body.setAttribute("data-transparent-header", "true");
      document.body.setAttribute("data-smooth-scrolling", "0");
      document.body.setAttribute("data-header-resize", "0");
      document.body.setAttribute("data-full-width-header", "false");
      document.body.setAttribute("data-contained-header", "true");
      document.body.setAttribute("data-cad", "1300");
      document.body.setAttribute("data-cae", "easeOutCubic");
      document.body.setAttribute("data-aie", "none");
      document.body.setAttribute("data-m-animate", "1");
      document.body.setAttribute("data-button-style", "rounded");
      document.body.setAttribute("data-ext-responsive", "true");
      document.body.setAttribute("data-flex-cols", "true");
      document.body.setAttribute("data-force-header-trans-color", "light");
      document.body.setAttribute("data-is", "minimal");
    } else {
      document.body.className = "min-h-screen flex flex-col font-sans antialiased text-slate-900 bg-[#F6F4F0]";
    }
  }, [isHomepage]);

  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <div className="w-full min-h-screen bg-[#F6F4F0] flex flex-col font-sans text-slate-900">
      <TetherNavbar />
      <main className={`flex-1 w-full ${isHomepage ? '' : isAuthPage ? 'pt-20 sm:pt-22 pb-4 flex items-center justify-center' : 'pt-24 sm:pt-28'}`}>
        {children}
      </main>
      {!isAuthPage && <TetherFooter />}
      <ModalDialogs />
    </div>
  );
}

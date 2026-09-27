'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import TetherNavbar from "@/components/TetherNavbar";
import TetherFooter from "@/components/TetherFooter";
import ModalDialogs from "@/components/ModalDialogs";
import LuxuryCursor from "@/components/LuxuryCursor";
import CounselorNotificationToast from "@/components/CounselorNotificationToast";
import StudentNotificationToast from "@/components/StudentNotificationToast";
import UserStatusWatcher from "@/components/UserStatusWatcher";

export default function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  useEffect(() => {
    // Keep warm background #F6F4F0 universally across all pages
    document.body.style.backgroundColor = "#F6F4F0";
    document.documentElement.style.backgroundColor = "#F6F4F0";

    // Ensure clean font and background universally across all pages
    document.body.className = "min-h-screen flex flex-col font-sans antialiased text-slate-900 bg-[#F6F4F0]";
  }, [isHomepage]);

  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <div className="w-full min-h-screen bg-[#F6F4F0] flex flex-col font-sans text-slate-900">
      <TetherNavbar />
      <main className={`flex-1 w-full ${isHomepage ? '' : isAuthPage ? 'pt-20 sm:pt-22 pb-4 flex items-center justify-center' : 'pt-28 sm:pt-32'}`}>
        {children}
      </main>
      {!isAuthPage && <TetherFooter />}
      <ModalDialogs />
      <CounselorNotificationToast />
      <StudentNotificationToast />
      <UserStatusWatcher />
      <LuxuryCursor />
    </div>
  );
}

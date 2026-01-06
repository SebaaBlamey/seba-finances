"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function DashboardLayout({
  children,
  className = "",
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex bg-surface-container-low dark:bg-dark-surface-container-low">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-on-primary focus:rounded-md"
      >
        Skip to main content
      </a>

      <aside aria-label="Main navigation" className="h-screen">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main
          id="main-content"
          aria-label="Dashboard content"
          className={`flex-1 p-6 overflow-y-auto ${className}`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

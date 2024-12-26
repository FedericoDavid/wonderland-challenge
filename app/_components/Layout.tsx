"use client";

import { Navbar } from "./Navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  onOpenTokenModal: () => void;
}

export function Layout({ children, onOpenTokenModal }: LayoutProps) {
  return (
    <div className="min-h-screen p-8 bg-[#0a0b1e]">
      <Navbar onOpenTokenModal={onOpenTokenModal} />
      <div className="max-w-4xl mx-auto">{children}</div>
    </div>
  );
}

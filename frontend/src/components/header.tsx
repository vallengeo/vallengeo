'use client'

import { Menu, ChevronLeft, X } from "lucide-react";
import Brasao from "./brasao";
import Link from "next/link";
import { useMenuState } from "@/contexts/MenuContext";
import { Sidebar } from "@/app/(pagina-inicial)/components/sidebar";

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
  linkBack?: string;
}

export default function Header({
  title,
  children,
  linkBack
}: HeaderProps) {
  const { open, onHandleOpen, onHandleClosed } = useMenuState();

  return (
    <header className="flex items-center justify-between gap-y-4 max-md:flex-col-reverse max-md:items-start">
      <div className="flex flex-col">
        <h1 className="flex items-center text-[2rem]">
          {linkBack && (
            <Link href={linkBack}>
              <ChevronLeft />
            </Link>
          )}
          {title}
        </h1>

        {children}
      </div>

      <div className="flex items-center justify-between max-md:w-full">
        <Brasao/>
        <Menu onClick={onHandleOpen} size={32} className="md:hidden" />

        {open && (
          <>
            <div className="fixed inset-0 max-w-[225px] z-50">
              <X className="absolute text-white right-4 top-9" onClick={onHandleClosed} />
              <Sidebar/>
            </div>
            <div className="fixed bg-black/50 inset-0 z-40 transition-colors" onClick={onHandleClosed} />
          </>
        )}
      </div>
    </header>
  )
}
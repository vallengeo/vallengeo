'use client'

import Link from "next/link";
import { useState } from "react"

import { Menu, ChevronLeft, X } from "lucide-react";
import { Sidebar } from "@/app/(pagina-inicial)/components/sidebar";
import { Brasao } from "../../../components/brasao";

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
  linkBack?: string;
}

export function Header({
  title,
  children,
  linkBack
}: HeaderProps) {
  const [openMenu, setOpenMenu] = useState(false);

  function handleOpenMenu() {
    setOpenMenu(!openMenu)

    if (openMenu) {
      document.querySelector('body')?.classList.remove('overflow-hidden')
    } else {
      document.querySelector('body')?.classList.add('overflow-hidden')
    }
  }

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
        <Menu onClick={handleOpenMenu} size={32} className="md:hidden" />

        {openMenu && (
          <>
            <div className="fixed inset-0 max-w-[225px] z-50">
              <X className="absolute text-white right-4 top-9" onClick={handleOpenMenu} />
              <Sidebar/>
            </div>
            <div className="fixed bg-black/50 inset-0 z-40 transition-colors" onClick={handleOpenMenu} />
          </>
        )}
      </div>
    </header>
  )
}
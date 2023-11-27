'use client'

import { useState } from "react";

import Link from "next/link";
import { LogoSmall } from "../../../components/logo-small";
import Profile from "../../../components/profile";
import Menu from "@/app/(pagina-inicial)/components/menu";
import { LogOut, X } from "lucide-react";
import { Menu as IconMenu } from 'lucide-react'
import Logo from "@/components/logo";

export function Sidebar() {
  const [menuActive, setMenuActive] = useState(false)

  return (
    <>
      <div className="md:hidden">
        <div className="flex items-center justify-between pt-6">
          <div className="max-w-[180px]">
            <Logo useBlackLogo />
          </div>

          {menuActive
            ? <X size={24} onClick={() => setMenuActive(!menuActive)} />
            : <IconMenu size={24} onClick={() => setMenuActive(!menuActive)} />}
        </div>
      </div>

      <aside className={`h-screen py-6 max-md:py-0 max-md:fixed max-md:-left-full max-md:top-0 ${menuActive ? 'max-md:left-0 max-md:visible max-md:opacity-100' : 'max-md:invisible max-md:opacity-0'} duration-300 z-20`}>
        <div className="flex flex-col justify-between w-40 bg-primary-foreground h-full text-white pt-6 px-4 pb-12 rounded-2xl max-md:rounded-none">
          <div>
            <LogoSmall/>

            <div className="mt-10">
              <Menu/>
            </div>
          </div>

          <div className="space-y-4">
            <Profile className="justify-start"/>
            <Link
              href="/logout"
              className="flex items-center gap-1 font-semibold"
            >
              <LogOut size={18} />
              Sair
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
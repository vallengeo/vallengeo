import Link from "next/link";

import { ChevronLeft } from "lucide-react";
import { Brasao } from "./brasao";

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
  linkBack?: string;
  canShowBrasao?: boolean
}

export function Header({
  title,
  children,
  linkBack,
  canShowBrasao = false
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between gap-y-4 max-md:flex-col-reverse max-md:items-start">
      <div className="flex flex-col">
        <h1 className="flex items-center text-2xl md:text-[2rem] font-semibold">
          {linkBack && (
            <Link href={linkBack}>
              <ChevronLeft />
            </Link>
          )}
          {title}
        </h1>

        {children}
      </div>

      {canShowBrasao && (
        <div className="flex items-center justify-between w-full md:w-auto">
          <Brasao/>
        </div>
      )}
    </header>
  )
}
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
  linkBack?: string;
}

export function Header({ title, children, linkBack }: HeaderProps) {
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
    </header>
  );
}

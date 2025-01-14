"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, Archive, ClipboardList } from "lucide-react";

export const links = [
  {
    id: 1,
    titulo: "Home",
    icon: <Home size={18} />,
    href: "/",
  },
  {
    id: 2,
    titulo: "Imóveis",
    icon: <Map size={18} />,
    href: "/imoveis",
  },
  {
    id: 3,
    titulo: "Protocolos",
    icon: <Archive size={18} />,
    href: "/protocolos",
  },
  {
    id: 4,
    titulo: "Relatórios",
    icon: <ClipboardList size={18} />,
    href: "/relatorios",
  },
];

interface IMenu {
  municipio: string;
}

export function Menu({ municipio }: IMenu) {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="space-y-2.5">
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === `/${municipio}/dashboard`
              : pathname.includes(link.href);

          return (
            <li key={link.id}>
              <Link
                href={`/${municipio}/dashboard/${link.href}`}
                className={`group flex items-center gap-1 text-sm p-2 ${
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold pointer-events-none"
                    : "hover:text-primary hover:font-semibold"
                } rounded-lg`}
              >
                {link.icon}
                {link.titulo}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

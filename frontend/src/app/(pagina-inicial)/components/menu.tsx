'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  Map,
  Archive,
  ClipboardList
} from "lucide-react";

export const links = [
  {
    id: 1,
    titulo: 'Home',
    icon: <Home size={18} />,
    link: '/home'
  },
  {
    id: 2,
    titulo: 'Imóveis',
    icon: <Map size={18} />,
    link: '/imoveis'
  },
  {
    id: 3,
    titulo: 'Protocolos',
    icon: <Archive size={18} />,
    link: '/protocolos'
  },
  {
    id: 4,
    titulo: 'Relatórios',
    icon: <ClipboardList size={18} />,
    link: '/relatorios'
  },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={link.link}
              className={`group flex items-center gap-1 text-sm p-2 ${link.link === pathname ? 'bg-primary text-primary-foreground font-semibold' : ''} rounded-lg hover:bg-primary hover:text-primary-foreground hover:font-semibold`}
            >
              {link.icon}
              {link.titulo}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
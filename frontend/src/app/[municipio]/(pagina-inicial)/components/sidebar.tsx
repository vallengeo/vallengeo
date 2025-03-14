"use client";

import Link from "next/link";
import { LogoSmall } from "@/components/logo-small";
import { Profile } from "@/components/profile";
import { Menu } from "./menu";
import { LogOut } from "lucide-react";
import { actionLogout } from "@/service/authService";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { MenuSkeleton } from "./menu-skeleton";

interface ISidebar {
  municipio: string;
}

export function Sidebar({ municipio }: ISidebar) {
  const router = useRouter();
  const logout = () => {
    actionLogout().then(() => {
      router.refresh();
      router.push(`/${municipio}/autenticacao/login`);
    });
  };

  return (
    <>
      <div className="flex flex-col justify-between w-40 max-md:w-full bg-primary-foreground h-full text-white pt-6 px-4 pb-12 rounded-2xl max-md:rounded-none">
        <div>
          <Link href={`/${municipio}/dashboard`}>
            <LogoSmall />
          </Link>

          <div className="mt-10">
            <Suspense fallback={<MenuSkeleton />}>
              <Menu municipio={municipio} />
            </Suspense>
          </div>
        </div>

        <div className="space-y-4">
          <Profile />

          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1 font-semibold"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </div>
    </>
  );
}

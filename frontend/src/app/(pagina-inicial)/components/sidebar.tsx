import Link from "next/link";
import { LogoSmall } from "../../../components/logo-small";
import Profile from "../../../components/profile";
import Menu from "@/app/(pagina-inicial)/components/menu";
import { LogOut } from "lucide-react";

export function Sidebar() {
  return (
    <>
      <div className="flex flex-col justify-between w-40 max-md:w-full bg-primary-foreground h-full text-white pt-6 px-4 pb-12 rounded-2xl max-md:rounded-none">
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
    </>
  );
}
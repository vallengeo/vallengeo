import Link from "next/link";
import { LogoSmall } from "./logo-small";
import Profile from "./profile";
import Navigation from "@/components/navigation";
import { LogOut } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="flex flex-col justify-between h-full w-40 bg-primary-foreground text-white px-4 pt-6 pb-12 rounded-2xl">
      <div>
        <LogoSmall/>

        <div className="mt-10">
          <Navigation/>
        </div>
      </div>

      <div className="space-y-4">
        <Profile/>
        <Link
          href="/logout"
          className="flex items-center gap-1 font-semibold"
        >
          <LogOut size={18} />
          Sair
        </Link>
      </div>
    </aside>
  );
}
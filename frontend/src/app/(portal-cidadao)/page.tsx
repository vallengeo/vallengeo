import Link from "next/link";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function PortalCidadao() {
  return (
    <>
      <header className="container fixed left-0 right-0 top-6 z-20">
        <div className="flex items-center justify-between bg-primary-foreground p-6 rounded-2xl">
          <Logo/>

          <Link href="/login">
            <Button variant="default">
              Entrar
            </Button>
          </Link>
        </div>
      </header>

      <h1 className="clipped">Portal do Cidadão</h1>
    </>
  )
}
import Logo from "@/components/logo";
import Menu from "@/components/menu";


export default function PortalCidadao() {


  return (
    <>
      <header className="container fixed left-0 right-0 top-6 z-20">
        <div className="flex items-center justify-between bg-primary-foreground py-6 pl-6 pr-9 rounded-2xl">
          <Logo/>
          <Menu/>
        </div>
      </header>

      <h1 className="clipped">Portal do Cidadão</h1>
    </>
  )
}
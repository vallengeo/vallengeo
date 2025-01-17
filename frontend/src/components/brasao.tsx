import Image from "next/image";
import brasao from "@/assets/images/prefeitura/brasao_cruzeiro.webp";
import { cn } from "@/lib/utils";

interface BrasaoProps {
  className?: string;
}

export function Brasao({ className }: BrasaoProps) {
  return (
    <div className={`flex items-center select-none ${cn(className, 'justify-center')}`}>
      <Image
        src={brasao}
        alt="Brasão Cruzeiro"
      />
      <div className="flex flex-col text-[#1d1d1b] leading-[1] text-center">
        <span className="font-light text-sm">Prefeitura de</span>
        <span className="uppercase font-bold">CRUZEIRO</span>
      </div>
    </div>
  );
}

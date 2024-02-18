import Image from "next/image"
import avatar from "@/assets/images/avatar.png"

import { cn } from "@/lib/utils"

interface ProfileProps {
  className?: string;
}

export function Profile({
  className = ''
}: ProfileProps) {
  return (
    <div className={cn(
      "flex justify-center items-center space-x-1",
      className
    )}>
      <Image
        src={avatar}
        alt="Foto do João Silva"
      />
      <div className="flex flex-col text-white text-left">
        <strong className="text-xs">João Silva</strong>
        <span className="text-[0.625rem]">Cidadão</span>
      </div>
    </div>
  )
}
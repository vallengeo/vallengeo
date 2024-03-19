import Image from "next/image"
import avatar from "@/assets/images/avatar.png"

import { cn } from "@/lib/utils"

interface AvatarProps {
  width?: number | `${number}`
  height?: number  | `${number}`
  className?: string
}

export function Avatar({ className, width, height }: AvatarProps) {
  return (
    <Image
      src={avatar}
      alt="Foto do João Silva"
      width={width}
      height={height}
      className={cn('', className)}
    />
  )
}
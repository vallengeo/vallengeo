import Image from "next/image";
import logoBlack from '@/assets/images/logo-black.svg';
import logoWhite from '@/assets/images/logo-white.svg';

import { cn } from '@/lib/utils'

interface LogoProps {
  useBlackLogo?: boolean;
  className?: string
}

export function Logo({ useBlackLogo, className }: LogoProps) {
  return (
    <Image
      src={useBlackLogo ? logoBlack : logoWhite}
      alt="Logo VallenGeo"
      priority
      className={cn(className, '')}
    />
  )
}
import Image from "next/image";
import logoBlack from '@/assets/images/logo-black.svg';
import logoWhite from '@/assets/images/logo-white.svg';

interface LogoProps {
  useBlackLogo?: boolean;
}

export function Logo(props: LogoProps) {
  return (
    <Image
      src={props.useBlackLogo ? logoBlack : logoWhite}
      alt="Logo VallenGeo"
      priority
    />
  )
}
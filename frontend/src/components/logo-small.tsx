import Image from "next/image";
import logoSmall from '@/assets/images/logo-small.svg';

export function LogoSmall() {
  return (
    <Image
      src={logoSmall}
      alt="Logo VallenGeo"
      priority
    />
  )
}
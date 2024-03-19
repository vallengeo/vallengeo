import Image from "next/image";
import cityBackdrop from '@/assets/images/prefeitura/city-backdrop.jpg';

export function CityBackdrop() {
  return (
    <Image
      src={cityBackdrop}
      alt="Representação visual da cidade"
      className="h-full w-full object-cover"
    />
  )
}
import Image from 'next/image'
import logo from '@/assets/images/prefeitura/logo_taubate.png'

interface BrasaoProps {
  className?: string;
}

export function Brasao({
  className
}: BrasaoProps) {
  return (
    <Image
      src={logo}
      alt="Brasão da Prefeitura"
      className={className}
    />
  )
}
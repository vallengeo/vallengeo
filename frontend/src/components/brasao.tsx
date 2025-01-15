import Image from 'next/image'
import brasao from '@/assets/images/prefeitura/brasao_cruzeiro.webp'

interface BrasaoProps {
  className?: string;
}

export function Brasao({
  className
}: BrasaoProps) {
  return (
    <Image
      src={brasao}
      alt="Brasão da Prefeitura"
      className={className}
    />
  )
}

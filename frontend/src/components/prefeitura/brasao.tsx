import Image from 'next/image'
import logo from '@/assets/images/prefeitura/logo_taubate.png'

export default function Brasao() {
  return (
    <Image
      src={logo}
      alt="Brasão da Prefeitura"
      className="mx-auto"
    />
  )
}
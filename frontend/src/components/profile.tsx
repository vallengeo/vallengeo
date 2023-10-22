import Image from "next/image"
import avatar from "@/assets/images/avatar.png"

export default function Profile() {
  return (
    <div className="flex items-center justify-center space-x-1 cursor-pointer">
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
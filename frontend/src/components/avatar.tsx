// import Image from "next/image";
// import avatar from "@/assets/images/avatar.png";

import { cn } from "@/lib/utils";

interface AvatarProps {
  nome?: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  className?: string;
}

export function Avatar({
  nome = "Vallen Geo",
  width = 140,
  height = 135,
  className,
}: AvatarProps) {
  const partes = nome.trim().split(/\s+/);
  const iniciais = partes[0][0] + (partes[1] ? partes[1][0] : "");

  return (
    <>
      <span
        className={cn(
          "flex items-center justify-center bg-primary text-foreground font-bold rounded-md max-w-[110px] max-h-[105px] md:max-w-[140px] md:max-h-[135px] flex-shrink-0",
          className
        )}
        style={{ width: width, height: height }}
      >
        {iniciais}
      </span>

      {/* Adaptar na v2
      <Image
        src={avatar}
        alt="Foto de perfil"
        width={width}
        height={height}
        className={cn("", className)}
      /> */}
    </>
  );
}

import bgBoasVindas from "@/assets/images/prefeitura/montanha.webp";
import Image from "next/image";

export function Welcome() {
  return (
    <div className="flex-1 rounded-3xl overflow-hidden relative">
      <div className="flex flex-col justify-center text-white absolute inset-0 z-20 p-7">
        <h2 className="text-2xl md:text-[2rem]/8 font-bold">Boas vindas,</h2>
        <p>ao sistema de monitoramento urbano!</p>
      </div>

      <div className="size-full relative min-h-[165px]">
        <Image
          src={bgBoasVindas}
          alt="Imagem de boas vindas"
          className="object-cover size-full absolute inset-0"
        />

        <div className="absolute inset-0 z-10 bg-welcome" />
      </div>
    </div>
  );
}

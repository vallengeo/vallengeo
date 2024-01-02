import { cn } from "@/lib/utils"

interface LegendaProps {
  className?: string;
}

export default function Legenda({
  className
}: LegendaProps) {
  return (
    <div className={cn(
      "flex items-center flex-wrap gap-4 text-sm",
      className
    )}>
      <span>Legenda:</span>

      <div className="flex items-center gap-1 font-light">
        <div className="w-4 h-4 rounded-full bg-[#70C64D]" />
        Aprovado
      </div>

      <div className="flex items-center gap-1 font-light">
        <div className="w-4 h-4 rounded-full bg-[#DA1C4A]" />
        Reprovado
      </div>

      <div className="flex items-center gap-1 font-light">
        <div className="w-4 h-4 rounded-full bg-[#FFBE5B]" />
        Em análise
      </div>

      <div className="flex items-center gap-1 font-light">
        <div className="w-4 h-4 rounded-full bg-[#729397]" />
        Cancelado
      </div>
    </div>
  )
}
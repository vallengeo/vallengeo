import { cn } from "@/lib/utils"

interface LegendaProps {
  className?: string;
}

export function Legenda({
  className
}: LegendaProps) {
  return (
    <div className={cn(
      "flex items-center flex-wrap gap-4 text-sm",
      className
    )}>
      <span>Legenda:</span>

      <div className="flex items-center gap-1 font-light">
        <div className="w-4 h-4 rounded-full bg-[#005074]" />
        Comercial
      </div>

      <div className="flex items-center gap-1 font-light">
        <div className="w-4 h-4 rounded-full bg-[#0EA061]" />
        Residencial
      </div>

      <div className="flex items-center gap-1 font-light">
        <div className="w-4 h-4 rounded-full bg-[#729397]" />
        Misto
      </div>
    </div>
  )
}
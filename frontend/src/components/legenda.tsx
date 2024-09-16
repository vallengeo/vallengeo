import { cn } from "@/lib/utils"

interface LegendaItem {
  color: string;
  text: string;
}

interface LegendaProps {
  className?: string;
  legendas: LegendaItem[];
}

export function Legenda({
  className,
  legendas
}: LegendaProps) {
  return (
    <div className={cn("flex items-center flex-wrap gap-4 text-sm", className)}>
      <span>Legenda:</span>

      {legendas.map((legenda, index) => (
        <div key={index} className="flex items-center gap-1 font-light">
          <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: legenda.color }} />
          {legenda.text}
        </div>
      ))}
    </div>
  )
}

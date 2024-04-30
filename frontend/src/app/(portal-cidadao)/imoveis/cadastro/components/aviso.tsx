import { cn } from '@/lib/utils'

import {
  Info as LucideInfo,
  AlertTriangle as LucideAlertTriangle
} from "lucide-react";

interface AvisoProps {
  type: 'warning' | 'info'
  size: number
  message: string
  className?: string
}

export function Aviso({ type, size, message, className }: AvisoProps) {
  return (
    <div className={cn("flex items-center justify-center gap-4 p-4 bg-[#9897FF]/10 rounded-2xl text-lg", className)}>
      {getIconByType(type, size)}
      <p>{message}</p>
    </div>
  )
}

function getIconByType(type: string, size: number) {
  let icon;

  switch (type) {
    case 'info':
      icon = <LucideInfo size={size} />
      break;

    case 'warning':
      icon = <LucideAlertTriangle size={size} />
  }

  return icon;
}

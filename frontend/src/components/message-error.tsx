import { cn } from "@/lib/utils"

interface MessageErrorProps {
  children: React.ReactNode
  className?: string
}

export default function MessageError({
  children,
  className = ''
}: MessageErrorProps) {
  return (
    <span className={cn(className, 'text-xs text-red-600 font-medium')}>
      {children}
    </span>
  )
}
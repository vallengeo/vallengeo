import { Button } from "./ui/button";

interface SupportProps {
  variant?: "default" | "secondary" | "tertiary" | "ghost" | "outline" | "link" | null | undefined;
}

export default function Support({ variant = 'link' }: SupportProps) {
  return (
    <Button variant={variant} className="flex-1">
      <a href="#">
        Suporte
      </a>
    </Button>
  )
}
import { Button } from "./ui/button";

interface SupportProps {
  variant?: "default" | "secondary" | "tertiary" | "ghost" | "outline" | "link" | null | undefined;
}

export function Support({ variant = 'link' }: SupportProps) {
  return (
    <Button
      asChild
      variant={variant}
      className="flex-1"
    >
      <a href="#">
        Suporte
      </a>
    </Button>
  )
}
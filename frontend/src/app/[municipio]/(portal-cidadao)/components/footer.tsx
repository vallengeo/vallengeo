import { Brasao } from "@/components/brasao";
import { Copyright } from "@/components/copyright";

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="flex items-center flex-col gap-4 bg-background-secondary p-6 text-center relative min-h-[68px]"
    >
      <Brasao className="md:absolute top-1/2 md:-translate-y-1/2 right-4" />
      <Copyright />
    </footer>
  );
}

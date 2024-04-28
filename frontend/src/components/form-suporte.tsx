import { ChevronDown } from "lucide-react";

export function FormSuporte() {
  return (
    <div className="bg-white rounded-lg py-4 px-6 fixed left-6 bottom-20 z-10 border border-input w-full max-w-[430px]">
      <button className="flex items-center justify-between gap-4 w-full">
        <span className="font-semibold max-w-[250px] text-left">
          Em caso de dúvida, não hesite em entrar em contato.
        </span>
        <ChevronDown className="text-primary" />
      </button>
    </div>
  )
}
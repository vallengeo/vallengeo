import {
  Book,
  Building,
  User
} from "lucide-react";

interface CurrentStepProps {
  currentStep: number;
}

export function Steps({ currentStep }: CurrentStepProps) {
  return (
    <div className="bg-white border border-[#E8E1E1] rounded-2xl px-16">
      <div className="flex items-center justify-center max-w-[450px] h-[145px] mx-auto">
        <div className={`flex-1 bg-primary text-primary h-1 relative`}>
          <User size={40} className="absolute bottom-0 -translate-y-4 -translate-x-1/2" />
          <span className="absolute top-0 translate-y-4 -translate-x-1/2 font-medium">
            Representante
          </span>
          <span className="inline-flex w-2.5 h-2.5 rounded-full bg-primary absolute left-0 -top-[3px]"></span>
        </div>

        <div className={`flex-1 ${currentStep === 1 ? 'bg-[#bbb] text-[#bbb]' : 'bg-primary text-primary'} h-1 relative`}>
          <Book size={40} className="absolute bottom-0 left-1/2 -translate-y-4 -translate-x-1/2" />
          <span className="absolute top-0 left-1/2 translate-y-4 -translate-x-1/2 font-medium">
            Documentos
          </span>
          <span className={`inline-flex w-2.5 h-2.5 rounded-full ${currentStep === 1 ? 'bg-[#bbb]' : 'bg-primary'} absolute left-1/2 -translate-x-1/2 -top-[3px]`}></span>
        </div>

        <div className={`flex-1 ${currentStep === 3 ? 'bg-primary text-primary' : 'bg-[#bbb] text-[#bbb]'} h-1 relative`}>
          <Building size={40} className="absolute bottom-0 right-0 -translate-y-4 translate-x-1/2" />
          <span className="absolute top-0 right-0 translate-y-4 translate-x-1/2 font-medium">
            Imóvel
          </span>
          <span className={`inline-flex w-2.5 h-2.5 rounded-full ${currentStep === 3 ? 'bg-primary' : 'bg-[#bbb]'} absolute right-0 -top-[3px]`}></span>
        </div>
      </div>
    </div>
  )
}
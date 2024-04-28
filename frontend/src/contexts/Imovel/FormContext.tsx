import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type ContatoType = 'representante' | 'responsavel' | 'outro';

interface FormContextProps {
  formData: any
  setFormData: Dispatch<SetStateAction<any>>
  onHandleBack: () => void
  onHandleNext: () => void
  step: number,
  contato: ContatoType
  setContato: Dispatch<SetStateAction<ContatoType>>
}

const FormContext = createContext<FormContextProps>({
  formData: {},
  onHandleBack: () => {},
  onHandleNext: () => {},
  setFormData: () => {},
  step: 0,
  contato: 'representante',
  setContato: () => {}
});

interface FormProviderProps {
  children: React.ReactNode;
}

export function FormProvider({ children }: FormProviderProps) {
  const [formData, setFormData] = useState();
  const [step, setStep] = useState(1);
  const [contato, setContato] = useState<ContatoType>('representante')

  function onHandleNext() {
    setStep((prev) => prev + 1);
  }

  function onHandleBack() {
    setStep((prev) => prev - 1);
  }

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        onHandleBack,
        onHandleNext,
        step,
        contato,
        setContato
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormState() {
  return useContext(FormContext);
}

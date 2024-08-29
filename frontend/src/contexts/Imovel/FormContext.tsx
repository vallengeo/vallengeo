import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

interface FormContextProps {
  formData: any
  setFormData: Dispatch<SetStateAction<any>>
  onHandleBack: () => void
  onHandleNext: () => void
  step: number,
}

const FormContext = createContext<FormContextProps>({
  formData: {},
  onHandleBack: () => { },
  onHandleNext: () => { },
  setFormData: () => { },
  step: 0,
});

interface FormProviderProps {
  children: React.ReactNode;
}

export function FormProvider({ children }: FormProviderProps) {
  const [formData, setFormData] = useState({
    representantes: [
      {
        nome: 'Teste VallenGeo',
        cpf: '160.751.080-41',
        rg: '29.563.135-1',
        telefone: '(16) 99123-4567',
        email: 'teste@vallengeo.com.br',
        cep: '01310-000',
        endereco: 'Avenida Paulista',
        numero: '445',
        complemento: 'até 610 - lado par',
        bairro: 'Bela Vista',
        cidade: 'São Paulo',
        uf: 'SP',
        tipo_contato: 'responsavel',
        nome_contato: '',
        email_contato: '',
        telefone_contato: '',
        documento: '',
      },
    ],
    grupo: '',
    imovel_cep: '',
    imovel_endereco: '',
    imovel_numero: '',
    imovel_complemento: '',
    imovel_bairro: '',
    imovel_cidade: '',
    imovel_uf: '',
    setor: '',
    quadra: '',
    lote: '',
    unidade: '',
    area_terreno: '',
    testada: '',
    fracao: '',
    data_inclusao: '',
    observacao: '',
  })
  const [step, setStep] = useState(1)

  function onHandleNext() {
    setStep((prev) => prev + 1);
  }

  function onHandleBack() {
    setStep((prev) => prev - 1);
  }

  return (
    <FormContext.Provider
      value={{ formData, setFormData, onHandleBack, onHandleNext, step }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormState() {
  return useContext(FormContext);
}

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IFormCadastroPFContext {
  formData: any;
  setFormData: Dispatch<SetStateAction<any>>;
}

const FormCadastroPFContext = createContext<IFormCadastroPFContext>({
  formData: {},
  setFormData: () => {},
});

interface IFormCadastroPFProvider {
  children: React.ReactNode;
}

export function FormCadastroPFProvider({ children }: IFormCadastroPFProvider) {
  const [formData, setFormData] = useState({
    representantes: [
      {
        nome: "",
        cpf: "",
        rg: "",
        telefone: "",
        email: "",
        cep: "",
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        uf: "",
        tipo_contato: "",
        nome_contato: "",
        email_contato: "",
        telefone_contato: "",
        documento: "",
      },
    ],
    grupo: "",
    imovel_cep: "",
    imovel_endereco: "",
    imovel_numero: "",
    imovel_complemento: "",
    imovel_bairro: "",
    imovel_cidade: "",
    imovel_uf: "",
    setor: "",
    quadra: "",
    lote: "",
    unidade: "",
    area_terreno: "",
    testada: "",
    fracao: "",
    data_inclusao: "",
    observacao: "",
  });

  return (
    <FormCadastroPFContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormCadastroPFContext.Provider>
  );
}

export function useFormState() {
  return useContext(FormCadastroPFContext);
}

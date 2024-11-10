import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IFormCadastroPJContext {
  formData: any;
  setFormData: Dispatch<SetStateAction<any>>;
}

const FormCadastroPJContext = createContext<IFormCadastroPJContext>({
  formData: {},
  setFormData: () => {},
});

interface IFormCadastroPJProvider {
  children: React.ReactNode;
}

export function FormCadastroPJProvider({ children }: IFormCadastroPJProvider) {
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
    <FormCadastroPJContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormCadastroPJContext.Provider>
  );
}

export function useFormState() {
  return useContext(FormCadastroPJContext);
}

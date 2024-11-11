'use client'

import { z } from "zod";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useEffect
} from "react";
import { dadosPessoaisSchema } from "@/validation/imovel/representante";
import { imovelFormSchema } from "@/validation/imovel/imovel";

const LOCAL_STORAGE_KEY = 'cadastro-imovel-pf';

const formCadastroPFSchema = dadosPessoaisSchema.merge(imovelFormSchema);

export type formCadastroPFData = z.infer<typeof formCadastroPFSchema>;

const initialFormData: formCadastroPFData = {
  representantes: [
    {
      email: "",
      telefone: "",
      tipoPessoa: "FISICA",
      endereco: {
        cep: "",
        logradouro: "",
        bairro: "",
        numero: "",
        complemento: "",
        cidade: "",
        uf: "",
        idMunicipio: 0,
      },
      contato: {
        tipo: "representante",
        nome: "",
        email: "",
        telefone: "",
        documento: "",
      },
      nome: "",
      cpf: "",
      rg: "",
    },
  ],
  informacaoImovel: {
    tipoUso: "",
    endereco: {
      cep: "",
      logradouro: "",
      bairro: "",
      numero: "",
      complemento: "",
      cidade: "",
      uf: "",
      idMunicipio: 0,
    },
  },
  caracterizacaoImovel: {
    setor: "",
    areaTerreno: "",
    dataInclusao: new Date(),
    lote: "",
    quadra: "",
    testadaPrincipal: "",
    fracaoIdeal: "",
    unidade: ""
  },
};

interface IFormCadastroPFContext {
  formData: formCadastroPFData;
  setFormData: Dispatch<SetStateAction<formCadastroPFData>>;
  clearFormData: () => void
}

const FormCadastroPFContext = createContext<IFormCadastroPFContext>({
  formData: initialFormData,
  setFormData: () => {},
  clearFormData: () => {}
});

interface IFormCadastroPFProvider {
  children: React.ReactNode;
}

export function FormCadastroPFProvider({ children }: IFormCadastroPFProvider) {
  const loadFormData = (): formCadastroPFData => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedData ? JSON.parse(savedData) : initialFormData;
    }
    return initialFormData;
  };

  const [formData, setFormData] = useState<formCadastroPFData>(loadFormData);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  const clearFormData = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
    setFormData(initialFormData);
  };

  return (
    <FormCadastroPFContext.Provider value={{ formData, setFormData, clearFormData }}>
      {children}
    </FormCadastroPFContext.Provider>
  );
}

export function useFormState() {
  return useContext(FormCadastroPFContext);
}

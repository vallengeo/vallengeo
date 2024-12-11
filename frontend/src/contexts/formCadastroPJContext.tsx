"use client";

import { z } from "zod";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { dadosEmpresaSchema } from "@/validation/imovel/representante";
import { imovelFormSchema } from "@/validation/imovel/imovel";

const LOCAL_STORAGE_KEY = "cadastro-imovel-pj";

const formCadastroPJSchema = dadosEmpresaSchema.merge(imovelFormSchema);

export type formCadastroPJData = z.infer<typeof formCadastroPJSchema>;

const initialFormData: formCadastroPJData = {
  cnpj: "",
  razaoSocial: "",
  responsavel: {
    cpf: "",
    email: "",
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
    nome: "",
    rg: "",
    tipoPessoa: "FISICA",
    telefone: ""
  },
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
    unidade: "",
  },
};

interface IFormCadastroPJContext {
  formData: formCadastroPJData;
  setFormData: Dispatch<SetStateAction<formCadastroPJData>>;
  clearFormData: () => void
}

const FormCadastroPJContext = createContext<IFormCadastroPJContext>({
  formData: initialFormData,
  setFormData: () => {},
  clearFormData: () => {}
});

interface IFormCadastroPJProvider {
  children: React.ReactNode;
}

export function FormCadastroPJProvider({ children }: IFormCadastroPJProvider) {
  const loadFormData = (): formCadastroPJData => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedData ? JSON.parse(savedData) : initialFormData;
    }
    return initialFormData;
  };

  const [formData, setFormData] = useState<formCadastroPJData>(loadFormData);

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
    <FormCadastroPJContext.Provider value={{ formData, setFormData, clearFormData }}>
      {children}
    </FormCadastroPJContext.Provider>
  );
}

export function useFormState() {
  return useContext(FormCadastroPJContext);
}

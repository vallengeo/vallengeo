"use client";

import z from "zod";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import Cookies from "js-cookie";
import { GRUPO_ID } from "@/constants/auth";
import { dadosPessoaisSchema } from "@/validation/imovel/representante";
import { imovelFormSchema } from "@/validation/imovel/imovel";

const idGrupo = Cookies.get(GRUPO_ID);
const formCadastroPFSchema = dadosPessoaisSchema.merge(imovelFormSchema);

export type formCadastroPFData = z.infer<typeof formCadastroPFSchema>;

const initialFormData: formCadastroPFData = {
  idGrupo: String(idGrupo),
  representantes: [
    {
      email: "",
      telefone: "",
      endereco: {
        cep: "",
        logradouro: "",
        bairro: "",
        numero: "",
        complemento: "",
        municipio: {
          id: 0,
          nome: "",
          estado: {
            id: 0,
            nome: "",
            uf: "",
          },
        },
      },
      nome: "",
      cpf: "",
      rg: "",
      tipoPessoa: "FISICA",
      contato: {
        nome: "",
        email: "",
        telefone: "",
        responsavelTecnico: false,
        representanteLegal: true,
        outro: false,
        documento: "",
      },
    },
  ],
  informacaoImovel: {
    tipoUso: {
      id: "1",
    },
    endereco: {
      cep: "",
      logradouro: "",
      bairro: "",
      numero: "",
      idMunicipio: 0,
    },
  },
  caracterizacaoImovel: {
    setor: "",
    quadra: "",
    lote: "",
    unidade: "",
    areaTerreno: "",
    testadaPrincipal: "",
    fracaoIdeal: "",
    dataInclusao: new Date(),
  },
};

interface IFormCadastroPFContext {
  formData: formCadastroPFData;
  setFormData: Dispatch<SetStateAction<formCadastroPFData>>;
}

const FormCadastroPFContext = createContext<IFormCadastroPFContext>({
  formData: initialFormData,
  setFormData: () => {},
});

interface IFormCadastroPFProvider {
  children: React.ReactNode;
}

export function FormCadastroPFProvider({ children }: IFormCadastroPFProvider) {
  const [formData, setFormData] = useState<formCadastroPFData>(initialFormData);

  return (
    <FormCadastroPFContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormCadastroPFContext.Provider>
  );
}

export function useFormState() {
  return useContext(FormCadastroPFContext);
}

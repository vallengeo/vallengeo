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
import Cookies from "js-cookie";
import { GRUPO_ID } from "@/constants/auth";
import { dadosEmpresaSchema } from "@/validation/imovel/representante";
import { imovelFormSchema } from "@/validation/imovel/imovel";

const idGrupo = Cookies.get(GRUPO_ID);

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
    rg: "",
    tipoPessoa: "FISICA",
    telefone: "",
  },
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

interface IFormCadastroPJContext {
  formData: formCadastroPJData;
  setFormData: Dispatch<SetStateAction<formCadastroPJData>>;
}

const FormCadastroPJContext = createContext<IFormCadastroPJContext>({
  formData: initialFormData,
  setFormData: () => {},
});

interface IFormCadastroPJProvider {
  children: React.ReactNode;
}

export function FormCadastroPJProvider({ children }: IFormCadastroPJProvider) {
  const [formData, setFormData] = useState<formCadastroPJData>(initialFormData);

  return (
    <FormCadastroPJContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormCadastroPJContext.Provider>
  );
}

export function useFormState() {
  return useContext(FormCadastroPJContext);
}

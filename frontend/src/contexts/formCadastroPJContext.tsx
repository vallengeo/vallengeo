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
      cep: "12302-244",
      logradouro: "Rua Francisco Vichi",
      bairro: "Residencial Santa Paula",
      numero: "107",
      complemento: "",
      municipio: {
        id: 3524402,
        nome: "Jacareí",
        estado: {
          id: 35,
          nome: "São Paulo",
          uf: "SP",
        },
      },
    },
    nome: "",
    rg: "",
    tipoPessoa: "FISICA",
    telefone: ""
  },
  idGrupo: String(idGrupo),
  representantes: [
    {
      email: "stefanysophielopes@heinrich.com.br",
      telefone: "(12) 3590-2293",
      endereco: {
        cep: "12302-244",
        logradouro: "Rua Francisco Vichi",
        bairro: "Residencial Santa Paula",
        numero: "107",
        complemento: "",
        municipio: {
          id: 3524402,
          nome: "Jacareí",
          estado: {
            id: 35,
            nome: "São Paulo",
            uf: "SP",
          },
        },
      },
      nome: "Stefany Sophie Lopes",
      cpf: "73017117006",
      rg: "298442619",
      tipoPessoa: "FISICA",
      contato: {
        nome: "Maria Julia Joana Gonçalves",
        email: "maria.julia.goncalves@avantii.com.br",
        telefone: "(11) 99907-6092",
        responsavelTecnico: false,
        representanteLegal: false,
        outro: true,
        documento: "045.999.111-23",
      },
    },
  ],
  informacaoImovel: {
    tipoUso: {
      id: "1",
    },
    endereco: {
      cep: "12711610",
      logradouro: "Rua  DARIO ANTUNES DE OLIVEIRA",
      bairro: "VILA LOYELO",
      numero: "650",
      idMunicipio: 3513405,
    },
  },
  caracterizacaoImovel: {
    setor: "3",
    quadra: "189",
    lote: "0170",
    unidade: "001",
    areaTerreno: "268",
    testadaPrincipal: "8",
    fracaoIdeal: "0",
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

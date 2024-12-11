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
  // georreferenciamento: {
  //   geoJson: {
  //     geometry: {
  //       coordinates: [
  //         [
  //           [-44.96611868173562, -22.559061809666048],
  //           [-44.966143985139496, -22.55902409240122],
  //           [-44.96592970837085, -22.558902617586],
  //           [-44.96590601936282, -22.558941882174288],
  //           [-44.96611868173562, -22.559061809666048],
  //         ],
  //       ],
  //       type: "Polygon",
  //     },
  //     type: "Feature",
  //     properties: {},
  //   },
  // },
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

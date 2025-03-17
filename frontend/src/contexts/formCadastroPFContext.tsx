"use client";

import z from "zod";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { GRUPO_ID } from "@/constants/auth";
import { dadosPessoaisSchema } from "@/validation/imovel/representante";
import { imovelFormSchema } from "@/validation/imovel/imovel";
import { fichaEdit } from "@/service/imovelService";
import { usePathname } from "next/navigation";

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
      id: "",
    },
    endereco: {
      cep: "",
      logradouro: "",
      bairro: "",
      numero: "",
      complemento: "",
      idMunicipio: 0,
      nomeMunicipio: "",
      siglaUf: "",
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
  georreferenciamento: {
    geoJson: {
      geometry: {
        type: "Polygon",
        coordinates: [],
      },
      type: "Feature",
      properties: {},
    },
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
  const pathname = usePathname();

  useEffect(() => {
    const isEditing = pathname.includes('imoveis/editar');
    const processoId = pathname.split('/')[4];

    if (isEditing && processoId) {
      const storedData = localStorage.getItem(`ficha-${processoId}`);

      if (storedData) {
        setFormData(JSON.parse(storedData));
      } else {
        (async () => {
          try {
            const response = await fichaEdit(processoId);
            const { data } = response;

            const fichaEditData = {
              idGrupo: String(idGrupo),
              representantes: data.representantes.map((rep: any) => ({
                email: rep.email || "",
                telefone: rep.telefone || "",
                endereco: {
                  cep: rep.endereco.cep || "",
                  logradouro: rep.endereco.logradouro || "",
                  bairro: rep.endereco.bairro || "",
                  numero: rep.endereco.numero || "",
                  complemento: rep.endereco.complemento || "",
                  municipio: {
                    id: rep.endereco.municipio.id || 0,
                    nome: rep.endereco.municipio.nome || "",
                    estado: {
                      id: rep.endereco.municipio.estado.id || 0,
                      nome: rep.endereco.municipio.estado.nome || "",
                      uf: rep.endereco.municipio.estado.uf || "",
                    },
                  },
                },
                nome: rep.nome || rep.responsavel.nome || "",
                cpf: rep.cpf || rep.responsavel.cpf || "",
                rg: rep.rg || rep.responsavel.rg || "",
                tipoPessoa: rep.tipoPessoa || "FISICA",
                contato: {
                  nome: rep.contato?.nome || "",
                  email: rep.contato?.email || "",
                  telefone: rep.contato?.telefone || "",
                  responsavelTecnico: rep.contato?.responsavelTecnico || false,
                  representanteLegal: rep.contato?.representanteLegal || false,
                  outro: rep.contato?.outro || false,
                  documento: rep.contato?.documento || "",
                },
              })),
              informacaoImovel: {
                tipoUso: {
                  id: data.informacaoImovel.tipoUso.id || "",
                },
                endereco: {
                  cep: data.informacaoImovel.endereco.cep || "",
                  logradouro: data.informacaoImovel.endereco.logradouro || "",
                  bairro: data.informacaoImovel.endereco.bairro || "",
                  numero: data.informacaoImovel.endereco.numero || "",
                  complemento: data.informacaoImovel.endereco.complemento || "",
                  idMunicipio: data.informacaoImovel.endereco.municipio.id || 0,
                  nomeMunicipio: data.informacaoImovel.endereco.municipio.nome || "",
                  siglaUf: data.informacaoImovel.endereco.municipio.estado.uf || "",
                },
              },
              caracterizacaoImovel: {
                setor: data.caracterizacaoImovel.setor || "",
                quadra: data.caracterizacaoImovel.quadra || "",
                lote: data.caracterizacaoImovel.lote || "",
                unidade: data.caracterizacaoImovel.unidade || "",
                areaTerreno: data.caracterizacaoImovel.areaTerreno || "",
                testadaPrincipal: data.caracterizacaoImovel.testadaPrincipal || "",
                fracaoIdeal: data.caracterizacaoImovel.fracaoIdeal || "",
                dataInclusao: data.caracterizacaoImovel.dataInclusao || new Date(),
              },
              georreferenciamento: {
                geoJson: {
                  geometry: {
                    type: data.geometria.type || "Polygon",
                    coordinates: data.geometria.coordinates || [],
                  },
                  type: "Feature",
                  properties: {},
                },
              },
            };

            setFormData(fichaEditData);
            localStorage.setItem(`ficha-${processoId}`, JSON.stringify(fichaEditData));
          } catch (error) {
            console.error("Erro ao buscar ficha:", error);
          }
        })();
      }
    }
  }, []);

  return (
    <FormCadastroPFContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormCadastroPFContext.Provider>
  );
}

export function useFormState() {
  return useContext(FormCadastroPFContext);
}

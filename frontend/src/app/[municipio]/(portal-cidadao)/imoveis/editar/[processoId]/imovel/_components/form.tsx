"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useFormState } from "@/contexts/formCadastroPFContext";
import { imovelFormSchema, imovelFormData } from "@/validation/imovel/imovel";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { getCep } from "@/service/localidadeService";
import { handlePreviousStep, handleNextStep } from "./navigate";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, PenSquare as LucidePenSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Mapa from "../../../../cadastro/_components/mapa";
import InputMask from "react-input-mask";
import { Loader } from "@/components/loader";
import { motion } from "motion/react";
import IEstados from "@/interfaces/Localidade/IEstado";
import { TipoUso } from "@/interfaces/ITipoUso";
import IFicha from "@/interfaces/Analista/IFicha";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

interface FormCadastroImovelProps {
  ficha: IFicha;
  estados: IEstados[];
  grupos: TipoUso[];
}

export function FormCadastroImovel({
  ficha,
  estados,
  grupos,
}: FormCadastroImovelProps) {
  const pathname = usePathname();
  const municipio = pathname.split("/")[1];

  const [editarInformacaoImovel, setEditarInformacaoImovel] =
    useState<boolean>(true);
  const [editarCaracterizacaoImovel, setEditarCaracterizacaoImovel] =
    useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCep, setLoadingCep] = useState<boolean>(false);

  const { toast } = useToast();
  const { formData, setFormData } = useFormState();

  const form = useForm<imovelFormData>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(imovelFormSchema),
    defaultValues: formData,
  });

  const {
    setValue,
    formState: { isValid },
    trigger,
  } = form;

  useEffect(() => {
    if (ficha?.informacaoImovel) {
      setValue(
        "informacaoImovel.tipoUso.id",
        ficha.informacaoImovel.tipoUso.id.toString()
      );
      setValue(
        "informacaoImovel.endereco.cep",
        ficha.informacaoImovel.endereco.cep
      );
      setValue(
        "informacaoImovel.endereco.logradouro",
        ficha.informacaoImovel.endereco.logradouro
      );
      setValue(
        "informacaoImovel.endereco.numero",
        ficha.informacaoImovel.endereco.numero
      );
      setValue(
        "informacaoImovel.endereco.complemento",
        ficha.informacaoImovel.endereco.complemento || ""
      );
      setValue(
        "informacaoImovel.endereco.bairro",
        ficha.informacaoImovel.endereco.bairro
      );
      setValue(
        "informacaoImovel.endereco.idMunicipio",
        ficha.informacaoImovel.endereco.municipio.id
      );
      setValue(
        "informacaoImovel.endereco.nomeMunicipio",
        ficha.informacaoImovel.endereco.municipio.nome
      );
      setValue(
        "informacaoImovel.endereco.siglaUf",
        ficha.informacaoImovel.endereco.municipio.estado.uf
      );
    }

    if (ficha?.caracterizacaoImovel) {
      setValue(
        "caracterizacaoImovel.areaTerreno",
        ficha.caracterizacaoImovel.areaTerreno
      );
      setValue(
        "caracterizacaoImovel.dataInclusao",
        new Date(ficha.caracterizacaoImovel.dataInclusao)
      );
      setValue(
        "caracterizacaoImovel.fracaoIdeal",
        ficha.caracterizacaoImovel.fracaoIdeal
      );
      setValue("caracterizacaoImovel.lote", ficha.caracterizacaoImovel.lote);
      setValue(
        "caracterizacaoImovel.quadra",
        ficha.caracterizacaoImovel.quadra
      );
      setValue("caracterizacaoImovel.setor", ficha.caracterizacaoImovel.setor);
      setValue(
        "caracterizacaoImovel.testadaPrincipal",
        ficha.caracterizacaoImovel.testadaPrincipal
      );
      setValue(
        "caracterizacaoImovel.unidade",
        ficha.caracterizacaoImovel.unidade
      );
    }

    if (ficha?.georreferenciamento) {
      setValue(
        "georreferenciamento.geoJson.geometry",
        ficha.georreferenciamento.geoJson.geometry as any
      );
    }

    trigger();
  }, [ficha, setValue, trigger]);

  const onSubmit: SubmitHandler<imovelFormData> = async (data) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    console.log(formData);
    setLoading(true);
    await handleNextStep(municipio, ficha.processo.id);
  };

  const consultarCep = async (value: string) => {
    setLoadingCep(true);

    try {
      const cep = value.replace(/\D/g, "");
      if (cep.length < 8) {
        return;
      }

      const response = await getCep(cep);
      const { logradouro, bairro, municipio, error } = response.data;

      if (error) {
        toast({
          description: "CEP não encontrado",
          variant: "destructive",
        });
        return;
      }

      setValue(`informacaoImovel.endereco.logradouro`, logradouro);
      setValue(`informacaoImovel.endereco.bairro`, bairro);
      setValue(`informacaoImovel.endereco.idMunicipio`, municipio.id);
      setValue(`informacaoImovel.endereco.nomeMunicipio`, municipio.nome);
      setValue(`informacaoImovel.endereco.siglaUf`, municipio.estado.uf);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;

      toast({
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoadingCep(false);
    }
  };

  const handleEditarInformacaoImovel = () => {
    setEditarInformacaoImovel(!editarInformacaoImovel);
  };

  const handleEditarCaracterizacaoImovel = () => {
    setEditarCaracterizacaoImovel(!editarCaracterizacaoImovel);
  };

  return (
    <Form {...form}>
      <motion.div
        initial={{ y: -50, opacity: 0 }} //
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <fieldset className="bg-white border border-input rounded-2xl p-6 space-y-4 relative z-10">
            <h2 className="text-xl font-medium">Georeferenciamento</h2>

            <Mapa />
          </fieldset>

          <fieldset className="bg-white border border-input rounded-2xl p-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl font-medium">Informações do imóvel</h2>
                <p>
                  Informe todos os dados para continuar o processo de
                  cadastramento de imóvel.
                </p>
              </div>

              <Button
                type="button"
                variant="no-style"
                size="no-style"
                onClick={() => handleEditarInformacaoImovel()}
                className="text-lg inline-flex items-center gap-2"
              >
                <LucidePenSquare size={20} />
                Editar
              </Button>
            </div>

            <div className="space-y-6 mt-6">
              <div className="flex items-start gap-6 flex-col md:flex-row">
                <FormField
                  control={form.control}
                  name="informacaoImovel.tipoUso.id"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[35%]">
                      <FormLabel>Tipo de grupo ou ocupação/uso*</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger {...field}>
                            <SelectValue
                              placeholder={
                                grupos.find(
                                  (grupo) => String(grupo.id) === field.value
                                )?.nome || ""
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {grupos.map((grupo) => {
                              return (
                                <SelectItem
                                  value={String(grupo.id)}
                                  key={grupo.id}
                                >
                                  {grupo.nome}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="informacaoImovel.endereco.cep"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[30%] relative">
                      <FormLabel>CEP*</FormLabel>
                      <FormControl>
                        <InputMask
                          mask="99999-999"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                            consultarCep(e.target.value);
                          }}
                          disabled={editarInformacaoImovel}
                        >
                          {(inputProps: InputProps) => (
                            <Input
                              type="tel"
                              {...inputProps}
                              disabled={editarInformacaoImovel}
                            />
                          )}
                        </InputMask>
                      </FormControl>
                      {loadingCep ? (
                        <Loader className="absolute w-4 h-4 right-2.5 top-8" />
                      ) : (
                        ""
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="informacaoImovel.endereco.logradouro"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[35%]">
                      <FormLabel>Endereço*</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          disabled={editarInformacaoImovel}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-start gap-6 flex-col md:flex-row">
                <FormField
                  control={form.control}
                  name="informacaoImovel.endereco.numero"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/4">
                      <FormLabel>Número*</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          {...field}
                          disabled={editarInformacaoImovel}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="informacaoImovel.endereco.complemento"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/4">
                      <FormLabel>Complemento</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          disabled={editarInformacaoImovel}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="informacaoImovel.endereco.bairro"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/4">
                      <FormLabel>Bairro*</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          disabled={editarInformacaoImovel}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`informacaoImovel.endereco.siglaUf`}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/4">
                      <FormLabel>UF*</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={editarInformacaoImovel}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={field.value || "Selecione um estado"}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {estados.map((estado) => (
                            <SelectItem key={estado.id} value={estado.uf}>
                              {estado.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="informacaoImovel.endereco.nomeMunicipio"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[35%]">
                      <FormLabel>Cidade*</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          disabled={editarInformacaoImovel}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="bg-white border border-input rounded-2xl p-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl font-medium">
                  Caracterização do imóvel
                </h2>
                <p>
                  Informe todos os dados para continuar o processo de
                  cadastramento de imóvel.
                </p>
              </div>

              <Button
                type="button"
                variant="no-style"
                size="no-style"
                onClick={() => handleEditarCaracterizacaoImovel()}
                className="text-lg inline-flex items-center gap-2"
              >
                <LucidePenSquare size={20} />
                Editar
              </Button>
            </div>

            <div className="space-y-6 mt-6">
              <div className="flex items-start gap-6 flex-col md:flex-row">
                <FormField
                  control={form.control}
                  name="caracterizacaoImovel.setor"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/3">
                      <FormLabel>Setor*</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          disabled={editarCaracterizacaoImovel}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="caracterizacaoImovel.quadra"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/3">
                      <FormLabel>Quadra*</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          disabled={editarCaracterizacaoImovel}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="caracterizacaoImovel.lote"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/3">
                      <FormLabel>Lote*</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          disabled={editarCaracterizacaoImovel}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-start gap-6 flex-col md:flex-row">
                <FormField
                  control={form.control}
                  name="caracterizacaoImovel.unidade"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Unidade</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          disabled={editarCaracterizacaoImovel}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="caracterizacaoImovel.areaTerreno"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/4">
                      <FormLabel>Área do terreno*</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          disabled={editarCaracterizacaoImovel}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="caracterizacaoImovel.testadaPrincipal"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/4">
                      <FormLabel>Testada principal*</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          disabled={editarCaracterizacaoImovel}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-start gap-6 flex-col md:flex-row">
                <FormField
                  control={form.control}
                  name="caracterizacaoImovel.fracaoIdeal"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Fração ideal</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          disabled={editarCaracterizacaoImovel}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="caracterizacaoImovel.dataInclusao"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-2/5">
                      <FormLabel>Data de inclusão*</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className="h-8 w-full rounded-3xl border border-input px-3 py-2 text-sm justify-start bg-transparent disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-transparent"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP", { locale: ptBR })
                              ) : (
                                <span>Selecione a data</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </fieldset>

          <div className="flex justify-between items-center flex-wrap gap-4">
            <Button
              type="button"
              onClick={async () =>
                await handlePreviousStep(municipio, ficha.processo.id)
              }
              variant="secondary"
            >
              Voltar
            </Button>

            <Button
              type="submit"
              disabled={!isValid}
              className={`w-40 h-10 ${loading ? "pointer-events-none" : ""}`}
            >
              {loading ? <Loader /> : "Avançar"}
            </Button>
          </div>
        </form>
      </motion.div>
    </Form>
  );
}

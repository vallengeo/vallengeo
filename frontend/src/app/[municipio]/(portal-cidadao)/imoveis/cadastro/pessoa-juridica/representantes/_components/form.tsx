"use client";

import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  dadosEmpresaSchema,
  dadosEmpresaData,
} from "@/validation/imovel/representante-pj";
import { useFormState } from "@/contexts/formCadastroPJContext";
import { Form } from "@/components/ui/form";
import { useFieldArray } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { getCep } from "@/service/localidadeService";
import { handleNextStep } from "./navigate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { X as LucideX } from "lucide-react";
import { Aviso } from "../../../_components/aviso";
import { useToast } from "@/components/ui/use-toast";
import InputMask from "react-input-mask";
import IEstados from "@/interfaces/Localidade/IEstado";
import { useState } from "react";
import { motion } from "motion/react";
import { Loader } from "@/components/loader";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

interface FormCadastroRepresentantesProps {
  estados: IEstados[];
}

export function FormCadastroRepresentantes({
  estados,
}: FormCadastroRepresentantesProps) {
  const pathname = usePathname();
  const municipio = pathname.split("/")[1];

  const { toast } = useToast();
  const { formData, setFormData } = useFormState();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCep, setLoadingCep] = useState<boolean>(false);
  const [loadingCepResponsavel, setLoadingCepResponsavel] =
    useState<boolean>(false);

  const form = useForm<dadosEmpresaData>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(dadosEmpresaSchema),
    defaultValues: formData,
  });

  const {
    control,
    setValue,
    watch,
    formState: { errors, isValid },
  } = form;

  const onSubmit: SubmitHandler<dadosEmpresaData> = async (data) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    setLoading(true);
    await handleNextStep(municipio);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "representantes",
  });

  const consultarCep = async (index: number, value: string) => {
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

      setValue(`representantes.${index}.endereco.logradouro`, logradouro);
      setValue(`representantes.${index}.endereco.bairro`, bairro);
      setValue(`representantes.${index}.endereco.municipio.id`, municipio.id);
      setValue(
        `representantes.${index}.endereco.municipio.nome`,
        municipio.nome
      );
      setValue(
        `representantes.${index}.endereco.municipio.estado.id`,
        municipio.estado.id
      );
      setValue(
        `representantes.${index}.endereco.municipio.estado.nome`,
        municipio.estado.nome
      );
      setValue(
        `representantes.${index}.endereco.municipio.estado.uf`,
        municipio.estado.uf
      );
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

  const consultarCepResponsavel = async (value: string) => {
    setLoadingCepResponsavel(true);

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

      // setValue(`responsavel.endereco.logradouro`, logradouro);
      // setValue(`responsavel.endereco.bairro`, bairro);
      // setValue(`responsavel.endereco.municipio.id`, municipio.id);
      // setValue(`responsavel.endereco.municipio.nome`, municipio.nome);
      // setValue(`responsavel.endereco.municipio.estado.id`, municipio.estado.id);
      // setValue(
      //   `responsavel.endereco.municipio.estado.nome`,
      //   municipio.estado.nome
      // );
      // setValue(`responsavel.endereco.municipio.estado.uf`, municipio.estado.uf);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;

      toast({
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoadingCepResponsavel(false);
    }
  };

  return (
    <Form {...form}>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            {!isValid ? (
              <Aviso
                type="info"
                message="Para continuar declarando o imóvel, é necessário inserir pelo menos um representante e informar o contato responsável."
                size={24}
                className="justify-center"
              />
            ) : (
              ""
            )}
          </div>

          <div className="flex justify-end mt-6">
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

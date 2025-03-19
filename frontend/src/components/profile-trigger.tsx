"use client";

import { useState, useEffect } from "react";
import { Avatar } from "./avatar";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN, PESSOA_ID } from "@/constants/auth";
import IPessoa from "@/interfaces/Pessoa/IPessoa";
import { buscarPessoaPorId } from "@/service/pessoa";

interface ProfileProps {
  cargo?: string;
  className?: string;
}

export function ProfileTrigger({
  cargo = "Cidadão",
  className = "",
}: ProfileProps) {
  const [pessoa, setPessoa] = useState<IPessoa>();

  useEffect(() => {
    const fetchLoadPessoa = async () => {
      try {
        // const pessoaId = Cookies.get(PESSOA_ID);
        const token = Cookies.get(ACCESS_TOKEN);
        const pessoaId = "bc517475-2c86-48b2-bd98-1e3e8626d039";

        if (!token) {
          throw new Error("Token não encontrado");
        }

        if (!pessoaId) {
          throw new Error(
            "Usuário não identificado. Faça login novamente e tente outra vez."
          );
        }

        const response = await buscarPessoaPorId(pessoaId, token);
        setPessoa(response);
      } catch (error: any) {
        console.log("Ocorreu um erro ao buscar o usuário:", error);
      }
    };

    fetchLoadPessoa();
  }, []);

  return (
    <div
      className={cn("flex justify-center items-center space-x-1", className)}
    >
      <Avatar nome={pessoa?.nome} width={32} height={30} />
      <div className="flex flex-col text-white text-left">
        <strong className="text-xs line-clamp-1">{pessoa?.nome}</strong>
        <span className="text-[0.625rem]">{cargo}</span>
      </div>
    </div>
  );
}

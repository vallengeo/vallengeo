"use client";

import { useState } from "react";
import { Pagination } from "@/components/pagination";
import IPessoa from "@/interfaces/Pessoa/IPessoa";

interface PessoasProps {
  listarPessoas: IPessoa[];
}

export function Pessoas({ listarPessoas }: PessoasProps) {
  const itemsPerPage = 1;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pessoas = listarPessoas;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pessoas.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(pessoas.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="space-y-10 relative">
      <h2 className="font-medium text-xl">Perfil de usuário</h2>

      {currentItems.map((pessoa) => (
        <div key={pessoa.id}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 pb-6">
            <div className="flex flex-col">
              <span className="font-medium text-sm">Nome Completo</span>
              <span>
                {pessoa?.responsavel?.nome ?? pessoa.nome}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">CPF</span>
              <span>
                {pessoa?.responsavel?.cpf ?? pessoa.cpf}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">RG</span>
              <span>{pessoa?.responsavel?.rg ?? pessoa.rg}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">E-mail</span>
              <span className="break-words">{pessoa.email}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">CEP</span>
              <span>{pessoa.endereco.cep}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">Endereço</span>
              <span>{pessoa.endereco.logradouro}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">Número</span>
              <span>{pessoa.endereco.numero}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">Complemento</span>
              <span>{pessoa.endereco.complemento ?? "-"}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">Bairro</span>
              <span>{pessoa.endereco.bairro}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">Cidade</span>
              <span>{pessoa.endereco.municipio.nome}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">Estado</span>
              <span>{pessoa.endereco.municipio.estado.nome}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">Telefone</span>
              <span>{pessoa.telefone}</span>
            </div>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
          className="absolute m-0 right-0 bottom-0 justify-normal w-fit"
        />
      )}
    </div>
  );
}

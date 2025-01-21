"use client";

import { useState } from "react";
import { Pagination } from "@/components/pagination";
import IFicha from "@/interfaces/Analista/IFicha";

interface RepresentantesImovelProps {
  ficha: IFicha;
}

export function RepresentantesImovel({ ficha }: RepresentantesImovelProps) {
  const itemsPerPage = 1;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const representantes = ficha.representantes;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = representantes.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(representantes.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white border border-input rounded-3xl px-8 py-6 relative">
      <h2 className="text-xl font-medium mb-6">Representante do imóvel</h2>

      {currentItems.map((representante) => (
        <div key={representante.id} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
            <div className="flex flex-col">
              <span className="font-medium text-sm">Nome Completo</span>
              <span>{representante.nome}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">CPF</span>
              <span>{representante.cpf}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">RG</span>
              <span>{representante.rg}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">E-mail</span>
              <span className="break-words">{representante.email}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">CEP</span>
              <span>{representante.endereco.cep}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">Endereço</span>
              <span>{representante.endereco.logradouro}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">Número</span>
              <span>{representante.endereco.numero}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">Complemento</span>
              <span>{representante.endereco.complemento ?? "-"}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">Bairro</span>
              <span>{representante.endereco.bairro}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">Cidade</span>
              <span>{representante.endereco.municipio.nome}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">Estado</span>
              <span>{representante.endereco.municipio.estado.nome}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">Telefone</span>
              <span>{representante.telefone}</span>
            </div>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
          className="absolute m-0 right-6 top-6 justify-normal w-fit"
        />
      )}
    </div>
  );
}

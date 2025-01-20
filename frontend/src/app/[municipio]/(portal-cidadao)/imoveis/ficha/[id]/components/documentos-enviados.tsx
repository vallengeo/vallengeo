"use client";

import IFicha from "@/interfaces/Analista/IFicha";
import { Download } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ITipoDocumento from "@/interfaces/ITipoDocumento";
import { tipoDocumento } from "@/service/documentoService";

interface DocumentosProps {
  ficha: IFicha;
}

export function DocumentosEnviados({ ficha }: DocumentosProps) {
  const documentosEnviados = ficha.documentosEnviados;

  const [tipoDocumentos, setTipoDocumentos] = useState<ITipoDocumento[]>([]);

  useEffect(() => {
    const fetchDocumentos = async () => {
      try {
        const response = await tipoDocumento();
        setTipoDocumentos(response.data);
      } catch (error) {
        console.error("Erro ao buscar documentos:", error);
      }
    };

    fetchDocumentos();
  }, []);

  return (
    <div className="bg-white border border-input rounded-3xl px-8 py-6 space-y-6">
      <h2 className="text-xl font-medium">Documentos enviados</h2>

      <div>
        {documentosEnviados.length > 0 ? (
          <>
            {documentosEnviados.map((doc) => (
              <Link
                key={doc.id}
                href={`/imoveis/downloads/`}
                download
                className="flex items-center justify-between bg-[#FDFDFD] hover:bg-muted border border-[#F0F0F0] rounded-2xl py-3 px-6 transition-colors"
              >
                <span>{doc.titulo}</span>
                <Download />
              </Link>
            ))}
          </>
        ) : (
          <div className="flex items-center justify-between flex-wrap gap-6">
            <p>Nenhum documento enviado</p>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Enviar documentos</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[1300px] sm:h-[90vh]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-medium">
                    Enviar documentos
                  </DialogTitle>
                  <DialogDescription className="text-foreground">
                    Anexe os documentos no campo abaixo
                  </DialogDescription>
                </DialogHeader>

                <div className="pb-6 px-6 space-y-8">
                  <h2 className="text-xl font-medium">Documentos enviados</h2>

                  <form className="space-y-4">
                    {tipoDocumentos.map((tipoDoc) => {
                      return (
                        <div key={tipoDoc.id}>
                          <Button
                            type="button"
                            className="flex items-center justify-between bg-[#FDFDFD] hover:bg-muted/50 text-sm font-normal transition-colors border border-[#F0F0F0] rounded-2xl py-2.5 px-6 w-full hover:text-foreground hover:shadow-none h-auto text-left gap-6"
                          >
                            <span>{tipoDoc.titulo}</span>
                            <Download size={20} className="flex-shrink-0" />
                          </Button>
                        </div>
                      );
                    })}
                  </form>

                  <div className="text-end">
                    <Button type="submit">Finalizar</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}

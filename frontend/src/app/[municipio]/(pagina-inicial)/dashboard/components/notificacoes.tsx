 "use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import INotificacaoNaoVisualizada from "@/interfaces/Analista/INotificacaoNaoVisualizada";
import {
  notificacaoNaoVisualizada,
  notificacaoVisualizada,
} from "@/service/analista/analistaService";
import { Bell, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

export function Notificacoes() {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const idMunicipio = pathname.split("/")[1] || "";

  const [notificacoes, setNotificacoes] = useState<
    INotificacaoNaoVisualizada[]
  >([]);

  useEffect(() => {
    const fetchNotificacoesNaoVisualizadas = async () => {
      try {
        const response = await notificacaoNaoVisualizada();
        setNotificacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
        setNotificacoes([]);
      }
    };

    fetchNotificacoesNaoVisualizadas();
  }, []);

  const handleVisualizarNotificacao =
    (notificacaoId: number, inscricaoImobiliaria: string) => async () => {
      try {
        await notificacaoVisualizada(notificacaoId);

        toast({
          description: "Notificação marcada como lida.",
        });

        router.push(
          `/${idMunicipio}/dashboard/imoveis/ficha/${inscricaoImobiliaria}`
        );
      } catch (error) {
        console.error("Erro ao marcar notificação como visualizada:", error);
      }
    };

  return (
    <>
      {notificacoes.length > 0 ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={`no-style`}
              size={`no-style`}
              className="flex items-center justify-center text-left gap-6 bg-white hover:bg-[#FDFDFD] border border-input rounded-3xl py-14 px-6 transition-colors text-base w-full md:max-w-[380px]"
            >
              <div className="flex items-center justify-center flex-[0_0_auto] bg-primary w-11 h-11 rounded-full">
                <Bell />
              </div>

              <p>
                Enquanto esteve fora houveram{" "}
                <strong>{notificacoes.length} novidades</strong> na plataforma.
              </p>

              <ChevronRight
                size={40}
                strokeWidth={1}
                className="text-primary flex-[0_0_auto]"
              />
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[1186px] bg-[#FCFCFC]">
            <DialogHeader>
              <DialogTitle className="text-[2rem] font-semibold">
                Notificações
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-2 px-6 pb-6">
              {notificacoes.map((notificacao) => {
                return (
                  <Button
                    key={notificacao.id}
                    type="button"
                    onClick={handleVisualizarNotificacao(
                      notificacao.id,
                      notificacao.idProcesso
                    )}
                    className="flex items-center justify-between bg-[#FDFDFD] hover:bg-muted/50 text-sm font-normal transition-colors border border-[#F0F0F0] rounded-2xl py-2.5 px-4 w-full hover:text-foreground hover:shadow-none h-auto text-left gap-6"
                  >
                    <p>
                      Nova atualização na inscrição imobiliária{" "}
                      <strong>{`${notificacao.inscricaoImobiliaria}`}</strong>.
                      Acesse ao lado para ser redirecionado ao imóvel.
                    </p>
                    <ChevronRight className="text-primary flex-shrink-0" />
                  </Button>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="flex items-center justify-center text-left gap-6 bg-white hover:bg-[#FDFDFD] border border-input rounded-3xl py-14 px-6 transition-colors text-base w-full md:max-w-[380px]">
          <div className="flex items-center justify-center flex-[0_0_auto] bg-primary w-11 h-11 rounded-full">
            <Bell />
          </div>

          <p>
            <strong>Você está atualizado!</strong>
            <br />
            Nenhuma nova notificação por enquanto.
          </p>
        </div>
      )}
    </>
  );
}

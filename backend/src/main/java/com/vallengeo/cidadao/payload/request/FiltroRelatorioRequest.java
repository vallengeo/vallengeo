package com.vallengeo.cidadao.payload.request;

import com.vallengeo.cidadao.enumeration.SituacaoProcessoEnum;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public enum FiltroRelatorioRequest {
    ARQUIVADO {
        @Override
        public String descricao() {
            return "Arquivado";
        }

        @Override
        public List<Long> getStatus() {
            return List.of(SituacaoProcessoEnum.ARQUIVADO.getCodigo());
        }
    },
    EM_ANDAMENTO {
        @Override
        public String descricao() {
            return "Em andamento";
        }

        @Override
        public List<Long> getStatus() {
            return SituacaoProcessoEnum.emAndamento();
        }
    },
    FINALIZADO {
        @Override
        public String descricao() {
            return "Finalizado";
        }
        @Override
        public List<Long> getStatus() {
            return SituacaoProcessoEnum.finalizado();
        }
    },
    NOVO_IMOVEL {
        @Override
        public String descricao() {
            return "Novo imóvel";
        }
        @Override
        public LocalDate getData() {
            return LocalDate.now().minusDays(30);
        }
    };

    public List<Long> getStatus() {
        return new ArrayList<>();
    }

    public LocalDate getData() {
        return null;
    }
    public String descricao() { return null;}
}

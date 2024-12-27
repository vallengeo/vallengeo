package com.vallengeo.cidadao.payload.response;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import static com.vallengeo.core.config.Config.DATE_FORMAT_TIME_TABLE;

@Data
@Builder
public class ProcessoResponse implements Serializable {
    private UUID id;
    private String protocolo;
    private String Situacao;
    private LocalDateTime ultimaAtualizacao;

    public String getUltimaAtualizacaoFormatada() {
        if (this.ultimaAtualizacao != null) {
            return this.ultimaAtualizacao.format(DateTimeFormatter.ofPattern(DATE_FORMAT_TIME_TABLE));
        }
        return "-";
    }
}

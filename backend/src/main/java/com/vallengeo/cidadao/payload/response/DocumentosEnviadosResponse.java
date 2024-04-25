package com.vallengeo.cidadao.payload.response;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

import static com.vallengeo.core.config.Config.DATE_FORMAT_TIME_TABLE;

@Data
@Builder
public class DocumentosEnviadosResponse implements Serializable {
    private Long id;
    private String titulo;
    private List<Documento> documentos;

    @Data
    @Builder
    public static class Documento implements Serializable {
        private UUID id;
        private String nome;
        private String extensao;
        private float tamanho;
        private LocalDateTime dataEnvio;

        public String getDataEnvioFormatada() {
            if (this.dataEnvio != null) {
                return this.dataEnvio.format(DateTimeFormatter.ofPattern(DATE_FORMAT_TIME_TABLE));
            }
            return "-";
        }
    }
}
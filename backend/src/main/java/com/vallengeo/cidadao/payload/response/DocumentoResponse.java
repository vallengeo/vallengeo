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
public class DocumentoResponse implements Serializable {
    private UUID id;
    private String nome;

    private String extensao;

    private float tamanho;

    private LocalDateTime dataEnvio;

    private TipoDocumentoResponse tipoDocumento;

    public String getDataEnvioFormatada() {
        if (this.dataEnvio != null) {
            return this.dataEnvio.format(DateTimeFormatter.ofPattern(DATE_FORMAT_TIME_TABLE));
        }
        return "-";
    }

    public record TipoDocumentoResponse(Long id, String titulo)  implements Serializable {
    }
}

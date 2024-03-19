package com.vallengeo.cidadao.payload.response;

import lombok.Builder;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static com.vallengeo.core.config.Config.DATE_FORMAT_TIME_TABLE;

@Data
@Builder
public class DocumentoTemporarioResponse implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    private Long idTipoDocumento;
    private String nomeTemporario;
    private String nomeOriginal;
    private LocalDateTime dataEnvio;

    public String getDataEnvioFormatada () {
            if (this.dataEnvio != null) {
                return this.dataEnvio.format(DateTimeFormatter.ofPattern(DATE_FORMAT_TIME_TABLE));
            }
            return "-";
        }

}

package com.vallengeo.cidadao.payload.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;

@Data
public class DocumentoTemporarioRequest implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    @NotNull(message = CAMPO_OBRIGATORIO)
    private Long idTipoDocumento;
    @NotBlank(message = CAMPO_OBRIGATORIO)
    private String nomeTemporario;
    @NotBlank(message = CAMPO_OBRIGATORIO)
    private String nomeOriginal;
    @NotNull(message = CAMPO_OBRIGATORIO)
    private LocalDateTime dataEnvio;
}

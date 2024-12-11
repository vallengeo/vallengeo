package com.vallengeo.cidadao.payload.request;

import lombok.Builder;
import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;

@Data
@Builder
public class HistoricoAnotacaoConsideracaoTecnicaRequest implements Serializable {

    @Size(max = 255)
    private String titulo;
    @Size(max = 5000)
    private String descricao;
    @NotBlank(message = CAMPO_OBRIGATORIO)
    private UUID idProcesso;
    @Size(min = 1, message = CAMPO_OBRIGATORIO)
    @Valid
    private List<DocumentoTemporarioRequest> documentos;
}

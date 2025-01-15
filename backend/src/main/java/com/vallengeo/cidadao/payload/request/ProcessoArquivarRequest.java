package com.vallengeo.cidadao.payload.request;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;

@Data
public class ProcessoArquivarRequest implements Serializable {
    @Size(max = 255)
    private String titulo;
    @Size(max = 5000)
    private String descricao;
    @NotNull(message = CAMPO_OBRIGATORIO)
    private UUID idProcesso;
    @Size(min = 1, message = CAMPO_OBRIGATORIO)
    @Valid
    private List<DocumentoTemporarioRequest> documentos = new ArrayList<>();

}

package com.vallengeo.cidadao.payload.request;

import lombok.Data;
import lombok.experimental.SuperBuilder;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.UUID;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;

@Data
public class ProcessoObservacaoRequest implements Serializable {
    @Size(max = 255)
    @NotNull(message = CAMPO_OBRIGATORIO)
    private String titulo;
    @Size(max = 5000)
    @NotNull(message = CAMPO_OBRIGATORIO)
    private String descricao;
    @NotNull(message = CAMPO_OBRIGATORIO)
    private UUID idProcesso;
}

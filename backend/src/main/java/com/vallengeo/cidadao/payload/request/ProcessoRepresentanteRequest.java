package com.vallengeo.cidadao.payload.request;

import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;

@Data
public class ProcessoRepresentanteRequest implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    @NotBlank(message = CAMPO_OBRIGATORIO)
    private String idGrupo;

    @Size(min = 1, message = CAMPO_OBRIGATORIO)
    @Valid
    private List<ResponsavelTecnicoRequest> responsaveisTecnicos = new ArrayList<>();
}

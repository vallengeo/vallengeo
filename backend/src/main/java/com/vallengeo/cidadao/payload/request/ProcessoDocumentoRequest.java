package com.vallengeo.cidadao.payload.request;

import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;

@Data
public class ProcessoDocumentoRequest implements Serializable {
    @NotBlank(message = CAMPO_OBRIGATORIO)
    private String idProcesso;
    @Size(min = 1, message = CAMPO_OBRIGATORIO)
    @Valid
    private List<DocumentoTemporarioRequest> documentos = new ArrayList<>();
}

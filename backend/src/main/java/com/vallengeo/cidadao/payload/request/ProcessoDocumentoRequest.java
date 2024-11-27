package com.vallengeo.cidadao.payload.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProcessoDocumentoRequest implements Serializable {
    @NotBlank(message = CAMPO_OBRIGATORIO)
    private String idProcesso;
    @Size(min = 1, message = CAMPO_OBRIGATORIO)
    @Valid
    private List<DocumentoTemporarioRequest> documentos = new ArrayList<>();
}

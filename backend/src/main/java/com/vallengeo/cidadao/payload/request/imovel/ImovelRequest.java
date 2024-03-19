package com.vallengeo.cidadao.payload.request.imovel;

import com.vallengeo.cidadao.model.CaracterizacaoImovel;
import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;

@Data
public class ImovelRequest implements Serializable {
    @Valid
    @Size(min = 1, message = CAMPO_OBRIGATORIO)
    private List<RepresentanteRequest> representantes = new ArrayList<>();
    @Valid
    @NotNull(message = CAMPO_OBRIGATORIO)
    private InformacaoImovelRequest informacaoImovel;
    @Valid
    @NotNull(message = CAMPO_OBRIGATORIO)
    private CaracterizacaoImovelRequest caracterizacaoImovel;

}

package com.vallengeo.portal.payload.request.usuario;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;

@Getter
@Setter
public class RedefinirSenhaRequest {
    @NotEmpty(message = CAMPO_OBRIGATORIO)
    private String senha;

    @NotEmpty(message = CAMPO_OBRIGATORIO)
    private String confirmacaoSenha;

    @NotEmpty(message = CAMPO_OBRIGATORIO)
    private String codigoAcesso;

    public boolean isSenhasIguais() {
        return senha != null && senha.equals(confirmacaoSenha);
    }
}

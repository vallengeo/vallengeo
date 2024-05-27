package com.vallengeo.portal.payload.request.usuario;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;

public record CadastroRequest(
        @NotEmpty(message = CAMPO_OBRIGATORIO) String email,
        @NotNull(message = CAMPO_OBRIGATORIO) @Valid @Size(min = 1, message = CAMPO_OBRIGATORIO) List<CadastroSimplificadoRequest.Perfil> perfis,
        @NotNull(message = CAMPO_OBRIGATORIO) @Valid @Size(min = 1, message = CAMPO_OBRIGATORIO) List<CadastroSimplificadoRequest.Grupo> grupos,
        @NotNull(message = CAMPO_OBRIGATORIO) @Valid @Size(min = 1, message = CAMPO_OBRIGATORIO)  List<Tela> telas,
        @NotEmpty(message = CAMPO_OBRIGATORIO) String modulo
) {
    public record Tela(
            @NotEmpty(message = CAMPO_OBRIGATORIO) String id,
            @NotNull(message = CAMPO_OBRIGATORIO) @Valid @Size(min = 1, message = CAMPO_OBRIGATORIO) List<Permissao> permissoes
    ) {

    }

    public record Permissao(String codigo) {

    }
}
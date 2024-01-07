package com.vallengeo.portal.payload.request.usuario;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;

public record CadastroSimplificadoRequest(@NotEmpty(message = CAMPO_OBRIGATORIO) String email,
                                          @NotNull(message = CAMPO_OBRIGATORIO) @Valid @Size(min = 1, message = CAMPO_OBRIGATORIO) List<Perfil> perfis,
                                          @NotNull(message = CAMPO_OBRIGATORIO) @Valid @Size(min = 1, message = CAMPO_OBRIGATORIO) List<Grupo> grupos,
                                          @NotEmpty(message = CAMPO_OBRIGATORIO) String modulo) {
    public record Perfil(String id) {
    }

    public record Grupo(String id) {
    }
}

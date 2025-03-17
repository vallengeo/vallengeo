package com.vallengeo.portal.payload.response;

import java.util.List;

public record UsuarioResponse(
        String id,
        String email,
        Boolean ativo,
        List<Perfil> perfis,
        List<Grupo> grupos,
        List<Tela> telas,
        PessoaResponse pessoa
) {

    public record Perfil(String codigo) {
    }

    public record Grupo(String codigo) {
    }
    public record Tela(String codigo, List<Permissao> permissoes) {
    }

    public record Permissao(String codigo) {
    }
}
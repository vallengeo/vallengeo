package com.vallengeo.utils;

import com.vallengeo.portal.model.Tela;
import com.vallengeo.portal.model.Usuario;
import com.vallengeo.portal.payload.request.usuario.CadastroRequest;
import com.vallengeo.portal.payload.request.usuario.CadastroSimplificadoRequest;

import java.util.List;
import java.util.UUID;

public class UsuarioTestUtils {
    public static final String DEFAULT_PASSWORD = "vallengeo@123";
    public static final Integer MUNICIPIO_ID = 3513405;
    public static final UUID GRUPO_ID = UUID.fromString("4d3c1497-af40-4ddf-8b06-d8f40c8df139");
    public static final String DEFAULT_DEV_EMAIL = "vallengeo.dev@gmail.com";
    public static final String EMAIL_SEM_PERFIL = "vallengeo.semperfil@gmail.com";
    public static final String DEFAULT_DEV_PASSWORD = "123456";

    public static List<CadastroSimplificadoRequest.Grupo> getGruposFromEntity(Usuario usuario) {
        return  usuario.getGrupos().stream().map(
                grupo -> new CadastroSimplificadoRequest.Grupo( grupo.getId().toString() )
        ).toList();
    }

    public static List<CadastroSimplificadoRequest.Perfil> getPerfisFromEntity(Usuario usuario) {
        return  usuario.getPerfis().stream().map(
                perfil -> new CadastroSimplificadoRequest.Perfil( perfil.getId().toString() )
        ).toList();
    }

    public static List<CadastroRequest.Tela> getTelasFromEntity(Usuario usuario) {
        return usuario.getPermissoes().stream().map(
                permissao -> new CadastroRequest.Tela(
                        permissao.getTela().getId().toString(),
                        getTelaPermissoes(permissao.getTela())
                )).toList();
    }

    public static List<CadastroRequest.Permissao> getTelaPermissoes(Tela tela) {
        return tela.getPermissoes().stream().map(
                permissao -> new CadastroRequest.Permissao(permissao.getCodigo())
        ).toList();
    }
}


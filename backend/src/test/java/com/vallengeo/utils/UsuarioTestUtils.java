package com.vallengeo.utils;

import com.vallengeo.portal.model.Tela;
import com.vallengeo.portal.model.Usuario;
import com.vallengeo.portal.payload.request.usuario.CadastroRequest;
import com.vallengeo.portal.payload.request.usuario.CadastroSimplificadoRequest;

import java.util.List;

public class UsuarioTestUtils {
    public static final String DEFAULT_PASSWORD = "vallengeo@123";

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


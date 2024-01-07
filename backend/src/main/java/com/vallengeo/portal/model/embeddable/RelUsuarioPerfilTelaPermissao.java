package com.vallengeo.portal.model.embeddable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RelUsuarioPerfilTelaPermissao implements Serializable {
    @Column(name = "id_usuario")
    private UUID idUsuario;

    @Column(name = "id_perfil")
    private UUID idPerfil;

    @Column(name = "id_tela")
    private UUID idTela;

    @Column(name = "codigo_permissao")
    private String codigoPermissao;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RelUsuarioPerfilTelaPermissao that)) return false;
        return Objects.equals(idUsuario, that.idUsuario) && Objects.equals(idPerfil, that.idPerfil) && Objects.equals(idTela, that.idTela) && Objects.equals(codigoPermissao, that.codigoPermissao);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idUsuario, idPerfil, idTela, codigoPermissao);
    }
}

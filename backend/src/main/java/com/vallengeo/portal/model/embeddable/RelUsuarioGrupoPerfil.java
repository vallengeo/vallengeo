package com.vallengeo.portal.model.embeddable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
public class RelUsuarioGrupoPerfil implements Serializable {
    @Column(name = "id_usuario")
    private UUID idUsuario;
    @Column(name = "id_grupo")
    private UUID idGrupo;
    @Column(name = "id_perfil")
    private UUID id_perfil;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RelUsuarioGrupoPerfil that)) return false;
        return Objects.equals(idUsuario, that.idUsuario) && Objects.equals(idGrupo, that.idGrupo) && Objects.equals(id_perfil, that.id_perfil);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idUsuario, idGrupo, id_perfil);
    }
}

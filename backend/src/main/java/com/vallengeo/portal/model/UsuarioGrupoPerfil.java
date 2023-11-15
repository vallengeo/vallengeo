package com.vallengeo.portal.model;

import com.vallengeo.core.util.Schema;
import com.vallengeo.portal.model.embeddable.RelUsuarioGrupoPerfil;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(schema = Schema.PORTAL_SEGURANCA, name = "usuario_grupo_perfil")
public class UsuarioGrupoPerfil {

    @EmbeddedId
    private RelUsuarioGrupoPerfil usuarioGrupoPerfil;

    @ManyToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id", insertable = false, updatable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_grupo", referencedColumnName = "id", insertable = false, updatable = false)
    private Grupo grupo;

    @ManyToOne
    @JoinColumn(name = "id_perfil", referencedColumnName = "id", insertable = false, updatable = false)
    private Perfil perfil;
}

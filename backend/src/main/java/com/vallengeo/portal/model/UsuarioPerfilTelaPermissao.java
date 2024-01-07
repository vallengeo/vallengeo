package com.vallengeo.portal.model;

import com.vallengeo.core.util.Schemas;
import com.vallengeo.portal.model.embeddable.RelUsuarioPerfilTelaPermissao;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(schema = Schemas.PORTAL_SEGURANCA, name = "usuario_perfil_tela_permissao")
public class UsuarioPerfilTelaPermissao {

    @EmbeddedId
    private RelUsuarioPerfilTelaPermissao relUsuarioPerfilTelaPermissao;
    @ManyToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id", insertable = false, updatable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_perfil", referencedColumnName = "id", insertable = false, updatable = false)
    private Perfil perfil;

    @ManyToOne
    @JoinColumn(name = "id_tela", referencedColumnName = "id", insertable = false, updatable = false)
    private Tela tela;

    @ManyToOne
    @JoinColumn(name = "codigo_permissao", referencedColumnName = "codigo", insertable = false, updatable = false)
    private Permissao permissao;
}


package com.vallengeo.cidadao.model;

import com.vallengeo.cidadao.model.embeddable.GrupoTipoDocumentoId;
import com.vallengeo.core.util.Schemas;
import com.vallengeo.portal.model.Grupo;
import lombok.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Table(schema = Schemas.CIDADAO, name = "rel_grupo_tipo_documento")
public class RelGrupoTipoDocumento implements Serializable {
    @EmbeddedId
    private GrupoTipoDocumentoId grupoTipoDocumento;

    @Column(name = "obrigatorio")
    private Boolean obrigatorio = true;

    @ManyToOne
    @JoinColumn(name = "id_grupo", referencedColumnName = "id", insertable = false, updatable = false)
    private Grupo grupo;

    @ManyToOne
    @JoinColumn(name = "id_tipo_documento", referencedColumnName = "id", insertable = false, updatable = false)
    private TipoDocumento tipoDocumento;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RelGrupoTipoDocumento that)) return false;
        return Objects.equals(grupoTipoDocumento, that.grupoTipoDocumento) && Objects.equals(obrigatorio, that.obrigatorio) && Objects.equals(grupo, that.grupo) && Objects.equals(tipoDocumento, that.tipoDocumento);
    }

    @Override
    public int hashCode() {
        return Objects.hash(grupoTipoDocumento, obrigatorio, grupo, tipoDocumento);
    }

    @Override
    public String toString() {
        return "RelGrupoTipoDocumento{" +
               "grupoTipoDocumento=" + grupoTipoDocumento +
               ", obrigatorio=" + obrigatorio +
               ", grupo=" + grupo +
               ", tipoDocumento=" + tipoDocumento +
               '}';
    }
}

package com.vallengeo.cidadao.model.embeddable;

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
public class GrupoTipoDocumentoId implements Serializable {
    @Column(name = "id_grupo")
    private UUID idGrupo;

    @Column(name = "id_tipo_documento")
    private Long idTipoDocumento;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof GrupoTipoDocumentoId that)) return false;
        return Objects.equals(idGrupo, that.idGrupo) && Objects.equals(idTipoDocumento, that.idTipoDocumento);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idGrupo, idTipoDocumento);
    }

    @Override
    public String toString() {
        return "GrupoTipoDocumentoId{" +
               "idGrupo=" + idGrupo +
               ", idTipoDocumento=" + idTipoDocumento +
               '}';
    }
}

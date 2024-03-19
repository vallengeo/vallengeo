package com.vallengeo.cidadao.model.embeddable;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProcessoResponsavelTecnicoId implements Serializable {
@Column(name = "id_processo")
private UUID idProcesso;
@Column(name = "id_responsavel_tecnico")
private UUID idResponsavelTecnico;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProcessoResponsavelTecnicoId that)) return false;
        return Objects.equals(idProcesso, that.idProcesso) && Objects.equals(idResponsavelTecnico, that.idResponsavelTecnico);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idProcesso, idResponsavelTecnico);
    }
}

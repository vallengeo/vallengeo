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
public class ProcessoSituacaoId implements Serializable {
@Column(name = "id_processo")
private UUID idProcesso;
@Column(name = "id_situacao_processo")
private Long idSituacaoProcesso;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProcessoSituacaoId that)) return false;
        return Objects.equals(idProcesso, that.idProcesso) && Objects.equals(idSituacaoProcesso, that.idSituacaoProcesso);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idProcesso, idSituacaoProcesso);
    }
}

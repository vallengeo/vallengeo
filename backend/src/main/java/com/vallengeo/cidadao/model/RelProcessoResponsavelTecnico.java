package com.vallengeo.cidadao.model;

import com.vallengeo.cidadao.model.embeddable.ProcessoResponsavelTecnicoId;
import com.vallengeo.core.util.Schemas;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(schema = Schemas.CIDADAO, name = "rel_processo_responsavel_tecnico")
public class RelProcessoResponsavelTecnico implements Serializable {
    @EmbeddedId
    private ProcessoResponsavelTecnicoId processoResponsavelTecnico;
    @Column(name = "vinculado")
    private Boolean vinculado;

    @Column(name = "data_acao")
    private LocalDateTime dataAcao;

    @ManyToOne
    @JoinColumn(name = "id_processo", referencedColumnName = "id", insertable = false, updatable = false)
    private Processo processo;

    @ManyToOne
    @JoinColumn(name = "id_responsavel_tecnico", referencedColumnName = "id", insertable = false, updatable = false)
    private ResponsavelTecnico responsavelTecnico;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RelProcessoResponsavelTecnico that)) return false;
        return Objects.equals(processoResponsavelTecnico, that.processo) && Objects.equals(vinculado, that.vinculado) && Objects.equals(dataAcao, that.dataAcao) && Objects.equals(processo, that.processo) && Objects.equals(responsavelTecnico, that.responsavelTecnico);
    }

    @Override
    public int hashCode() {
        return Objects.hash(processo, vinculado, dataAcao, processo, responsavelTecnico);
    }

    @Override
    public String toString() {
        return "RelProcessoResponsavelTecnico{" +
               "processoResponsavelTecnico=" + processoResponsavelTecnico +
               ", vinculado=" + vinculado +
               ", dataAcao=" + dataAcao +
               ", processo=" + processo +
               ", responsavelTecnico=" + responsavelTecnico +
               '}';
    }
}

package com.vallengeo.cidadao.model;

import com.vallengeo.cidadao.model.embeddable.ProcessoSituacaoId;
import com.vallengeo.core.util.Schemas;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(schema = Schemas.CIDADAO, name = "rel_processo_situacao_processo")
public class RelProcessoSituacaoProcesso implements Serializable {
@EmbeddedId
private ProcessoSituacaoId processoSituacao;

 @Column(name = "data_acao")
    private LocalDateTime dataAcao;

    @NotNull
    @Column(name = "ativo")
    private Boolean ativo;

    @ManyToOne
    @JoinColumn(name = "id_processo", referencedColumnName = "id",  insertable = false, updatable = false)
    private Processo processo;

    @ManyToOne
    @JoinColumn(name = "id_situacao_processo", referencedColumnName = "id", insertable = false, updatable = false)
    private SituacaoProcesso situacaoProcesso;

   @Override
   public boolean equals(Object o) {
      if (this == o) return true;
      if (!(o instanceof RelProcessoSituacaoProcesso that)) return false;
      return Objects.equals(processoSituacao, that.processoSituacao) && Objects.equals(dataAcao, that.dataAcao) && Objects.equals(ativo, that.ativo) && Objects.equals(processo, that.processo) && Objects.equals(situacaoProcesso, that.situacaoProcesso);
   }

   @Override
   public int hashCode() {
      return Objects.hash(processoSituacao, dataAcao, ativo, processo, situacaoProcesso);
   }

   @Override
   public String toString() {
      return "RelProcessoSituacaoProcesso{" +
             "processoSituacao=" + processoSituacao +
             ", dataAcao=" + dataAcao +
             ", ativo=" + ativo +
             ", processo=" + processo +
             ", situacaoProcesso=" + situacaoProcesso +
             '}';
   }
}

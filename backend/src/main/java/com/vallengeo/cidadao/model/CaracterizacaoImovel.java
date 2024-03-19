package com.vallengeo.cidadao.model;

import com.vallengeo.core.util.Schemas;
import lombok.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;
import static com.vallengeo.core.util.Constants.MAX_CARACTERES;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Table(schema = Schemas.CIDADAO, name = "caracterizacao_imovel")
public class CaracterizacaoImovel implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    private static final String SEQUENCE = Schemas.CIDADAO + ".caracterizacao_imovel_id_seq";
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQUENCE)
    @SequenceGenerator(name = SEQUENCE, sequenceName = SEQUENCE, allocationSize = 1)
    private Long id;
    @NotEmpty(message = CAMPO_OBRIGATORIO)
    @Size(max = 255, message = MAX_CARACTERES)
    @Column(name = "setor")
    private String setor;
    @NotEmpty(message = CAMPO_OBRIGATORIO)
    @Size(max = 255, message = MAX_CARACTERES)
    @Column(name = "quadra")
    private String quadra;
    @NotEmpty(message = CAMPO_OBRIGATORIO)
    @Size(max = 255, message = MAX_CARACTERES)
    @Column(name = "lote")
    private String lote;
    @Size(max = 255, message = MAX_CARACTERES)
    @Column(name = "unidade")
    private String unidade;
    @NotNull(message = CAMPO_OBRIGATORIO)
    @Column(name = "area_terreno")
    private Float areaTerreno;
    @NotNull(message = CAMPO_OBRIGATORIO)
    @Column(name = "testada_principal")
    private Float testadaPrincipal;
    @Column(name = "fracao_ideal")
    private Float fracaoIdeal;
    @NotNull(message = CAMPO_OBRIGATORIO)
    @Column(name = "data_inclusao")
    private Date dataInclusao;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CaracterizacaoImovel that)) return false;
        return Objects.equals(id, that.id) && Objects.equals(setor, that.setor) && Objects.equals(quadra, that.quadra) && Objects.equals(lote, that.lote) && Objects.equals(unidade, that.unidade) && Objects.equals(areaTerreno, that.areaTerreno) && Objects.equals(testadaPrincipal, that.testadaPrincipal) && Objects.equals(fracaoIdeal, that.fracaoIdeal) && Objects.equals(dataInclusao, that.dataInclusao);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, setor, quadra, lote, unidade, areaTerreno, testadaPrincipal, fracaoIdeal, dataInclusao);
    }

    @Override
    public String toString() {
        return "CaracterizacaoImovel{" +
               "id=" + id +
               ", setor='" + setor + '\'' +
               ", quadra='" + quadra + '\'' +
               ", lote='" + lote + '\'' +
               ", unidade='" + unidade + '\'' +
               ", areaTerreno=" + areaTerreno +
               ", testadaPrincipal=" + testadaPrincipal +
               ", fracaoIdeal=" + fracaoIdeal +
               ", dataInclusao=" + dataInclusao +
               '}';
    }
}

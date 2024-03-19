package com.vallengeo.cidadao.model;

import com.vallengeo.core.util.Schemas;
import com.vallengeo.global.model.Endereco;
import lombok.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Table(schema = Schemas.CIDADAO, name = "informacao_imovel")
public class InformacaoImovel implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    private static final String SEQUENCE = Schemas.CIDADAO + ".informacao_imovel_id_seq";
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQUENCE)
    @SequenceGenerator(name = SEQUENCE, sequenceName = SEQUENCE, allocationSize = 1)
    private Long id;
    @NotNull
    @OneToOne
    @JoinColumn(name = "id_tipo_uso", referencedColumnName = "id")
    private TipoUso tipoUso;
    @NotNull
    @OneToOne
    @JoinColumn(name = "id_endereco", referencedColumnName = "id")
    private Endereco endereco;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof InformacaoImovel that)) return false;
        return Objects.equals(id, that.id) && Objects.equals(tipoUso, that.tipoUso) && Objects.equals(endereco, that.endereco);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, tipoUso, endereco);
    }

    @Override
    public String toString() {
        return "InformacaoImovel{" +
               "id=" + id +
               ", tipoUso=" + tipoUso +
               ", endereco=" + endereco +
               '}';
    }
}

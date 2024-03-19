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
import java.util.Objects;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Table(schema = Schemas.CIDADAO, name = "tipo_uso")
public class TipoUso implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    private static final String SEQUENCE = Schemas.CIDADAO + ".tipo_uso_id_seq";
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQUENCE)
    @SequenceGenerator(name = SEQUENCE, sequenceName = SEQUENCE, allocationSize = 1)
    private Long id;

    @NotEmpty(message = CAMPO_OBRIGATORIO)
    @Size(max = 100)
    @Column(name = "nome")
    private String nome;
    @Column(name = "ativo")
    private Boolean ativo = true;
    @NotNull(message = CAMPO_OBRIGATORIO)
    @Column(name = "ordem")
    private Integer ordem;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TipoUso tipoUso)) return false;
        return Objects.equals(id, tipoUso.id) && Objects.equals(nome, tipoUso.nome) && Objects.equals(ativo, tipoUso.ativo) && Objects.equals(ordem, tipoUso.ordem);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nome, ativo, ordem);
    }

    @Override
    public String toString() {
        return "TipoUso{" +
               "id=" + id +
               ", nome='" + nome + '\'' +
               ", ativo=" + ativo +
               ", ordem=" + ordem +
               '}';
    }
}

package com.vallengeo.cidadao.model;

import com.vallengeo.core.util.Schemas;
import lombok.*;

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
@ToString
@Table(schema = Schemas.CIDADAO, name = "situacao_processo")
public class SituacaoProcesso implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    private static final String SEQUENCE = Schemas.CIDADAO + ".situacao_processo_id_seq";
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQUENCE)
    @SequenceGenerator(name = SEQUENCE, sequenceName = SEQUENCE, allocationSize = 1)
    private Long id;
    @NotEmpty(message = CAMPO_OBRIGATORIO)
    @Size(max = 80)
    private String codigo;
    @NotEmpty(message = CAMPO_OBRIGATORIO)
    @Size(max = 100)
    private String descricao;
    @NotNull(message = CAMPO_OBRIGATORIO)
    private Integer ordem;
    @Column(name = "ativo")
    private Boolean ativo = true;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SituacaoProcesso that)) return false;
        return Objects.equals(id, that.id) && Objects.equals(codigo, that.codigo) && Objects.equals(descricao, that.descricao) && Objects.equals(ordem, that.ordem) && Objects.equals(ativo, that.ativo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, codigo, descricao, ordem, ativo);
    }
}

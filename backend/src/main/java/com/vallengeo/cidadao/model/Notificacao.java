package com.vallengeo.cidadao.model;

import com.vallengeo.core.util.Schemas;
import lombok.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Table(schema = Schemas.CIDADAO, name = "notificacao")
public class Notificacao implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    private static final String SEQUENCE = Schemas.CIDADAO + ".notificacao_id_seq";
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQUENCE)
    @SequenceGenerator(name = SEQUENCE, sequenceName = SEQUENCE, allocationSize = 1)
    private Long id;

    @Column(name = "data_cadastro", nullable = false)
    private LocalDateTime dataCadastro;

    @NotNull
    @OneToOne
    @JoinColumn(name = "id_imovel", referencedColumnName = "id")
    private Imovel imovel;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Notificacao that)) return false;
        return Objects.equals(id, that.id) && Objects.equals(dataCadastro, that.dataCadastro) && Objects.equals(imovel, that.imovel);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, dataCadastro, imovel);
    }

    @Override
    public String toString() {
        return "Notificacao{" +
                "id=" + id +
                ", dataCadastro=" + dataCadastro +
                ", imovel=" + imovel +
                '}';
    }
}
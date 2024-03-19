package com.vallengeo.cidadao.model;

import com.vallengeo.core.util.Schemas;
import lombok.*;
import org.locationtech.jts.geom.Geometry;

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
@Table(schema = Schemas.CIDADAO, name = "georreferenciamento")
public class Georreferenciamento implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    private static final String SEQUENCE = Schemas.CIDADAO + ".georreferenciamento_id_seq";
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQUENCE)
    @SequenceGenerator(name = SEQUENCE, sequenceName = SEQUENCE, allocationSize = 1)
    private Long id;
    @NotNull
    private Geometry geometria;

    @NotNull
    @OneToOne
    @JoinColumn(name = "id_georreferenciamento", referencedColumnName = "id")
    private Imovel imovel;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Georreferenciamento that)) return false;
        return Objects.equals(id, that.id) && Objects.equals(geometria, that.geometria) && Objects.equals(imovel, that.imovel);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, geometria, imovel);
    }

    @Override
    public String toString() {
        return "Georreferenciamento{" +
               "id=" + id +
               ", geometria=" + geometria +
               ", imovel=" + imovel +
               '}';
    }
}

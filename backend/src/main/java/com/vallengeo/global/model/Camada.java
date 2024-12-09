package com.vallengeo.global.model;

import com.vallengeo.core.util.Schemas;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(schema = Schemas.DADO_GLOBAL, name = "camada")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Camada implements Serializable {
    private static final String SEQUENCE = Schemas.DADO_GLOBAL + ".camada_id_seq";
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQUENCE)
    @SequenceGenerator(name = SEQUENCE, sequenceName = SEQUENCE, allocationSize = 1)
    private Long id;
    @NotNull
    @Size(max = 200)
    @Column(name = "nome")
    private String nome;
    @NotNull
    @Size(max = 255)
    @Column(name = "codigo")
    private String codigo;
    @Column(name = "ordem")
    private Integer ordem;
    @Column(name = "cor_preenchimento")
    @Size(max = 30)
    private String corPreenchimento;
    @Column(name = "cor_borda")
    @Size(max = 30)
    private String corBorda;
    @Column(name = "referencia")
    @Size(max = 300)
    private String referencia;

    @ManyToOne
    @JoinColumn(name = "id_camada_categoria", referencedColumnName = "id", nullable = false)
    private CamadaCategoria categoria;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Camada camada)) return false;
        return Objects.equals(id, camada.id) && Objects.equals(nome, camada.nome) && Objects.equals(codigo, camada.codigo) && Objects.equals(ordem, camada.ordem) && Objects.equals(categoria, camada.categoria);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nome, codigo, ordem, categoria);
    }

    @Override
    public String toString() {
        return "Camada{" +
               "id=" + id +
               ", nome='" + nome + '\'' +
               ", codigo='" + codigo + '\'' +
               ", ordem=" + ordem +
               ", categoria=" + categoria +
               '}';
    }
}
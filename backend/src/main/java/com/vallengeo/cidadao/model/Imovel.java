package com.vallengeo.cidadao.model;

import com.vallengeo.core.util.Schemas;
import lombok.*;
import org.locationtech.jts.geom.Geometry;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(schema = Schemas.CIDADAO, name = "imovel")
public class Imovel implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    private static final String SEQUENCE = Schemas.CIDADAO + ".imovel_id_seq";
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQUENCE)
    @SequenceGenerator(name = SEQUENCE, sequenceName = SEQUENCE, allocationSize = 1)
    private Long id;
    @Column(name = "inscricao_imobiliaria", nullable = false)
    private String inscricaoImobiliaria;

    @NotNull
    @Column(name = "geometria", nullable = false)
    private Geometry geometria;

    @NotNull
    @OneToOne
    @JoinColumn(name = "id_processo", referencedColumnName = "id")
    private Processo processo;
    @NotNull
    @OneToOne
    @JoinColumn(name = "id_informacao_imovel", referencedColumnName = "id")
    private InformacaoImovel informacaoImovel;
    @NotNull
    @OneToOne
    @JoinColumn(name = "id_caracterizacao_imovel", referencedColumnName = "id")
    private CaracterizacaoImovel caracterizacaoImovel;
    @ManyToMany
    @JoinTable(schema = Schemas.CIDADAO, name = "rel_imovel_representante",
            joinColumns = @JoinColumn(name = "id_imovel", updatable = false, nullable = false, insertable = false),
            inverseJoinColumns = @JoinColumn(name = "id_pessoa", updatable = false, nullable = false, insertable = false))
    private List<Representante> representantes;

}

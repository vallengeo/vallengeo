package com.vallengeo.global.model;

import com.vallengeo.core.util.Schemas;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@Entity
@Table(schema = Schemas.DADO_GLOBAL, name = "endereco")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Endereco implements Serializable {
    private static final String SEQUENCE = Schemas.DADO_GLOBAL + ".endereco_id_seq";
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQUENCE)
    @SequenceGenerator(name = SEQUENCE, sequenceName = SEQUENCE, allocationSize = 1)
    private Long id;

    private String cep;

    private String logradouro;

    @ManyToOne
    @JoinColumn(name = "id_municipio", referencedColumnName = "id", nullable = false)
    private Municipio municipio;

    private String bairro;

    private String numero;

    private String complemento;

}

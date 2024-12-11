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

@Getter
@Setter
@Entity
@Table(schema = Schemas.DADO_GLOBAL, name = "camada_categoria")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CamadaCategoria implements Serializable {
    private static final String SEQUENCE = Schemas.DADO_GLOBAL + ".camada_categoria_id_seq";
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQUENCE)
    @SequenceGenerator(name = SEQUENCE, sequenceName = SEQUENCE, allocationSize = 1)
    private Long id;
    @NotNull
    @Size(max = 255)
    @Column(name = "codigo")
    private String codigo;
}

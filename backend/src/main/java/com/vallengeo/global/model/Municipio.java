package com.vallengeo.global.model;

import com.vallengeo.core.util.Schemas;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(schema = Schemas.DADO_GLOBAL, name = "municipio")
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Municipio implements Serializable {
    @Id
    private Integer id;
    private String nome;

    @ManyToOne
    @JoinColumn(name="id_estado", referencedColumnName = "id")
    private Estado estado;
}

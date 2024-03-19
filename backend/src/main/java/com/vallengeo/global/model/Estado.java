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
@Table(schema = Schemas.DADO_GLOBAL, name = "estado")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Estado implements Serializable {
    @Id
    private Integer id;
    private String nome;
    private String uf;
}
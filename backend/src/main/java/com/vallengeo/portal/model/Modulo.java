package com.vallengeo.portal.model;

import com.vallengeo.core.util.Schemas;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(schema = Schemas.PORTAL_SEGURANCA, name = "modulo")
public class Modulo implements Serializable {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;
    @NotEmpty
    @Column(name = "nome")
    private String nome;
    @NotEmpty
    @Column(name = "codigo")
    private String codigo;
    @NotEmpty
    @Column(name = "url")
    private String url;
    @NotNull
    @Column(name = "ativo")
    private Boolean ativo;

    @OneToMany(mappedBy = "modulo")
    private List<Tela> telas;
}

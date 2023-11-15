package com.vallengeo.portal.model;

import com.vallengeo.core.util.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.UUID;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(schema = Schema.PORTAL_SEGURANCA, name = "perfil")
public class Perfil {
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
}

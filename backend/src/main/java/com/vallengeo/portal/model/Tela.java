package com.vallengeo.portal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vallengeo.core.util.Schemas;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(schema = Schemas.PORTAL_SEGURANCA, name = "tela")
public class Tela implements Serializable {
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

    @ManyToOne
	@JoinColumn(name = "id_modulo", referencedColumnName = "id", insertable=false, updatable=false)
	@JsonIgnore
    private Modulo modulo;

    @OneToMany(mappedBy = "tela")
    private List<Permissao> permissoes;
}

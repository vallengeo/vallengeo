package com.vallengeo.portal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vallengeo.core.util.Schemas;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(schema = Schemas.PORTAL_SEGURANCA, name = "permissao")
public class Permissao implements Serializable {
    @Id
    @Column(name = "codigo")
    private String codigo;

    @NotEmpty
    @Column(name = "descricao")
    private String descricao;
    @ManyToOne
	@JoinColumn(name = "id_tela", referencedColumnName = "id", insertable=false, updatable=false)
	@JsonIgnore
    private Tela tela;
}

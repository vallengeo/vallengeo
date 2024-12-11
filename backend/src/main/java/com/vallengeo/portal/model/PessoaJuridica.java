package com.vallengeo.portal.model;

import com.vallengeo.core.util.Schemas;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(schema = Schemas.PORTAL_SEGURANCA, name = "pessoa_juridica")
@PrimaryKeyJoinColumn(name = "id_pessoa", referencedColumnName = "id")
public class PessoaJuridica extends Pessoa implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotNull
    @Column(name = "razao_social", nullable = false)
    private String razaoSocial;

    @NotNull
    @Column(name = "cnpj", nullable = false)
    private String cnpj;

    @ManyToOne
    @JoinColumn(name="id_responsavel", referencedColumnName = "id_pessoa")
    private PessoaFisica responsavel;
}

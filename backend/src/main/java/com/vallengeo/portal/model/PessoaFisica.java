package com.vallengeo.portal.model;

import com.vallengeo.core.util.Schemas;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(schema = Schemas.PORTAL_SEGURANCA, name = "pessoa_fisica")
@PrimaryKeyJoinColumn(name = "id_pessoa", referencedColumnName = "id")
public class PessoaFisica extends Pessoa implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;
    @NotNull
    @Column(name = "cpf", nullable = false)
    @CPF(message = "CPF inválido")
    private String cpf;

    @Column(name = "rg")
    private String rg;
}

package com.vallengeo.portal.model;

import com.vallengeo.core.util.Schema;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(schema = Schema.PORTAL_SEGURANCA, name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;
    @NotEmpty
    @Email
    @Column(name = "email")
    private String email;
    @Column(name = "senha_hash")
    private String senhaHash;
    @NotNull
    @Column(name = "data_cadastro")
    private LocalDateTime dataCadastro;
    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;
    @Column(name = "ativo")
    private Boolean ativo;
    @Column(name = "codigo_acesso")
    private String codigoAcesso;
    @Column(name = "validade_codigo")
    private LocalDateTime validadeCodigo;
}

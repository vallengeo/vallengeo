package com.vallengeo.cidadao.model;

import com.vallengeo.core.util.Schemas;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(schema = Schemas.CIDADAO, name = "responsavel_tecnico")
public class ResponsavelTecnico implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;
    @NotNull
    @Column(name = "cpf", length = 11, nullable = false)
    private String cpf;
    @NotEmpty
    @Column(name = "email")
    private String email;
    @NotNull
    @CreationTimestamp
    @Column(name = "data_cadastro")
    private LocalDateTime dataCadastro;
    @Column(name = "id_pessoa")
    private UUID pessoaId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ResponsavelTecnico that)) return false;
        return Objects.equals(id, that.id) && Objects.equals(cpf, that.cpf) && Objects.equals(email, that.email) && Objects.equals(dataCadastro, that.dataCadastro) && Objects.equals(pessoaId, that.pessoaId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, cpf, email, dataCadastro, pessoaId);
    }

    @Override
    public String toString() {
        return "ResponsavelTecnico{" +
               "id=" + id +
               ", cpf='" + cpf + '\'' +
               ", email='" + email + '\'' +
               ", dataCadastro=" + dataCadastro +
               ", PessoaId=" + pessoaId +
               '}';
    }
}

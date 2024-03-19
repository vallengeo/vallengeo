package com.vallengeo.cidadao.model;

import com.vallengeo.core.util.Schemas;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(schema = Schemas.CIDADAO, name = "representante")
public class Representante implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id_pessoa", nullable = false)
    private UUID id;
    @NotEmpty(message = CAMPO_OBRIGATORIO)
    @Column(name = "contato_nome", nullable = false)
    private String contatoNome;
    @NotEmpty(message = CAMPO_OBRIGATORIO)
    @Column(name = "contato_telefone", nullable = false)
    private String contatoTelefone;
    @NotEmpty(message = CAMPO_OBRIGATORIO)
    @Column(name = "contato_email", nullable = false)
    private String contatoEmail;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Representante that)) return false;
        return Objects.equals(id, that.id) && Objects.equals(contatoNome, that.contatoNome) && Objects.equals(contatoTelefone, that.contatoTelefone) && Objects.equals(contatoEmail, that.contatoEmail);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, contatoNome, contatoTelefone, contatoEmail);
    }

    @Override
    public String toString() {
        return "Representante{" +
               "id=" + id +
               ", contatoNome='" + contatoNome + '\'' +
               ", contatoTelefone='" + contatoTelefone + '\'' +
               ", contatoEmail='" + contatoEmail + '\'' +
               '}';
    }
}

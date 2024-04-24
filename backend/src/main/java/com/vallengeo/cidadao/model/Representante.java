package com.vallengeo.cidadao.model;

import com.vallengeo.core.util.Schemas;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;
import static com.vallengeo.core.util.Constants.EMAIL_INVALIDO;

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
    @Email(message = EMAIL_INVALIDO)
    @Column(name = "contato_email", nullable = false)
    private String contatoEmail;
    @NotEmpty(message = CAMPO_OBRIGATORIO)
    @Size(min = 11, max = 14, message = "Documento inválido")
    @Column(name = "contato_documento", nullable = false)
    private String contatoDocumento;
    @Column(name = "responsavel_tecnico", columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean responsavelTecnico;
    @Column(name = "representante_legal", columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean representanteLegal;
    @Column(name = "outro", columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean outro;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Representante that)) return false;
        return Objects.equals(id, that.id) && Objects.equals(contatoNome, that.contatoNome) && Objects.equals(contatoTelefone, that.contatoTelefone) && Objects.equals(contatoEmail, that.contatoEmail) && Objects.equals(contatoDocumento, that.contatoDocumento) && Objects.equals(responsavelTecnico, that.responsavelTecnico) && Objects.equals(representanteLegal, that.representanteLegal) && Objects.equals(outro, that.outro);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, contatoNome, contatoTelefone, contatoEmail, contatoDocumento, responsavelTecnico, representanteLegal, outro);
    }

    @Override
    public String toString() {
        return "Representante{" +
               "id=" + id +
               ", contatoNome='" + contatoNome + '\'' +
               ", contatoTelefone='" + contatoTelefone + '\'' +
               ", contatoEmail='" + contatoEmail + '\'' +
               ", contatoDocumento='" + contatoDocumento + '\'' +
               ", responsavelTecnico=" + responsavelTecnico +
               ", representanteLegal=" + representanteLegal +
               ", outro=" + outro +
               '}';
    }
}

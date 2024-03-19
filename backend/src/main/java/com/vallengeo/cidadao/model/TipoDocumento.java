package com.vallengeo.cidadao.model;

import com.vallengeo.core.util.Schemas;
import lombok.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

import static com.vallengeo.core.util.Constants.CAMPO_OBRIGATORIO;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Table(schema = Schemas.CIDADAO, name = "tipo_documento")
public class TipoDocumento implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    private static final String SEQUENCE = Schemas.CIDADAO + ".tipo_documento_id_seq";
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQUENCE)
    @SequenceGenerator(name = SEQUENCE, sequenceName = SEQUENCE, allocationSize = 1)
    private Long id;

    @NotEmpty(message = CAMPO_OBRIGATORIO)
    @Size(max = 200)
    private String titulo;

    @NotEmpty(message = CAMPO_OBRIGATORIO)
    @Size(max = 30)
    private String formato;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TipoDocumento that)) return false;
        return Objects.equals(id, that.id) && Objects.equals(titulo, that.titulo) && Objects.equals(formato, that.formato);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, titulo, formato);
    }

    @Override
    public String toString() {
        return "TipoDocumento{" +
               "id=" + id +
               ", titulo='" + titulo + '\'' +
               ", formato='" + formato + '\'' +
               '}';
    }
}

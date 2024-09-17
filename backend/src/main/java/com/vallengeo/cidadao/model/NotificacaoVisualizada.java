package com.vallengeo.cidadao.model;


import com.vallengeo.core.util.Schemas;
import com.vallengeo.portal.model.Usuario;
import lombok.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Table(schema = Schemas.CIDADAO, name = "notificacao_visualizada")
public class NotificacaoVisualizada implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    private static final String SEQUENCE = Schemas.CIDADAO + ".notificacao_visualizada_id_seq";
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQUENCE)
    @SequenceGenerator(name = SEQUENCE, sequenceName = SEQUENCE, allocationSize = 1)
    private Long id;

    @Column(name = "data_visualizacao", nullable = false)
    private LocalDateTime dataVisualizacao;

    @NotNull
    @OneToOne
    @JoinColumn(name = "id_notificacao", referencedColumnName = "id")
    private Notificacao notificacao;

    @NotNull
    @OneToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id")
    private Usuario usuario;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof NotificacaoVisualizada that)) return false;
        return Objects.equals(id, that.id) && Objects.equals(dataVisualizacao, that.dataVisualizacao) && Objects.equals(notificacao, that.notificacao) && Objects.equals(usuario, that.usuario);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, dataVisualizacao, notificacao, usuario);
    }

    @Override
    public String toString() {
        return "NotificacaoVisualizada{" +
                "id=" + id +
                ", dataVisualizacao=" + dataVisualizacao +
                ", notificacao=" + notificacao +
                ", usuario=" + usuario +
                '}';
    }
}

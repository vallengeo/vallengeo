package com.vallengeo.cidadao.model;

import com.vallengeo.core.util.Schemas;
import com.vallengeo.portal.model.Grupo;
import com.vallengeo.portal.model.Usuario;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(schema = Schemas.CIDADAO, name = "processo")
public class Processo implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @NotEmpty
    @Size(max = 50)
    private String protocolo;

    @NotNull
    @CreationTimestamp
    @Column(name = "data_cadastro")
    private LocalDateTime dataCadastro;

    @UpdateTimestamp
    @Column(name = "data_alteracao")
    private LocalDateTime dataAlteracao;

    @Column(name = "data_cancelamento")
    private LocalDateTime dataCancelamento;

    @NotNull
    @OneToOne
    @JoinColumn(name = "id_grupo", referencedColumnName = "id")
    private Grupo grupo;

    @NotNull
    @OneToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id")
    private Usuario usuario;

    @OneToOne
    @JoinColumn(name = "id_usuario_cancelamento", referencedColumnName = "id")
    private Usuario usuarioCancelamento;


}

package com.vallengeo.cidadao.model;

import com.vallengeo.core.util.Schemas;
import com.vallengeo.portal.model.Usuario;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(schema = Schemas.CIDADAO, name = "historico_anotacao_consideracao_tecnica")
public class HistoricoAnotacaoConsideracaoTecnica implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    private static final String SEQUENCE = Schemas.CIDADAO + ".historico_anotacao_consideracao_tecnica_id_seq";
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQUENCE)
    @SequenceGenerator(name = SEQUENCE, sequenceName = SEQUENCE, allocationSize = 1)
    private Long id;

    @NotNull
    @Column(name = "data_cadastro")
    private LocalDateTime dataCadastro;

    @Size(max = 255)
    private String titulo;
    @Size(max = 5000)
    private String descricao;

    @NotNull
    @Column(name = "envia_email")
    private boolean enviaEmail = false;

    @NotNull
    @OneToOne
    @JoinColumn(name = "id_processo", referencedColumnName = "id")
    private Processo processo;

    @NotNull
    @OneToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id")
    private Usuario usuario;

    @ManyToMany
    @JoinTable(schema = Schemas.CIDADAO, name = "rel_historico_anotacao_consideracao_tecnica_documento",
            joinColumns = @JoinColumn(name = "id_historico", referencedColumnName = "id", insertable = false, updatable = false),
            inverseJoinColumns = @JoinColumn(name = "id_documento", referencedColumnName = "id_arquivo", insertable = false, updatable = false)
    )
    private List<Documento> documentos = new ArrayList<>();
}

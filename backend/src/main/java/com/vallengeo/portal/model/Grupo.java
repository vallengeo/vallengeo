package com.vallengeo.portal.model;

import com.vallengeo.core.util.Schemas;
import com.vallengeo.global.model.Camada;
import com.vallengeo.global.model.Estado;
import com.vallengeo.global.model.Municipio;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(schema = Schemas.PORTAL_SEGURANCA, name = "grupo")
public class Grupo implements Serializable {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;
    @NotEmpty
    @Column(name = "nome")
    private String nome;
    @NotEmpty
    @Column(name = "codigo")
    private String codigo;
    @NotNull
    @Column(name = "gera_protocolo")
    private Boolean geraProtocolo;
    @ManyToOne
    @JoinColumn(name="id_municipio", referencedColumnName = "id")
    private Municipio municipio;

    @ManyToMany
    @JoinTable(schema = Schemas.PORTAL_SEGURANCA, name = "grupo_perfil",
            joinColumns = @JoinColumn(name = "id_grupo", updatable = false, nullable = false, insertable = false),
            inverseJoinColumns = @JoinColumn(name = "id_perfil", updatable = false, nullable = false, insertable = false))
    private List<Perfil> perfis;

    @ManyToMany
    @JoinTable(schema = Schemas.PORTAL_SEGURANCA, name = "grupo_modulo",
            joinColumns = @JoinColumn(name = "id_grupo", updatable = false, nullable = false, insertable = false),
            inverseJoinColumns = @JoinColumn(name = "id_modulo", updatable = false, nullable = false, insertable = false))
    private List<Modulo> modulos;

    @ManyToMany
    @JoinTable(schema = Schemas.DADO_GLOBAL, name = "camada_grupo",
            joinColumns = @JoinColumn(name = "id_grupo", updatable = false, nullable = false, insertable = false),
            inverseJoinColumns = @JoinColumn(name = "id_camada", updatable = false, nullable = false, insertable = false))
    private List<Camada> camadas;
}

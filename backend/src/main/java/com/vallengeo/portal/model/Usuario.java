package com.vallengeo.portal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vallengeo.core.util.Schemas;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(schema = Schemas.PORTAL_SEGURANCA, name = "usuario")
public class Usuario implements UserDetails, Serializable {
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
    @ManyToMany
    @JoinTable(schema = Schemas.PORTAL_SEGURANCA, name = "usuario_perfil",
            joinColumns = @JoinColumn(name = "id_usuario", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "id_perfil", referencedColumnName = "id", insertable = false, updatable = false))
    private List<Perfil> perfis;

    @JsonIgnore
    @ManyToMany
    @JoinTable(schema = Schemas.PORTAL_SEGURANCA, name = "grupo_usuario",
            joinColumns = @JoinColumn(name = "id_usuario", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "id_grupo", referencedColumnName = "id", insertable = false, updatable = false))
    private List<Grupo> grupos;

    @JsonIgnore
    @ManyToMany
    @JoinTable(schema = Schemas.PORTAL_SEGURANCA, name = "usuario_perfil_tela_permissao",
            joinColumns = @JoinColumn(name = "id_usuario", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "codigo_permissao", referencedColumnName = "codigo", insertable = false, updatable = false))
    private List<Permissao> permissoes;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.permissoes.stream().map(p -> new SimpleGrantedAuthority(p.getCodigo())).toList();
    }

    @Override
    public String getPassword() {
        return senhaHash;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.ativo;
    }
}

package com.vallengeo.portal.model;

import com.vallengeo.core.util.Schemas;
import com.vallengeo.global.model.Endereco;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.*;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(schema = Schemas.PORTAL_SEGURANCA, name = "pessoa")
@Inheritance(strategy = InheritanceType.JOINED)
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Pessoa implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;
    @Column(name = "email")
    private String email;
    @Column(name = "telefone")
    private String telefone;
    @Column(name = "data_cadastro")
    @CreationTimestamp
    private LocalDateTime dataCadastro;
    @Column(name = "data_atualizacao")
    @UpdateTimestamp
    private LocalDateTime dataAtualizacao;

    @ManyToOne
    @JoinColumn(name = "id_endereco", referencedColumnName = "id")
    private Endereco endereco;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Pessoa pessoa)) return false;
        return Objects.equals(id, pessoa.id) && Objects.equals(email, pessoa.email) && Objects.equals(telefone, pessoa.telefone) && Objects.equals(dataCadastro, pessoa.dataCadastro) && Objects.equals(dataAtualizacao, pessoa.dataAtualizacao) && Objects.equals(endereco, pessoa.endereco);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email, telefone, dataCadastro, dataAtualizacao, endereco);
    }

    @Override
    public String toString() {
        return "Pessoa{" +
               "id=" + id +
               ", email='" + email + '\'' +
               ", telefone='" + telefone + '\'' +
               ", dataCadastro=" + dataCadastro +
               ", dataAtualizacao=" + dataAtualizacao +
               ", endereco=" + endereco +
               '}';
    }
}

package com.vallengeo.global.model;

import com.vallengeo.core.util.Schemas;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@Table(schema = Schemas.DADO_GLOBAL, name = "arquivo")
public class Arquivo implements Serializable {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;
    @NotNull
    @Size(max = 255)
    @Column(name = "nome")
    private String nome;

    @NotNull
    @Size(max = 10)
    @Column(name = "extensao")
    private String extensao;

    @NotNull
    @Column(name = "tamanho")
    private float tamanho;

    @NotNull
    @Column(name = "data_envio")
    private LocalDateTime dataEnvio;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Arquivo arquivo)) return false;
        return Float.compare(arquivo.tamanho, tamanho) == 0 && Objects.equals(id, arquivo.id) && Objects.equals(nome, arquivo.nome) && Objects.equals(extensao, arquivo.extensao) && Objects.equals(dataEnvio, arquivo.dataEnvio);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nome, extensao, tamanho, dataEnvio);
    }

    @Override
    public String
    toString() {
        return "Arquivo{" +
               "id=" + id +
               ", nome='" + nome + '\'' +
               ", extensao='" + extensao + '\'' +
               ", tamanho=" + tamanho +
               ", dataEnvio=" + dataEnvio +
               '}';
    }
}

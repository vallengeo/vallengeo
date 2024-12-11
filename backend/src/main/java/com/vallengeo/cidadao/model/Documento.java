package com.vallengeo.cidadao.model;

import com.vallengeo.core.util.Schemas;
import com.vallengeo.global.model.Arquivo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@PrimaryKeyJoinColumn(name = "id_arquivo", referencedColumnName = "id")
@Table(schema = Schemas.CIDADAO, name = "documento")
public class Documento extends Arquivo implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_processo", referencedColumnName = "id")
    private Processo processo;

    @NotNull
    @OneToOne
    @JoinColumn(name = "id_tipo_documento", referencedColumnName = "id")
    private TipoDocumento tipoDocumento;

    public Documento(Arquivo arquivo) {
        this.setId(arquivo.getId());
        this.setNome(arquivo.getNome());
        this.setExtensao(arquivo.getExtensao());
        this.setTamanho(arquivo.getTamanho());
        this.setDataEnvio(arquivo.getDataEnvio());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Documento documento)) return false;
        return Objects.equals(processo, documento.processo) && Objects.equals(tipoDocumento, documento.tipoDocumento);
    }

    @Override
    public int hashCode() {
        return Objects.hash(processo, tipoDocumento);
    }

    @Override
    public String toString() {
        return "Documento{" +
               "processo=" + processo +
               ", tipoDocumento=" + tipoDocumento +
               '}';
    }
}

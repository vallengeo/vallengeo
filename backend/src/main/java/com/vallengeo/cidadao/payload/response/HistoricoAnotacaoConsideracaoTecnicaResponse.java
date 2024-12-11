package com.vallengeo.cidadao.payload.response;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;

import static com.vallengeo.core.config.Config.DATE_FORMAT_TIME_TABLE;

@Data
@Builder
public class HistoricoAnotacaoConsideracaoTecnicaResponse implements Serializable {
    private Long id;
    private String titulo;
    private String descricao;
    private LocalDateTime dataCadastro;
    private List<DocumentosEnviadosResponse> documentosEnviados;

    public String getTitulo() {
        return Objects.nonNull(this.titulo) ? this.titulo : "";
    }

    public String getDataCadastroFormatada() {
        if (this.dataCadastro != null) {
            return this.dataCadastro.format(DateTimeFormatter.ofPattern(DATE_FORMAT_TIME_TABLE));
        }
        return "-";
    }
}

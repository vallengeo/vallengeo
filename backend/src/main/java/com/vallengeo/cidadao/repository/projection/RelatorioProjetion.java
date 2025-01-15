package com.vallengeo.cidadao.repository.projection;

import java.time.LocalDate;

public interface RelatorioProjetion {
    String getProtocolo();
    String getInscricaoImobiliaria();
    LocalDate getDataRegistro();
    String getSituacao();
    String getSituacaoCodigo();
}

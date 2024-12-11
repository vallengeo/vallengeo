package com.vallengeo.cidadao.enumeration;

import com.vallengeo.core.enumeration.EnumConverter;

public enum TipoDocumentoEnum implements EnumConverter<Long> {
    OUTROS(1L),
    ANOTACAO_CONSIDERACAO_TECNICA(2L);
    private final Long codigo;

    TipoDocumentoEnum(final Long codigo) {
        this.codigo = codigo;
    }

    @Override
    public Long getCodigo() {
        return this.codigo;
    }
}

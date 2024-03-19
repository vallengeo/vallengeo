package com.vallengeo.cidadao.enumeration;

import com.vallengeo.core.enumeration.EnumConverter;
import lombok.Getter;

@Getter
public enum SituacaoProcessoEnum implements EnumConverter<Long> {
    EM_CADASTRAMENTO(1L),
    PENDENTE_UPLOAD_ARQUIVO(2L),
    PENDENTE_VALIDACAO_VINCULO_RT(3L),
    AGUARDANDO_APROVACAO(4L),
    EM_ANALISE(5L),
    APROVADO(6L),
    REPROVADO(7L),
    CANCELADO(8L);

    private final Long codigo;

    SituacaoProcessoEnum(final Long codigo) {
        this.codigo = codigo;
    }

    @Override
    public Long getCodigo() {
        return this.codigo;
    }
}

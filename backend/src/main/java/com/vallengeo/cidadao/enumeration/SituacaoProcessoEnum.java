package com.vallengeo.cidadao.enumeration;

import com.vallengeo.core.enumeration.EnumConverter;
import lombok.Getter;

import java.util.List;

@Getter
public enum SituacaoProcessoEnum implements EnumConverter<Long> {
    EM_CADASTRAMENTO(1L),
    PENDENTE_UPLOAD_ARQUIVO(2L),
    PENDENTE_VALIDACAO_VINCULO_RT(3L),
    AGUARDANDO_APROVACAO(4L),
    EM_ANALISE(5L),
    APROVADO(6L),
    REPROVADO(7L),
    ARQUIVADO(8L);

    private final Long codigo;

    SituacaoProcessoEnum(final Long codigo) {
        this.codigo = codigo;
    }

    @Override
    public Long getCodigo() {
        return this.codigo;
    }

    public static List<Long> emAndamento() {
        return List.of(EM_CADASTRAMENTO.codigo, PENDENTE_UPLOAD_ARQUIVO.codigo, PENDENTE_VALIDACAO_VINCULO_RT.codigo, AGUARDANDO_APROVACAO.codigo, EM_ANALISE.codigo);
    }

    public static List<Long> finalizado() {
        return List.of(APROVADO.codigo, REPROVADO.codigo);
    }

    public static String corPorSituacao(SituacaoProcessoEnum situacao) {
        return switch (situacao) {
            case EM_ANALISE, EM_CADASTRAMENTO, AGUARDANDO_APROVACAO, PENDENTE_UPLOAD_ARQUIVO, PENDENTE_VALIDACAO_VINCULO_RT ->
                    "#FFBE5B";
            case APROVADO -> "#70C64D";
            case ARQUIVADO -> "#729397";
            case REPROVADO -> "#DA1C4A";
        };
    }

    public static String descricaoSituacao(SituacaoProcessoEnum situacao) {
        return switch (situacao) {
            case EM_ANALISE, EM_CADASTRAMENTO, AGUARDANDO_APROVACAO, PENDENTE_UPLOAD_ARQUIVO, PENDENTE_VALIDACAO_VINCULO_RT ->
                    "Em andamento";
            case APROVADO -> "Aprovado";
            case ARQUIVADO -> "Arquivado";
            case REPROVADO -> "Reprovado";
        };
    }
}

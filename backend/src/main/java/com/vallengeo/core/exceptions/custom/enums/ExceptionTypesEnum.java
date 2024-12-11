package com.vallengeo.core.exceptions.custom.enums;

import lombok.Getter;

@Getter
public enum ExceptionTypesEnum {
    BASE_EXCEPTION("Erro interno!"),
    UNAUTHORIZED_EXCEPTION("Erro de autenticação"),
    FORBIDDEN_EXCEPTION("Usuário autenticado não possui privilégios para acessar este recurso."),
    VALIDATION_EXCEPTION("Erro de validação!"),
    BAD_REQUEST_EXCEPTION("Requisição invalida!"),
    VERSAO_EXCEPTION("Versão desatualizada!");

    private final String descricao;

    ExceptionTypesEnum(String descricao) {
        this.descricao = descricao;
    }
}


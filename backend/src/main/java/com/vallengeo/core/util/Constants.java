package com.vallengeo.core.util;

import java.net.URI;

public class Constants {
    private Constants() {
    }

    public static final long FIRST_MILLISECONDS_DATE = 0L;

    public static final String DATA_CADASTRO_DB = "dataCadastro";

    public static final String ENTITY_ALREADY_EXISTS_ERROR = "Entidade já existente na base.";
    public static final String RECORD_ALREADY_EXISTS_ERROR = "Registro já existente na base.";
    public static final String ENTITY_VALITATION_ERROR = "Ocorreu um erro na validação da entidade.";
    public static final String ENTITY_NOT_FOUND_ERROR = "Resultado não encontrado.";
    public static final String NOT_FOUND = " não encontrado!";
    public static final String PARAMETER_NOT_FOUND = "Parâmetro não encontrado!";
    public static final String GENERAL_ERROR = "Ocorreu um erro no sistema, tente novamente mais tarde.";
    public static final String INVALID_PASSWORD = "A senha não atende os requisitos do sistema.";
    public static final String PARAMETER_DIVERGENT = "Parâmetros divergentes";

    public static final String UNAUTHORIZED_ERROR = "Acesso não autorizado. Faça login para continuar.";
    public static final String FORBIDDEN_ERROR = "Permissões necessárias insuficentes para acessar o recurso.";
    public static final String FALHA_AUTENTICACAO = "Falha na autenticação!";

    public static final String REQUEST_ERROR = "Erro ao processar requisição ";
    public static final String FILE_INVALID_ERROR = "Arquivo inválido.";
    public static final String FILE_NOT_PERMITED_ERROR = "Arquivo não permitido.";
    public static final String FILE_NOT_FOUND = "Arquivo não encontrado.";
    public static final String MAX_UPLOAD_SIZE = "Tamanho do arquivo não permitido.";
    public static final String COUNT_FILE_INVALID_ERROR = "Quantidade de polígonos inválida.";
    public static final String GEOMETRY_INTERSECTS_IN_DATA_BASE = "O polígono está sobreposto a outra atividade já georreferenciada.";

    // FEEDBACK MESSAGES
    public static final String SALVO_SUCESSO = "Salvo com sucesso";
    public static final String ALTERADO_SUCESSO = "Alterado com sucesso";
    public static final String ATIVADO_DESATIVADO_SUCESSO = "Ativado/Desativado com sucesso";
    public static final String EXCLUIDO_SUCESSO = "Removido com sucesso";

    // ERROS
    public static final String ERR_CONCURRENCY_FAILURE = "error.concurrencyFailure";
    public static final String ERR_VALIDATION = "error.validation";
    public static final String PROBLEM_BASE_URL = "problem";
    public static final URI DEFAULT_TYPE = URI.create(PROBLEM_BASE_URL + "/problem-with-message");
    public static final URI CONSTRAINT_VIOLATION_TYPE = URI.create(PROBLEM_BASE_URL + "/constraint-violation");

    // VALIDACAO
    public static final String CAMPO_OBRIGATORIO = "O campo é obrigatório.";
    public static final String EMAIL_INVALIDO = "Favor informar email válido.";
    public static final String DOCUMENTO_INVALIDO = "Favor informar documento válido.";
    public static final String MAX_CARACTERES = "O Tamanho máximo de caracteres atingido.";
}

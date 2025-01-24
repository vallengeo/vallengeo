package com.vallengeo.portal.payload.response;

public record LoginResponse(String accessToken, String refreshToken, long exp, String idUsuario, String idGrupo) {
}

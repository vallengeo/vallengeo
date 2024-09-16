package com.vallengeo.cidadao.payload.response;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

@Data
@Builder
public class UltimoProcessoResponse implements Serializable {
    private UUID id;
    private String protocolo;
}

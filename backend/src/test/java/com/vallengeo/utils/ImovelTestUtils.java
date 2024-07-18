package com.vallengeo.utils;

import com.vallengeo.cidadao.model.Processo;
import com.vallengeo.core.util.SecurityUtils;
import com.vallengeo.portal.model.Grupo;
import net.bytebuddy.utility.RandomString;

import java.time.LocalDateTime;

public class ImovelTestUtils {

    public static Processo getProcesso(Grupo grupo) {
        var protocolo = RandomString.make(16);

        return Processo.builder()
                .grupo(grupo)
                .protocolo(protocolo)
                .dataCadastro(LocalDateTime.now())
                .usuario(SecurityUtils.getUserSession())
                .build();
    }
}

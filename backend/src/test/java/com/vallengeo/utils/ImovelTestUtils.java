package com.vallengeo.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vallengeo.cidadao.model.Processo;
import com.vallengeo.cidadao.payload.request.ProcessoImovelRequest;
import com.vallengeo.cidadao.payload.request.imovel.*;
import com.vallengeo.core.util.SecurityUtils;
import com.vallengeo.portal.model.Grupo;
import net.bytebuddy.utility.RandomString;
import org.geojson.GeoJsonObject;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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

    public static ProcessoImovelRequest getProcessoImovelRequest(String grupoId, Long tipoUsoId) throws IOException {
        var imovelRequest = new ImovelRequest();

        imovelRequest.setRepresentantes(List.of(
                RepresentanteTestUtils.getRepresentantePessoaFisicaRequest(),
                RepresentanteTestUtils.getRepresentantePessoaJuridicaRequest()
        ));

        imovelRequest.setInformacaoImovel(
                new InformacaoImovelRequest(new TipoUsoRequest(tipoUsoId), EnderecoTestUtils.getEnderecoRequest())
        );

        imovelRequest.setCaracterizacaoImovel(
                new CaracterizacaoImovelRequest(
                        "ABC", "10", "25", null, 300F,15F, null, LocalDate.now())
        );

        imovelRequest.setGeorreferenciamento(getGeorreferenciamentoRequest());

        return new ProcessoImovelRequest(grupoId, imovelRequest);
    }

    public static GeorreferenciamentoRequest getGeorreferenciamentoRequest() throws IOException {
        var geoJsonString = """
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                [-44.954906, -22.563066],
                                [-44.954882, -22.563171],
                                [-44.954632, -22.563129],
                                [-44.954624, -22.563127],
                                [-44.954646, -22.563018],
                                [-44.954653, -22.563019],
                                [-44.954906, -22.563066]
                            ]
                        ]
                    }
                }""";

        var geoRefRequest = new GeorreferenciamentoRequest();
        geoRefRequest.setGeoJson(new ObjectMapper().readValue(geoJsonString, GeoJsonObject.class));

        return geoRefRequest;
    }
}

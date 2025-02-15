package com.vallengeo.global.service;

import com.vallengeo.AbstractIntegrationTest;
import com.vallengeo.global.feignclient.GeoserverFeignClient;
import com.vallengeo.global.payload.response.geoserver.GeorreferenciamentoFeatureColletionResponse;
import com.vallengeo.utils.ImovelTestUtils;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.locationtech.jts.geom.Geometry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.io.IOException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.contains;
import static org.mockito.Mockito.doReturn;

@DisplayName("GeoserverService Tests")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class GeoserverServiceTest extends AbstractIntegrationTest {

    @Autowired
    private GeoserverService geoserverService;

    @MockBean
    private GeoserverFeignClient geoserverFeignClient;

    private static Geometry geometry;
    private static List<String> camadas;
    private static GeorreferenciamentoFeatureColletionResponse.Feature feature;
    private static GeorreferenciamentoFeatureColletionResponse featureColletionResponse;
    private static GeorreferenciamentoFeatureColletionResponse.Feature.Propriedade propriedades;

    @BeforeAll
    public static void setup() throws IOException {
        camadas = List.of("limite_municipal", "setor", "quadra", "lote");
        geometry = ImovelTestUtils.getGeorreferenciamentoRequest().getGeometria();

        propriedades = new GeorreferenciamentoFeatureColletionResponse.Feature.Propriedade();
        propriedades.setFid(1);
        propriedades.setCd_geocodm("3513405");
        propriedades.setNm_municip("CRUZEIRO");
        propriedades.setEstado("SÃO PAULO");
        propriedades.setArea(305.698669283);

        feature = new GeorreferenciamentoFeatureColletionResponse.Feature();
        feature.setType("Feature");
        feature.setId("limite_municipal.1875");
        feature.setGeometry_name("geom");
        feature.setProperties(propriedades);

        featureColletionResponse = new GeorreferenciamentoFeatureColletionResponse();
        featureColletionResponse.setType("FeatureCollection");
        featureColletionResponse.setFeatures(List.of(feature));

    }

    @Test
    @DisplayName("Integration Test - Dado Geometria E Camadas Quando buscaTodasInterseccoes Deve Retornar Lista GeorreferenciamentoFeatureColletionResponse")
    public void testDadoGeometriaECamadas_QuandoBuscaTodasInterseccoes_DeveRetornarListaGeorreferenciamentoFeatureColletionResponse() {
        doReturn(new GeorreferenciamentoFeatureColletionResponse())
                .when(geoserverFeignClient).buscaInterseccaoPorGeometria(anyString());

        var actual = geoserverService.buscaTodasInterseccoes(geometry, camadas);

        assertNotNull(actual);
        assertInstanceOf(GeorreferenciamentoFeatureColletionResponse.class, actual.get(0));
    }

    @Test
    @DisplayName("Integration Test - Dado Geometria E Camada Quando buscaInterseccao Deve Retornar GeorreferenciamentoFeatureColletionResponse")
    public void testDadoGeometriaECamada_QuandoBuscaInterseccao_DeveRetornarGeorreferenciamentoFeatureColletionResponse() {
        var camada = "limite_municipal";

        doReturn(featureColletionResponse)
                .when(geoserverFeignClient).buscaInterseccaoPorGeometria(contains(camada));

        var actual = geoserverService.buscaInterseccao(geometry, camada);

        assertNotNull(actual);
        assertInstanceOf(GeorreferenciamentoFeatureColletionResponse.class, actual);
        assertEquals(actual.getType(), featureColletionResponse.getType());

        var actualFeature = actual.getFeatures().get(0);
        assertEquals(actualFeature.getId(), feature.getId());
        assertEquals(actualFeature.getType(), feature.getType());
        assertEquals(actualFeature.getProperties().getCd_geocodm(), propriedades.getCd_geocodm());
        assertEquals(actualFeature.getProperties().getNm_municip(), propriedades.getNm_municip());
        assertEquals(actualFeature.getProperties().getEstado(), propriedades.getEstado());
        assertEquals(actualFeature.getProperties().getArea(), propriedades.getArea());
    }

    @Test
    @DisplayName("Integration Test - Dado Geometria E Camada Quando contidoNaCamadaDoGrupo Deve Retornar GeorreferenciamentoFeatureColletionResponse")
    public void testDadoGeometriaECamada_QuandoContidoNaCamadaDoGrupo_DeveRetornarGeorreferenciamentoFeatureColletionResponse() {
        var camada = "limite_municipal";

        doReturn(featureColletionResponse)
                .when(geoserverFeignClient).buscaInterseccaoPorGeometria(contains(camada));

        var actual = geoserverService.contidoNaCamadaDoGrupo(geometry, camada);

        assertNotNull(actual);
        assertInstanceOf(GeorreferenciamentoFeatureColletionResponse.class, actual);
        assertEquals(actual.getType(), featureColletionResponse.getType());

        var actualFeature = actual.getFeatures().get(0);
        assertEquals(actualFeature.getId(), feature.getId());
        assertEquals(actualFeature.getType(), feature.getType());
        assertEquals(actualFeature.getProperties().getCd_geocodm(), propriedades.getCd_geocodm());
        assertEquals(actualFeature.getProperties().getNm_municip(), propriedades.getNm_municip());
        assertEquals(actualFeature.getProperties().getEstado(), propriedades.getEstado());
        assertEquals(actualFeature.getProperties().getArea(), propriedades.getArea());
    }
}
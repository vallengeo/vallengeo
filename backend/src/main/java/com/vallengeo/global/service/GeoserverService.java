package com.vallengeo.global.service;

import com.vallengeo.global.feignclient.GeoserverFeignClient;
import com.vallengeo.global.payload.response.geoserver.GeorreferenciamentoFeatureColletionResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.geom.Geometry;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class GeoserverService {
    private final GeoserverFeignClient geoServerFeign;

    public List<GeorreferenciamentoFeatureColletionResponse> buscaTodasInterseccoes(Geometry geometry, List<String> camadas) {

        List<GeorreferenciamentoFeatureColletionResponse> listLayers = new ArrayList<>();

        for (String camada : camadas) {
            listLayers.add(buscaInterseccao(geometry, camada));
        }
        return listLayers;
    }

    public GeorreferenciamentoFeatureColletionResponse buscaInterseccao(Geometry geometry, String camada) {
        Map<String, String> params = criaParametrosGeo(
                "INTERSECTS",
                geometry.getEnvelope().toText(),
                camada,
                null
        );

        String url = montaUrl(params);
        return geoServerFeign.buscaInterseccaoPorGeometria(url);
    }

    public GeorreferenciamentoFeatureColletionResponse contidoNaCamadaDoGrupo(Geometry geometry, String camada) {

        Map<String, String> params = criaParametrosGeo(
                "INTERSECTS",
                geometry.getEnvelope().toText(),
                camada,
                null
        );

        String url = montaUrl(params);
        return geoServerFeign.buscaInterseccaoPorGeometria(url);
    }

    private Map<String, String> criaParametrosGeo(
            String operation,
            String wkt,
            String camada,
            String propertiesName
    ) {
        Map<String, String> map = new HashMap<>();
        map.put("service", "WFS");
        map.put("version", "1.1.0");
        map.put("request", "GetFeature");
        map.put("outputFormat", MediaType.APPLICATION_JSON_VALUE);

        String cqlFilter = operation + "(geom,SRID=4674;" + wkt + ")";
        map.put("cql_filter", cqlFilter);

        map.put("typeName", camada);

        if (propertiesName != null) {
            map.put("propertyName", propertiesName);
        }

        return map;
    }

    private String montaUrl(Map<String, String> urlMap) {
        StringBuilder result = new StringBuilder();
        boolean first = true;
        for (Map.Entry<String, String> entry : urlMap.entrySet()) {
            if (first)
                first = false;
            else
                result.append("&");
            result.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8));
            result.append("=");
            result.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8));
        }
        return result.toString();
    }

}

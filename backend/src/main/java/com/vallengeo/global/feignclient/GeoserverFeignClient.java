package com.vallengeo.global.feignclient;

import com.vallengeo.global.payload.response.geoserver.GeorreferenciamentoFeatureColletionResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(
        name = "GeoserverFeignClient",
        url = "#{'${geoserver-url}'}"
)
public interface GeoserverFeignClient {
    @RequestMapping(method = RequestMethod.POST, value = "/ows", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    GeorreferenciamentoFeatureColletionResponse buscaInterseccaoPorGeometria(String param);

}

package com.vallengeo.global.feignclient;

import com.vallengeo.global.payload.response.ViaCepResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
    name = "ViaCepFeignClient",
    url = "#{'${via-cep-url}'}"
)
public interface ViaCepFeignClient {
    @GetMapping("/{cep}/json")
    ViaCepResponse query(@PathVariable("cep") String cep);
}
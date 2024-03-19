package com.vallengeo.core.config.feign;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vallengeo.core.exceptions.GenericHTTPException;
import feign.Response;
import feign.codec.ErrorDecoder;
import feign.codec.StringDecoder;
import lombok.extern.slf4j.Slf4j;
import org.zalando.problem.Status;

import java.io.IOException;
import java.util.Map;

@Slf4j
public class FeignErrorDecoder implements ErrorDecoder {
    private final StringDecoder stringDecoder = new StringDecoder();

    @Override
    public GenericHTTPException decode(String s, Response response) {
        String message = "Não foi possível realizar a operação solicitada. Entre em contato com o administrador do sistema.";
        if (response.body() != null) {
            try {
                var bodyString = stringDecoder.decode(response, String.class).toString();
                if (bodyString.contains("<html>")) {
                    message = bodyString;
                    log.error("{} Error feign request response.{}", s, bodyString);
                } else {
                    var map = new ObjectMapper().readValue(bodyString, Map.class);
                    if (map.get("message") != null)
                        message = (String) map.get("message");
                }
            } catch (IOException e) {
                log.error("{} Error Deserializing response body from failed feign request response.{}", s, e);
            }
        }

        return new GenericHTTPException(message, Status.valueOf(response.status()));
    }
}

package com.vallengeo.global.payload.request.wkhtml;

import lombok.Data;

import java.util.LinkedHashMap;

@Data
public class ParamsRequest {
    private String url;
    private Html html;
    private LinkedHashMap<String, Object> options;

    @Data
    public static class Html {
        private String body;
        private String footer;
        private String header;
    }
}

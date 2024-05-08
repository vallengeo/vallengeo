package com.vallengeo.global.payload.request.wkhtml;

import lombok.Data;

@Data
public class ParamsHtmlRequest {
    private String html;
    private String path;
    private String type;
}

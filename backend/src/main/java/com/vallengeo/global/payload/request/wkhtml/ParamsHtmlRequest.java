package com.vallengeo.global.payload.request.wkhtml;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ParamsHtmlRequest {
    private String html;
    private String path;
    private String type;
}

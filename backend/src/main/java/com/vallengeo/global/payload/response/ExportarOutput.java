package com.vallengeo.global.payload.response;

import lombok.Data;
import org.springframework.core.io.ByteArrayResource;

@Data
public class ExportarOutput {
    private ByteArrayResource byteArrayResource;
    private byte[] resource;
    private String filename;
}

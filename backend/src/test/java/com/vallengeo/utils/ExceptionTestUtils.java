package com.vallengeo.utils;

import com.vallengeo.core.exceptions.ApiExceptionCustom;
import org.testcontainers.shaded.com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

public class ExceptionTestUtils {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static ApiExceptionCustom stringToApiExceptionCustom(String value) {
        try {
            return MAPPER.readValue(value, ApiExceptionCustom.class);
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }
}

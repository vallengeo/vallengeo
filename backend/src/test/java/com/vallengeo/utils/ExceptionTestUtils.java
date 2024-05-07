package com.vallengeo.utils;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ExceptionTestUtils {
    
    public static Map<String, Object> errosListToMap(List<String> erros) {
        Map<String, Object> mapErros = new HashMap<>();

        for (String erro: erros) {
            var split = Arrays.asList(erro.split(": "));
            mapErros.put(split.get(0), split.get(1));
        }

        return mapErros;
    }
}

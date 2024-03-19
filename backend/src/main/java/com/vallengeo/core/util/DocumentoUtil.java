package com.vallengeo.core.util;

import java.util.Objects;

public class DocumentoUtil {
    private DocumentoUtil() {
    }

    public static String removeMascara(String documento) {
        if (Objects.nonNull(documento)) {
            if (documento.contains(".")) {
                documento = documento.replace(".", "");
            }
            if (documento.contains("-")) {
                documento = documento.replace("-", "");
            }
            if (documento.contains("/")) {
                documento = documento.replace("/", "");
            }
        }

        return documento;
    }

    public static String addMascara(String documento) {
        if (documento == null) {
            return "";
        }

        if (documento.length() == 14) {
            // máscara do CNPJ: 99.999.999/9999-99
            return (documento.substring(0, 2) +
                    "." +
                    documento.substring(2, 5) +
                    "." +
                    documento.substring(5, 8) +
                    "/" +
                    documento.substring(8, 12) +
                    "-" +
                    documento.substring(12, 14));
        } else if (documento.length() == 11) {
            // máscara do CPF: 999.999.999-99
            return (documento.substring(0, 3) +
                    "." +
                    documento.substring(3, 6) +
                    "." +
                    documento.substring(6, 9) +
                    "-" +
                    documento.substring(9, 11));
        } else {
            return documento;
        }
    }
}

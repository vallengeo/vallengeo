package com.vallengeo.portal.enumeration;

import lombok.Getter;

@Getter
public enum TipoPessoaEnum {
   FISICA(Nome.FISICA), JURIDICA(Nome.JURIDICA);

    private final String nome;

    TipoPessoaEnum(String nome) {
        this.nome = nome;
    }

    public static class Nome {
        private Nome() {
        }

        public static final String FISICA = "FISICA";
        public static final String JURIDICA = "JURIDICA";
    }

}
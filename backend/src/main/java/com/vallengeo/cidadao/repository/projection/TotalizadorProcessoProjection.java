package com.vallengeo.cidadao.repository.projection;

public interface TotalizadorProcessoProjection {
    int getTotal();
    int getNovo();
    int getAndamento();
    int getFinalizado();
}

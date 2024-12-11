package com.vallengeo.cidadao.repository;

import com.vallengeo.cidadao.model.InformacaoImovel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InformacaoImovelRepository extends JpaRepository<InformacaoImovel, Long> {
}
package com.vallengeo.cidadao.repository;

import com.vallengeo.cidadao.model.CaracterizacaoImovel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaracterizacaoImovelRepository extends JpaRepository<CaracterizacaoImovel, Long> {
}
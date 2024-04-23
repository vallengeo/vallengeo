package com.vallengeo.global.repository;

import com.vallengeo.global.model.Camada;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CamadaRepository extends JpaRepository<Camada, Long> {
}
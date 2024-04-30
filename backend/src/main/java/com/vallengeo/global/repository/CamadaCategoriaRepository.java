package com.vallengeo.global.repository;

import com.vallengeo.global.model.CamadaCategoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CamadaCategoriaRepository extends JpaRepository<CamadaCategoria, Long> {
}
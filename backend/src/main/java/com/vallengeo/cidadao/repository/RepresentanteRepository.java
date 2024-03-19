package com.vallengeo.cidadao.repository;

import com.vallengeo.cidadao.model.Representante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RepresentanteRepository extends JpaRepository<Representante, UUID> {
}
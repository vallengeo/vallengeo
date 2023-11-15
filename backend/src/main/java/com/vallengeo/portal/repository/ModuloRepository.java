package com.vallengeo.portal.repository;

import com.vallengeo.portal.model.Modulo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ModuloRepository extends JpaRepository<Modulo, UUID> {
}
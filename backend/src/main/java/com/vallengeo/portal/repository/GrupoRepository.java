package com.vallengeo.portal.repository;

import com.vallengeo.portal.model.Grupo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GrupoRepository extends JpaRepository<Grupo, UUID> {
}
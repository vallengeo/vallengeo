package com.vallengeo.portal.repository;

import com.vallengeo.portal.model.Grupo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GrupoRepository extends JpaRepository<Grupo, UUID> {
}
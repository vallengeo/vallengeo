package com.vallengeo.global.repository;

import com.vallengeo.global.model.Arquivo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ArquivoRepository extends JpaRepository<Arquivo, UUID> {
}
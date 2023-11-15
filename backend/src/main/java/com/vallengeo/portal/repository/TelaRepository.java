package com.vallengeo.portal.repository;

import com.vallengeo.portal.model.Tela;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TelaRepository extends JpaRepository<Tela, UUID> {
}
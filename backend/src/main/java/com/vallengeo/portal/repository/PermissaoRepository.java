package com.vallengeo.portal.repository;

import com.vallengeo.portal.model.Permissao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PermissaoRepository extends JpaRepository<Permissao, UUID> {
}
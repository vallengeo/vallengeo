package com.vallengeo.portal.repository;

import com.vallengeo.portal.model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PessoaRepository extends JpaRepository<Pessoa, UUID> {
    Optional<Pessoa> findByEmail(String email);
}
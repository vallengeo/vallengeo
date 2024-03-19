package com.vallengeo.portal.repository;

import com.vallengeo.portal.model.Pessoa;
import com.vallengeo.portal.model.PessoaFisica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PessoaFisicaRepository extends JpaRepository<PessoaFisica, UUID> {
    Optional<Pessoa> findPessoaById(UUID id);
    Optional<Pessoa> findByCpf(String cpf);
}
package com.vallengeo.portal.repository;

import com.vallengeo.portal.model.Pessoa;
import com.vallengeo.portal.model.PessoaJuridica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PessoaJuridicaRepository extends JpaRepository<PessoaJuridica, UUID> {
    Optional<Pessoa> findPessoaById(UUID id);
    Optional<Pessoa> findByCnpj(String cnpj);
}
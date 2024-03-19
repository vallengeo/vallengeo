package com.vallengeo.cidadao.repository;

import com.vallengeo.cidadao.model.ResponsavelTecnico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ResponsavelTecnicoRepository extends JpaRepository<ResponsavelTecnico, UUID> {
    Optional<ResponsavelTecnico> findByCpf(String cpf);
}
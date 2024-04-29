package com.vallengeo.cidadao.repository;

import com.vallengeo.cidadao.model.Imovel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ImovelRepository extends JpaRepository<Imovel, Long> {
    Optional<Imovel> findByProcessoId(UUID id);
}
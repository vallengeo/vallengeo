package com.vallengeo.cidadao.repository;

import com.vallengeo.cidadao.model.Documento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DocumentoRepository extends JpaRepository<Documento, UUID> {
    List<Documento> findAllByProcessoId(UUID processoId);
}
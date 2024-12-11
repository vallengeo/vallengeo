package com.vallengeo.cidadao.repository;

import com.vallengeo.cidadao.model.Documento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DocumentoRepository extends JpaRepository<Documento, UUID> {
    @Query(value = "SELECT d.id_arquivo, d.id_processo, d.id_tipo_documento, a.nome, a.extensao, a.tamanho, a.data_envio " +
                   " FROM cidadao.documento d " +
                   " INNER JOIN dado_global.arquivo a ON d.id_arquivo = a.id " +
                   " WHERE id_tipo_documento NOT IN (2) AND d.id_processo = :processoId", nativeQuery = true)
    List<Documento> findAllByProcessoId(@Param("processoId") UUID processoId);
}
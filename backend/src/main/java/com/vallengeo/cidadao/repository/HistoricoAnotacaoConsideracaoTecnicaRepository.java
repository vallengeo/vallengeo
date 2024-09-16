package com.vallengeo.cidadao.repository;

import com.vallengeo.cidadao.model.HistoricoAnotacaoConsideracaoTecnica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface HistoricoAnotacaoConsideracaoTecnicaRepository extends JpaRepository<HistoricoAnotacaoConsideracaoTecnica, Long> {
    List<HistoricoAnotacaoConsideracaoTecnica> findAllByProcessoId(UUID processoId);
}
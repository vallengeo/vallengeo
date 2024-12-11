package com.vallengeo.cidadao.repository;

import com.vallengeo.cidadao.model.RelProcessoSituacaoProcesso;
import com.vallengeo.cidadao.model.embeddable.ProcessoSituacaoId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RelProcessoSituacaoProcessoRepository extends JpaRepository<RelProcessoSituacaoProcesso, ProcessoSituacaoId> {
List<RelProcessoSituacaoProcesso> findAllByProcessoIdAndAtivoIsTrue(UUID processoId);
}
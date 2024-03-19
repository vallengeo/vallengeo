package com.vallengeo.cidadao.repository;

import com.vallengeo.cidadao.model.RelProcessoResponsavelTecnico;
import com.vallengeo.cidadao.model.embeddable.ProcessoResponsavelTecnicoId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RelProcessoResponsavelTecnicoRepository extends JpaRepository<RelProcessoResponsavelTecnico, ProcessoResponsavelTecnicoId> {
}
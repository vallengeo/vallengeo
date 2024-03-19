package com.vallengeo.cidadao.repository;

import com.vallengeo.cidadao.model.SituacaoProcesso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SituacaoProcessoRepository extends JpaRepository<SituacaoProcesso, Long> {
}
package com.vallengeo.cidadao.repository;

import com.vallengeo.cidadao.model.NotificacaoVisualizada;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificacaoVisualizadaRepository extends JpaRepository<NotificacaoVisualizada, Long> {
}
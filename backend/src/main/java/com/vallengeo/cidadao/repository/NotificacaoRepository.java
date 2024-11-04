package com.vallengeo.cidadao.repository;

import com.vallengeo.cidadao.model.Notificacao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface NotificacaoRepository extends JpaRepository<Notificacao, Long> {
    @Query(nativeQuery = true, value = """
                    SELECT n.*
                    FROM cidadao.notificacao n
                    INNER JOIN cidadao.imovel i ON i.id = n.id_imovel
                    INNER JOIN cidadao.processo p ON p.id = i.id_processo
                    WHERE p.id_grupo = :grupoId
                        AND n.id NOT IN(
                            SELECT nv.id_notificacao
                            FROM cidadao.notificacao_visualizada nv
                            WHERE nv.id_usuario = :usuarioId
                        )
            """)
    Page<Notificacao> pageNotificacaoNaoVisualizadaPorGrupoIdAndUsuarioId(@Param("grupoId") UUID grupoId, @Param("usuarioId") UUID usuarioId, Pageable pageable);
}
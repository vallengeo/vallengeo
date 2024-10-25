package com.vallengeo.cidadao.repository;

import com.vallengeo.cidadao.model.Imovel;
import com.vallengeo.cidadao.model.Processo;
import com.vallengeo.cidadao.repository.projection.TotalizadorProcessoProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProcessoRepository extends JpaRepository<Processo, UUID> {
Optional<Processo> findByIdAndGrupoId(UUID id, UUID grupoId);
List<Processo> findAllByGrupoIdOrderByDataCadastroDesc(UUID grupoId);

  @Query(nativeQuery = true, value = """
          SELECT * FROM cidadao.processo p
          WHERE p.id_grupo = :grupoId
          """)
  Page<Processo> pageByGrupoId(@Param("grupoId") UUID grupoId, Pageable pageable);

  @Query(nativeQuery = true, value = """
          WITH processos_em_andamento AS
            (SELECT rp.*
             FROM cidadao.rel_processo_situacao_processo rp
             JOIN cidadao.processo p ON p.id = rp.id_processo
             JOIN cidadao.situacao_processo sp ON rp.id_situacao_processo = sp.id
             WHERE p.id_grupo= :grupoId
               AND rp.ativo
               AND sp.codigo IN ('EM_CADASTRAMENTO',
                                 'PENDENTE_UPLOAD_ARQUIVO',
                                 'PENDENTE_VALIDACAO_VINCULO_RT',
                                 'AGUARDANDO_APROVACAO',
                                 'EM_ANALISE')),
               processos_finalizados AS
            (SELECT rp.*
             FROM cidadao.rel_processo_situacao_processo rp
             JOIN cidadao.processo p ON p.id = rp.id_processo
             JOIN cidadao.situacao_processo sp ON rp.id_situacao_processo = sp.id
             WHERE p.id_grupo= :grupoId
               AND rp.ativo
               AND sp.codigo IN ('APROVADO',
                                 'REPROVADO',
                                 'ARQUIVADO'))
          SELECT
            (SELECT COUNT(*)
             FROM cidadao.rel_processo_situacao_processo rp
             JOIN cidadao.processo p ON p.id = rp.id_processo
             WHERE p.id_grupo= :grupoId
               AND rp.ativo) AS total,
                    
            (SELECT COUNT(*)
             FROM cidadao.rel_processo_situacao_processo rp
             JOIN cidadao.processo p ON p.id = rp.id_processo
             WHERE p.id_grupo= :grupoId
               AND rp.ativo
               AND p.data_cadastro >= CURRENT_DATE - interval '1 days') AS novo,
            (SELECT COUNT(*)
             FROM processos_em_andamento) AS andamento,
            (SELECT COUNT(*)
             FROM processos_finalizados) AS finalizado;
          """)
  TotalizadorProcessoProjection buscarTotalizadores(@Param("grupoId") UUID grupoId);
}
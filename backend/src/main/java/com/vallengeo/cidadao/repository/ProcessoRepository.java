package com.vallengeo.cidadao.repository;

import com.vallengeo.cidadao.model.Imovel;
import com.vallengeo.cidadao.model.Processo;
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
}
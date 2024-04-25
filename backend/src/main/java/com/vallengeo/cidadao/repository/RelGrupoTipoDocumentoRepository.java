package com.vallengeo.cidadao.repository;

import com.vallengeo.cidadao.model.RelGrupoTipoDocumento;
import com.vallengeo.cidadao.model.embeddable.GrupoTipoDocumentoId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RelGrupoTipoDocumentoRepository extends JpaRepository<RelGrupoTipoDocumento, GrupoTipoDocumentoId> {
    List<RelGrupoTipoDocumento> findAllByGrupoId(UUID grupoId);

    Optional<RelGrupoTipoDocumento> findByGrupoIdAndTipoDocumentoId(UUID grupoId, Long tipoDocumentoId);

    @Query(value = "SELECT rgtd.* FROM cidadao.rel_grupo_tipo_documento rgtd " +
                   " INNER JOIN cidadao.processo p ON p.id_grupo = rgtd.id_grupo " +
                   " WHERE p.id = :processoId", nativeQuery = true)
    List<RelGrupoTipoDocumento> findAllByProcessoId(@Param("processoId") UUID processoId);

}
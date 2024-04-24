package com.vallengeo.cidadao.repository;

import com.vallengeo.cidadao.model.RelGrupoTipoDocumento;
import com.vallengeo.cidadao.model.embeddable.GrupoTipoDocumentoId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RelGrupoTipoDocumentoRepository extends JpaRepository<RelGrupoTipoDocumento, GrupoTipoDocumentoId> {
    List<RelGrupoTipoDocumento> findAllByGrupoId(UUID grupoId);

    Optional<RelGrupoTipoDocumento> findByGrupoIdAndTipoDocumentoId(UUID grupoId, Long tipoDocumentoId);

}
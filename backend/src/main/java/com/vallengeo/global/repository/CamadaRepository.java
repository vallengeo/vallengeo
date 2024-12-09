package com.vallengeo.global.repository;

import com.vallengeo.global.model.Camada;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CamadaRepository extends JpaRepository<Camada, Long> {
    @Query(nativeQuery = true,
            value = """
                    SELECT c.*
                    FROM dado_global.camada c
                    INNER JOIN dado_global.camada_grupo cg ON cg.id_camada = c.id
                    WHERE cg.id_grupo =:grupoId
                    """)
    List<Camada> findAllByGrupoId(@Param("grupoId") UUID grupoId);
}
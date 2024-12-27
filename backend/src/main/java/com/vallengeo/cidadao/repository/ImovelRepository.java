package com.vallengeo.cidadao.repository;

import com.vallengeo.cidadao.model.Imovel;
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
public interface ImovelRepository extends JpaRepository<Imovel, Long> {
    Optional<Imovel> findByProcessoId(UUID id);

    @Query(nativeQuery = true, value = """
                    SELECT i.id, i.inscricao_imobiliaria, i.id_informacao_imovel, i.id_caracterizacao_imovel, i.id_processo, i.geometria
                    FROM cidadao.imovel i
                    INNER JOIN cidadao.processo p ON i.id_processo = p.id
                    INNER JOIN cidadao.informacao_imovel ii ON ii.id = i.id_informacao_imovel
                    INNER JOIN dado_global.endereco e ON e.id = ii.id_endereco
                    WHERE p.id_grupo = :grupoId
                    AND (REPLACE(unaccent(i.inscricao_imobiliaria),'.','') ilike REPLACE(unaccent(concat('%', :pesquisa, '%')),'.',''))
                    OR (REPLACE(unaccent(p.protocolo),'-','') ilike REPLACE(unaccent(concat('%', :pesquisa, '%')),'-',''))
                    OR (unaccent(e.logradouro) ilike REPLACE(unaccent(concat('%', :pesquisa, '%')),'.',''))
            """)
    Page<Imovel> findAllByGrupoId(@Param("grupoId") UUID grupoId, @Param("pesquisa") String pesquisa, Pageable pageable);

    @Query(nativeQuery = true, value = """
                    SELECT i.id, i.inscricao_imobiliaria, i.id_informacao_imovel, i.id_caracterizacao_imovel, i.id_processo, i.geometria
                    FROM cidadao.imovel i
                    INNER JOIN cidadao.processo p ON i.id_processo = p.id
                    WHERE p.id_grupo = :grupoId
            """)
    List<Imovel> findAllByGrupoId(@Param("grupoId") UUID grupoId);

    List<Imovel> findAllByProcessoIdIn(List<UUID> processosId);
}
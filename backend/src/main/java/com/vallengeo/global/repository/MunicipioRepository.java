package com.vallengeo.global.repository;

import com.vallengeo.global.model.Municipio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface MunicipioRepository extends JpaRepository<Municipio, Integer> {
    List<Municipio> findAllByEstadoIdOrderByNomeAsc(int estadoId);
}
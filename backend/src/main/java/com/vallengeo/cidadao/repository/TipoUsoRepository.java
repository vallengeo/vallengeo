package com.vallengeo.cidadao.repository;

import com.vallengeo.cidadao.model.TipoUso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TipoUsoRepository extends JpaRepository<TipoUso, Long> {

    List<TipoUso> findAllByAtivoIsTrueOrderByOrdem();
}
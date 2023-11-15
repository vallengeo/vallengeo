package com.vallengeo.portal.repository;

import com.vallengeo.portal.model.UsuarioGrupoPerfil;
import com.vallengeo.portal.model.embeddable.RelUsuarioGrupoPerfil;
import org.springframework.data.repository.CrudRepository;

public interface UsuarioGrupoPerfilRepository extends CrudRepository<UsuarioGrupoPerfil, RelUsuarioGrupoPerfil> {
}
package com.vallengeo.portal.repository;

import com.vallengeo.portal.model.UsuarioPerfilTelaPermissao;
import com.vallengeo.portal.model.embeddable.RelUsuarioPerfilTelaPermissao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioPerfilTelaPermissaoRepository extends JpaRepository<UsuarioPerfilTelaPermissao, RelUsuarioPerfilTelaPermissao> {
}
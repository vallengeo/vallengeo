package com.vallengeo.portal.service;

import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.core.util.SecurityUtils;
import com.vallengeo.portal.model.Grupo;
import com.vallengeo.portal.model.Modulo;
import com.vallengeo.portal.payload.response.GrupoResponse;
import com.vallengeo.portal.payload.response.ModuloResponse;
import com.vallengeo.portal.repository.GrupoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class GrupoService {
    private final GrupoRepository grupoRepository;

    public List<GrupoResponse> buscarTodos() {
        return grupoRepository.findAll().stream()
                .map(grupo -> new GrupoResponse(grupo.getId(), grupo.getNome(), grupo.getCodigo(), grupo.getMunicipio().getId()))
                .toList();
    }

    public List<ModuloResponse> buscarModulos(HttpServletRequest request) {
        return grupoRepository.findById(Objects.requireNonNull(SecurityUtils.extractGrupoId(request)))
                .orElseThrow(() -> new ValidatorException("Não foi possível encontrar o grupo.", HttpStatus.NOT_FOUND))
                .getModulos().stream().map(modulo -> new ModuloResponse(modulo.getId(), modulo.getNome()))
                .toList();
    }
}

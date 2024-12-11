package com.vallengeo.global.service;

import com.vallengeo.global.model.Camada;
import com.vallengeo.global.payload.response.CamadaResponse;
import com.vallengeo.global.repository.CamadaRepository;
import com.vallengeo.global.service.mapper.CamadaMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class CamadaService {
    private final CamadaRepository repository;

    public List<CamadaResponse> buscarTodasPeloGrupo(UUID grupoId) {
        List<Camada> camadas = repository.findAllByGrupoId(grupoId);
        return CamadaMapper.INSTANCE.toResponse(camadas);
    }
}

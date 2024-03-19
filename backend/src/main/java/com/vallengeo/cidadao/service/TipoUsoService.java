package com.vallengeo.cidadao.service;

import com.vallengeo.cidadao.payload.response.TipoUsoResponse;
import com.vallengeo.cidadao.repository.TipoUsoRepository;
import com.vallengeo.cidadao.service.mapper.TipoUsoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TipoUsoService {
    private final TipoUsoRepository repository;

    public List<TipoUsoResponse> buscarTodosAtivos() {
        return repository.findAllByAtivoIsTrueOrderByOrdem().stream().map(TipoUsoMapper.INSTANCE::toResponse).toList();
    }
}

package com.vallengeo.cidadao.service;

import com.vallengeo.cidadao.model.CaracterizacaoImovel;
import com.vallengeo.cidadao.payload.request.imovel.CaracterizacaoImovelRequest;
import com.vallengeo.cidadao.repository.CaracterizacaoImovelRepository;
import com.vallengeo.cidadao.service.mapper.CaracterizacaoImovelMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CaracterizacaoImovelService {
    private final CaracterizacaoImovelRepository repository;

    @Transactional
    public CaracterizacaoImovel cadastrar(CaracterizacaoImovelRequest request) {
        return repository.save(CaracterizacaoImovelMapper.INSTANCE.toEntity(request));
    }
}

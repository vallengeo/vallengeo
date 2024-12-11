package com.vallengeo.cidadao.service;

import com.vallengeo.cidadao.model.InformacaoImovel;
import com.vallengeo.cidadao.payload.request.imovel.InformacaoImovelRequest;
import com.vallengeo.cidadao.repository.InformacaoImovelRepository;
import com.vallengeo.cidadao.service.mapper.InformacaoImovelMapper;
import com.vallengeo.global.service.EnderecoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class InformacaoImovelService {
    private final InformacaoImovelRepository repository;
    private final EnderecoService enderecoService;

    @Transactional
    public InformacaoImovel cadastrar(InformacaoImovelRequest request) {
        InformacaoImovel informacaoImovel = InformacaoImovelMapper.INSTANCE.toEntity(request);
        informacaoImovel.setEndereco(enderecoService.salvar(request.endereco()));
        return repository.save(informacaoImovel);
    }
}

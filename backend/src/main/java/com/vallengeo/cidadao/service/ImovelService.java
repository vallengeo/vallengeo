package com.vallengeo.cidadao.service;

import com.vallengeo.cidadao.model.*;
import com.vallengeo.cidadao.payload.request.ProcessoImovelRequest;
import com.vallengeo.cidadao.payload.response.cadastro.imovel.ImovelResponse;
import com.vallengeo.cidadao.repository.ImovelRepository;
import com.vallengeo.cidadao.service.mapper.ImovelMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImovelService {
    private final ImovelRepository repository;
    private final ProcessoService processoService;
    private final RepresentanteService representanteService;
    private final InformacaoImovelService informacaoImovelService;
    private final CaracterizacaoImovelService caracterizacaoImovelService;

    @Transactional
    public ImovelResponse cadastrar(ProcessoImovelRequest input) {

        Processo processo = processoService.cadastrar(input.idGrupo());

        List<Representante> representantes = representanteService.cadastrar(input.imovel().getRepresentantes());
        InformacaoImovel informacaoImovel = informacaoImovelService.cadastrar(input.imovel().getInformacaoImovel());
        CaracterizacaoImovel caracterizacaoImovel = caracterizacaoImovelService.cadastrar(input.imovel().getCaracterizacaoImovel());

        Imovel imovel = repository.save(Imovel.builder()
                .geometria(input.imovel().getGeorreferenciamento().getGeometria())
                .processo(processo)
                .representantes(representantes)
                .informacaoImovel(informacaoImovel)
                .caracterizacaoImovel(caracterizacaoImovel)
                .inscricaoImobiliaria(montaInscricaoImobiliaria(caracterizacaoImovel))
                .build());

        return ImovelMapper.INSTANCE.toResponse(imovel);
    }

    private String montaInscricaoImobiliaria(CaracterizacaoImovel caracterizacaoImovel) {
        return caracterizacaoImovel.getSetor()
               + "." + caracterizacaoImovel.getQuadra() +
               "." + caracterizacaoImovel.getLote() +
               "." + caracterizacaoImovel.getUnidade();
    }
}

package com.vallengeo.cidadao.service;

import com.vallengeo.cidadao.model.*;
import com.vallengeo.cidadao.payload.request.ProcessoImovelRequest;
import com.vallengeo.cidadao.payload.response.FichaImovelResponse;
import com.vallengeo.cidadao.payload.response.cadastro.ProcessoResponse;
import com.vallengeo.cidadao.payload.response.cadastro.imovel.ImovelResponse;
import com.vallengeo.cidadao.payload.response.cadastro.imovel.RepresentanteResponse;
import com.vallengeo.cidadao.repository.ImovelRepository;
import com.vallengeo.cidadao.repository.ProcessoRepository;
import com.vallengeo.cidadao.repository.RelProcessoSituacaoProcessoRepository;
import com.vallengeo.cidadao.service.mapper.ImovelMapper;
import com.vallengeo.cidadao.service.mapper.RepresentanteMapper;
import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.portal.service.PessoaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

import static com.vallengeo.core.util.Constants.NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImovelService {
    private final ImovelRepository repository;
    private final ProcessoRepository processoRepository;
    private final RelProcessoSituacaoProcessoRepository relProcessoSituacaoProcessoRepository;
    private final ProcessoService processoService;
    private final RepresentanteService representanteService;
    private final InformacaoImovelService informacaoImovelService;
    private final CaracterizacaoImovelService caracterizacaoImovelService;
    private final PessoaService pessoaService;
    private final DocumentoService documentoService;

    @Transactional
    public ProcessoResponse cadastrar(ProcessoImovelRequest input) {
    public ProcessoResponse cadastrar(ProcessoImovelRequest input) {

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
        return new ProcessoResponse(processo.getId(), processo.getProtocolo(), ImovelMapper.INSTANCE.toResponse(imovel));
    }

    public FichaImovelResponse fichaImovel(UUID processoId) {
        Imovel imovel = repository.findByProcessoId(processoId).orElseThrow(
                () -> new ValidatorException("Imóvel vinculado ao processo " + processoId + NOT_FOUND, HttpStatus.NOT_FOUND)
        );

        ImovelResponse imovelResponse = ImovelMapper.INSTANCE.toResponse(imovel);

        return FichaImovelResponse.builder()
                .id(imovel.getId())
                .inscricaoImobiliaria(imovel.getInscricaoImobiliaria())
                .informacaoImovel(imovelResponse.getInformacaoImovel())
                .caracterizacaoImovel(imovelResponse.getCaracterizacaoImovel())
                .geometria(imovelResponse.getGeometria())
                .processo(montaFichaProcesso(processoId))
                .representantes(montaRepresentantesPeloImovel(imovel))
                .documentosEnviados(documentoService.buscarDocumentoEnviadoPeloProcesso(processoId))
                .build();
    }

    private String montaInscricaoImobiliaria(CaracterizacaoImovel caracterizacaoImovel) {
        return caracterizacaoImovel.getSetor()
               + "." + caracterizacaoImovel.getQuadra() +
               "." + caracterizacaoImovel.getLote() +
               "." + caracterizacaoImovel.getUnidade();
    }

    private FichaImovelResponse.Processo montaFichaProcesso(UUID processoId) {
        List<RelProcessoSituacaoProcesso> relProcessoSituacaoProcessos = relProcessoSituacaoProcessoRepository.findAllByProcessoIdAndAtivoIsTrue(processoId);
        relProcessoSituacaoProcessos.sort(Comparator.comparing(RelProcessoSituacaoProcesso::getDataAcao).reversed());

        RelProcessoSituacaoProcesso relProcessoSituacaoProcesso = relProcessoSituacaoProcessos.stream().findFirst().orElseThrow(
                () -> new ValidatorException("Processo " + processoId + NOT_FOUND, HttpStatus.NOT_FOUND)
        );

        Processo processo = relProcessoSituacaoProcesso.getProcesso();

        return FichaImovelResponse.Processo.builder()
                .id(processo.getId())
                .protocolo(processo.getProtocolo())
                .ultimaAtualizacao(relProcessoSituacaoProcesso.getDataAcao())
                .Situacao(relProcessoSituacaoProcesso.getSituacaoProcesso().getDescricao())
                .build();
    }

    private List<RepresentanteResponse> montaRepresentantesPeloImovel(Imovel imovel) {
        List<RepresentanteResponse> response = new ArrayList<>();
        imovel.getRepresentantes().forEach(representante -> pessoaService.buscarPorId(representante.getId()).ifPresent(pessoaResponse -> {
            RepresentanteResponse representanteResponse = RepresentanteMapper.INSTANCE.toResponse(pessoaResponse);
            representanteResponse.setContato(RepresentanteMapper.INSTANCE.toResponse(representante).getContato());
            response.add(representanteResponse);
        }));

        return response;
    }
}

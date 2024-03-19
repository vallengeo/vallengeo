package com.vallengeo.cidadao.service;

import com.vallengeo.cidadao.model.Representante;
import com.vallengeo.cidadao.payload.request.imovel.RepresentanteRequest;
import com.vallengeo.cidadao.payload.response.cadastro.imovel.RepresentanteResponse;
import com.vallengeo.cidadao.repository.RepresentanteRepository;
import com.vallengeo.cidadao.service.mapper.RepresentanteMapper;
import com.vallengeo.core.util.DocumentoUtil;
import com.vallengeo.portal.model.Pessoa;
import com.vallengeo.portal.model.PessoaFisica;
import com.vallengeo.portal.model.PessoaJuridica;
import com.vallengeo.portal.payload.request.pessoa.PessoaRequest;
import com.vallengeo.portal.payload.response.PessoaResponse;
import com.vallengeo.portal.repository.PessoaFisicaRepository;
import com.vallengeo.portal.repository.PessoaJuridicaRepository;
import com.vallengeo.portal.service.PessoaService;
import com.vallengeo.portal.service.mapper.PessoaMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class RepresentanteService {
    private final RepresentanteRepository representanteRepository;
    private final PessoaFisicaRepository pessoaFisicaRepository;
    private final PessoaJuridicaRepository pessoaJuridicaRepository;
    private final PessoaService pessoaService;

    @Transactional
    public Representante cadastrar(RepresentanteRequest request) {
        Optional<Pessoa> pessoaOptional = verificaExistenciaPessoa(request);

        if (pessoaOptional.isPresent()) {
            PessoaResponse pessoaResponse = PessoaMapper.INSTANCE.toResponse(pessoaOptional.get());
            Optional<Representante> representanteOptional = representanteRepository.findById(pessoaOptional.get().getId());
            // existe pessoa mas não é representante, então cadastra o representante
            // existe pessoa e representante, então apenas retornar
            return representanteOptional.orElseGet(() -> salvar(request, pessoaResponse));

        } else {
            // cadastrar pessoa
            PessoaResponse pessoaResponse = cadastrarPessoa(request);
            return salvar(request, pessoaResponse);
        }
    }

    @Transactional
    public List<Representante> cadastrar(List<RepresentanteRequest> requests) {
        return requests.stream().map(request -> cadastrar(request)).toList();
    }

    private Optional<Pessoa> verificaExistenciaPessoa(RepresentanteRequest request) {
        Pessoa pessoa = PessoaMapper.INSTANCE.requestToEntity(request);

        return (pessoa instanceof PessoaFisica pessoaFisica)
                ? pessoaFisicaRepository.findByCpf(DocumentoUtil.removeMascara(pessoaFisica.getCpf()))
                : pessoaJuridicaRepository.findByCnpj(DocumentoUtil.removeMascara(((PessoaJuridica) pessoa).getCnpj()));
    }

    private Representante salvar(RepresentanteRequest request, PessoaResponse pessoa) {
        Representante representante = Representante.builder()
                .id(UUID.fromString(pessoa.getId()))
                .contatoNome(request.getContato().getNome())
                .contatoTelefone(request.getContato().getTelefone())
                .contatoEmail(request.getContato().getEmail())
                .build();

        return representanteRepository.save(representante);
    }

    private PessoaResponse cadastrarPessoa(RepresentanteRequest request) {
        PessoaRequest pessoaRequest = PessoaMapper.INSTANCE.representanteRequestToPessoaRequest(request);
        return pessoaService.cadastrar(pessoaRequest);
    }
}

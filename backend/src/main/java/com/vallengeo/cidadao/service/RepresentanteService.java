package com.vallengeo.cidadao.service;

import com.vallengeo.cidadao.model.Representante;
import com.vallengeo.cidadao.payload.request.imovel.RepresentanteRequest;
import com.vallengeo.cidadao.repository.RepresentanteRepository;
import com.vallengeo.core.exceptions.custom.ValidatorException;
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
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

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
        this.validar(request);

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
        List<Representante> representantes = new ArrayList<>();
        requests.forEach(request -> representantes.add(this.cadastrar(request)));
        return representantes;
    }

    private void validar(RepresentanteRequest request) {
        if (Objects.isNull(request.getContato())) {
            log.error("Não foi possível encontrar informações de contato do representante");
            throw new ValidatorException("Não foi possível encontrar informações de contato do representante", HttpStatus.NOT_ACCEPTABLE);
        }

        boolean isResponsavelTecnicoTrue = Boolean.TRUE.equals(request.getContato().getResponsavelTecnico());
        boolean isRepresentanteLegalTrue = Boolean.TRUE.equals(request.getContato().getRepresentanteLegal());
        boolean isOutroTrue = Boolean.TRUE.equals(request.getContato().getOutro());

        int trueCount = (isResponsavelTecnicoTrue ? 1 : 0) +
                        (isRepresentanteLegalTrue ? 1 : 0) +
                        (isOutroTrue ? 1 : 0);

        if (trueCount != 1) {
            log.error("O tipo informações de contato do representante é obrigatório.");
            throw new ValidatorException("O tipo informações de contato do representante é obrigatório.", HttpStatus.NOT_ACCEPTABLE);
        }
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
                .contatoDocumento(DocumentoUtil.removeMascara(request.getContato().getDocumento()))
                .responsavelTecnico(request.getContato().getResponsavelTecnico())
                .representanteLegal(request.getContato().getRepresentanteLegal())
                .outro(request.getContato().getOutro())
                .build();

        return representanteRepository.save(representante);
    }

    private PessoaResponse cadastrarPessoa(RepresentanteRequest request) {
        PessoaRequest pessoaRequest = PessoaMapper.INSTANCE.representanteRequestToPessoaRequest(request);
        return pessoaService.cadastrar(pessoaRequest);
    }
}

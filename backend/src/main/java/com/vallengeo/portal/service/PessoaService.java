package com.vallengeo.portal.service;

import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.core.util.DocumentoUtil;
import com.vallengeo.global.service.EnderecoService;
import com.vallengeo.portal.model.Pessoa;
import com.vallengeo.portal.model.PessoaFisica;
import com.vallengeo.portal.model.PessoaJuridica;
import com.vallengeo.portal.payload.request.pessoa.PessoaRequest;
import com.vallengeo.portal.payload.response.PessoaResponse;
import com.vallengeo.portal.repository.PessoaFisicaRepository;
import com.vallengeo.portal.repository.PessoaJuridicaRepository;
import com.vallengeo.portal.repository.PessoaRepository;
import com.vallengeo.portal.service.mapper.PessoaMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

import static com.vallengeo.core.util.Constants.NOT_FOUND;
import static com.vallengeo.core.util.Constants.PARAMETER_DIVERGENT;

@Slf4j
@Service
@RequiredArgsConstructor
public class PessoaService {
    private final PessoaRepository pessoaRepository;
    private final PessoaFisicaRepository pessoaFisicaRepository;
    private final PessoaJuridicaRepository pessoaJuridicaRepository;

    private final EnderecoService enderecoService;

    @Transactional
    public PessoaResponse cadastrar(PessoaRequest request) {
        Pessoa pessoa = PessoaMapper.INSTANCE.requestToEntity(request);
        validaNovaPessoa(pessoa);
        return PessoaMapper.INSTANCE.toResponse(salvar(pessoa));
    }

    @Transactional
    public PessoaResponse editar(UUID id, PessoaRequest request) {
        if (!Objects.equals(id.toString(), request.getId())) {
            throw new ValidatorException(PARAMETER_DIVERGENT, HttpStatus.NOT_ACCEPTABLE);
        }

        if (buscarPessoaPorId(UUID.fromString(request.getId())).isEmpty()) {
            throw new ValidatorException("Pessoa com o identificador " + id + NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        Pessoa pessoa = PessoaMapper.INSTANCE.requestToEntity(request);
        return PessoaMapper.INSTANCE.toResponse(salvar(pessoa));
    }

    public List<PessoaResponse> buscarTodas() {
        List<PessoaResponse> response = new ArrayList<>();
        pessoaRepository.findAll().forEach(pessoa -> response.add(PessoaMapper.INSTANCE.toResponse(pessoa)));
        return response;
    }

    public Optional<PessoaResponse> buscarPorDocumento(String documento) {
        return buscarPessoaPorDocumento(documento).map(PessoaMapper.INSTANCE::toResponse);
    }

    public Optional<PessoaResponse> buscarPorId(UUID id) {
        return buscarPessoaPorId(id).map(PessoaMapper.INSTANCE::toResponse);
    }

    private void validaNovaPessoa(Pessoa pessoa) {
        validaPessoaExistente(pessoa);
    }

    private void validaPessoaExistente(Pessoa pessoa) {
        Optional<Pessoa> pessoaDocumento = (pessoa instanceof PessoaFisica pessoaFisica)
                ? pessoaFisicaRepository.findByCpf(DocumentoUtil.removeMascara(pessoaFisica.getCpf()))
                : pessoaJuridicaRepository.findByCnpj(DocumentoUtil.removeMascara(((PessoaJuridica) pessoa).getCnpj()));

        if (pessoaDocumento.isPresent() && !pessoa.equals(pessoaDocumento.get())) {
            throw new ValidatorException((pessoa instanceof PessoaFisica ? "CPF" : "CNPJ") + " já cadastrado no sistema.", HttpStatus.CONFLICT);
        }
    }

    private Optional<Pessoa> buscarPessoaPorDocumento(String documento) {
        Optional<Pessoa> response = pessoaFisicaRepository.findByCpf(DocumentoUtil.removeMascara(documento));
        if (response.isPresent()) {
            return response;
        }
        return pessoaJuridicaRepository.findByCnpj(DocumentoUtil.removeMascara(documento));
    }

    private Pessoa salvar(Pessoa pessoa) {
       pessoa.setEndereco(enderecoService.salvar(pessoa.getEndereco()));
        if (pessoa instanceof PessoaFisica pessoaFisica) {
            pessoaFisica.setCpf(DocumentoUtil.removeMascara(pessoaFisica.getCpf()));
            pessoaFisica.setRg(DocumentoUtil.removeMascara(pessoaFisica.getRg()));
            return pessoaFisicaRepository.save(pessoaFisica);
        } else {
            PessoaJuridica pessoaJuridica = (PessoaJuridica) pessoa;

            PessoaFisica responsavel = pessoaJuridica.getResponsavel();
            responsavel.setCpf(DocumentoUtil.removeMascara(responsavel.getCpf()));
            responsavel.setRg(DocumentoUtil.removeMascara(responsavel.getRg()));

            pessoaFisicaRepository
                    .findByCpf(DocumentoUtil.removeMascara(pessoaJuridica.getResponsavel().getCpf()))
                    .ifPresentOrElse(pf -> pessoaJuridica.setResponsavel((PessoaFisica) pf)
                            , () -> {
                                responsavel.setEndereco(enderecoService.salvar(responsavel.getEndereco()));
                                pessoaJuridica.setResponsavel(pessoaFisicaRepository.save(responsavel));
                            }
                    );

            pessoaJuridica.setCnpj(DocumentoUtil.removeMascara(pessoaJuridica.getCnpj()));
            return pessoaJuridicaRepository.save(pessoaJuridica);
        }

    }

    private Optional<Pessoa> buscarPessoaPorId(UUID id) {
        Optional<Pessoa> response = pessoaFisicaRepository.findPessoaById(id);
        if (response.isPresent()) {
            return response;
        }
        return pessoaJuridicaRepository.findPessoaById(id);
    }
}

package com.vallengeo.global.service;

import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.global.model.Endereco;
import com.vallengeo.global.payload.request.EnderecoRequest;
import com.vallengeo.global.repository.EnderecoRepository;
import com.vallengeo.global.repository.MunicipioRepository;
import com.vallengeo.global.service.mapper.EnderecoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import static com.vallengeo.core.util.Constants.NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
public class EnderecoService {
    private final EnderecoRepository repository;
    private final MunicipioRepository municipioRepository;

    @Transactional
    public Endereco salvar(Endereco endereco) {
        verificaMunicipioExiste(endereco);
        if (verificaEnderecoExiste(endereco)) {
            return buscaEnderecoPorDadosCompletos(endereco);
        }
        return repository.save(endereco);
    }

    @Transactional
    public Endereco salvar(EnderecoRequest endereco) {
        return salvar(EnderecoMapper.INSTANCE.toEntity(endereco));
    }

    public Endereco buscaEnderecoPorDadosCompletos(Endereco endereco) {
        return repository.findByCepAndLogradouroAndNumeroAndBairro(endereco.getCep(), endereco.getLogradouro(), endereco.getNumero(), endereco.getBairro())
                .orElseThrow(() -> new ValidatorException("Endereço informado " + NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    private boolean verificaEnderecoExiste(Endereco endereco) {
        return repository.existsByCepAndLogradouroAndNumeroAndBairro(endereco.getCep(), endereco.getLogradouro(), endereco.getNumero(), endereco.getBairro());

    }

    private void verificaMunicipioExiste(Endereco endereco) {
        if (municipioRepository.findById(endereco.getMunicipio().getId()).isEmpty()) {
            throw new ValidatorException("Município Id " + endereco.getMunicipio().getId() + NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }


}

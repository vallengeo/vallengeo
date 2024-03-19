package com.vallengeo.global.service;

import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.global.feignclient.ViaCepFeignClient;
import com.vallengeo.global.payload.response.EnderecoViaCepResponse;
import com.vallengeo.global.payload.response.ViaCepResponse;
import com.vallengeo.global.payload.response.localidade.EstadoResponse;
import com.vallengeo.global.payload.response.localidade.MunicipioResponse;
import com.vallengeo.global.repository.EstadoRepository;
import com.vallengeo.global.repository.MunicipioRepository;
import com.vallengeo.global.service.mapper.EstadoMapper;
import com.vallengeo.global.service.mapper.MunicipioMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

import static com.vallengeo.core.util.Constants.NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
public class LocalidadeService {
    private final ViaCepFeignClient viaCepFeign;
    private final EstadoRepository estadoRepository;
    private final MunicipioRepository municipioRepository;

    public EnderecoViaCepResponse buscarViaCep(String cep) {
        log.info("Buscando endereço pelo CEP {} ViaCep API", cep);

        ViaCepResponse response = viaCepFeign.query(cep.replace("-", ""));
        if (Objects.isNull(response.ibge())) {
            throw new ValidatorException("Endereço para o CEP " + cep + NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return estadoRepository.findByUf(response.uf()).map(estado -> new EnderecoViaCepResponse(response.cep(), response.logradouro(), response.complemento(), response.bairro(),
                        new MunicipioResponse(Integer.parseInt(response.ibge()), response.localidade(), new EstadoResponse(estado.getId(), estado.getNome(), estado.getUf()))))
                .orElseThrow(() -> new ValidatorException("Estado " + response.uf() + NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    public List<EstadoResponse> buscarTodosEstados() {
        return estadoRepository.findAll(Sort.by(Sort.Direction.ASC, "nome")).stream().map(EstadoMapper.INSTANCE::toResponse).toList();
    }

    public EstadoResponse buscarEstadoPorUf(String uf) {
        return estadoRepository.findByUf(uf.toUpperCase()).map(EstadoMapper.INSTANCE::toResponse)
                .orElseThrow(() -> new ValidatorException("Estado " + uf.toUpperCase() + NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    public EstadoResponse buscarEstadoPorId(int id) {
        return estadoRepository.findById(id).map(EstadoMapper.INSTANCE::toResponse)
                .orElseThrow(() -> new ValidatorException("Estado identificador " + id + NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    public List<MunicipioResponse> buscarMunicipiosPeloEstadoId(int estadoId) {
        return municipioRepository.findAllByEstadoIdOrderByNomeAsc(estadoId).stream().map(MunicipioMapper.INSTANCE::toResponse)
        .toList();
    }

    public MunicipioResponse buscarMunicipiosPeloId(int id) {
        return municipioRepository.findById(id).map(MunicipioMapper.INSTANCE::toResponse)
                .orElseThrow(() -> new ValidatorException("Município identificador " + id + NOT_FOUND, HttpStatus.NOT_FOUND));
    }
}

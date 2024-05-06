package com.vallengeo.portal.service.mapper;

import com.vallengeo.cidadao.payload.request.imovel.RepresentanteRequest;
import com.vallengeo.portal.model.Pessoa;
import com.vallengeo.portal.model.PessoaFisica;
import com.vallengeo.portal.model.PessoaJuridica;
import com.vallengeo.portal.payload.request.pessoa.PessoaRequest;
import com.vallengeo.portal.payload.response.PessoaResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PessoaMapper {
    PessoaMapper INSTANCE = Mappers.getMapper(PessoaMapper.class);

    @Mapping(source = "endereco.idMunicipio", target = "endereco.municipio.id")
    @Mapping(target = "dataCadastro", ignore = true)
    @Mapping(target = "dataAtualizacao", ignore = true)
    PessoaFisica requestToEntity(PessoaRequest.PessoaFisicaRequest request);

    @Mapping(source = "endereco.idMunicipio", target = "endereco.municipio.id")
    @Mapping(target = "dataCadastro", ignore = true)
    @Mapping(target = "dataAtualizacao", ignore = true)
    PessoaFisica requestToEntity(RepresentanteRequest.PessoaFisicaRequest request);

    @Mapping(source = "endereco.idMunicipio", target = "endereco.municipio.id")
    @Mapping(target = "dataCadastro", ignore = true)
    @Mapping(target = "dataAtualizacao", ignore = true)
    PessoaJuridica requestToEntity(PessoaRequest.PessoaJuridicaRequest request);

    @Mapping(source = "endereco.idMunicipio", target = "endereco.municipio.id")
    @Mapping(target = "dataCadastro", ignore = true)
    @Mapping(target = "dataAtualizacao", ignore = true)
    PessoaJuridica requestToEntity(RepresentanteRequest.PessoaJuridicaRequest request);

    @Mapping(target = "tipoPessoa", ignore = true)
    PessoaResponse.PessoaFisica toResponse(PessoaFisica pessoaFisica);

    @Mapping(target = "tipoPessoa", ignore = true)
    PessoaResponse.PessoaJuridica toResponse(PessoaJuridica pessoaJuridica);

    PessoaRequest.PessoaFisicaRequest representanteRequestToPessoaRequest(RepresentanteRequest.PessoaFisicaRequest pessoaFisica);

    PessoaRequest.PessoaJuridicaRequest representanteRequestToPessoaRequest(RepresentanteRequest.PessoaJuridicaRequest pessoaJuridica);

    default Pessoa requestToEntity(PessoaRequest request) {
        if (request instanceof PessoaRequest.PessoaFisicaRequest) {
            return requestToEntity(request);
        } else {
            return requestToEntity((PessoaRequest.PessoaJuridicaRequest) request);
        }
    }

    default Pessoa requestToEntity(RepresentanteRequest request) {
        if (request instanceof RepresentanteRequest.PessoaFisicaRequest) {
            return requestToEntity((RepresentanteRequest.PessoaFisicaRequest) request);
        } else {
            return requestToEntity((RepresentanteRequest.PessoaJuridicaRequest) request);
        }
    }

    default PessoaResponse toResponse(Pessoa pessoa) {
        if (pessoa instanceof PessoaFisica pessoaFisica) {
            return toResponse(pessoaFisica);
        } else {
            return toResponse((PessoaJuridica) pessoa);
        }
    }

    default PessoaRequest representanteRequestToPessoaRequest(RepresentanteRequest request) {
        if (request instanceof RepresentanteRequest.PessoaFisicaRequest pessoaFisicaRequest) {
            return representanteRequestToPessoaRequest(pessoaFisicaRequest);
        } else {
            return representanteRequestToPessoaRequest((RepresentanteRequest.PessoaJuridicaRequest) request);
        }
    }
}

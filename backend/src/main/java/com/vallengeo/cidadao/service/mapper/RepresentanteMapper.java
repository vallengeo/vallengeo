package com.vallengeo.cidadao.service.mapper;

import com.vallengeo.cidadao.payload.response.cadastro.imovel.RepresentanteResponse;
import com.vallengeo.portal.payload.response.PessoaResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface RepresentanteMapper {
    RepresentanteMapper INSTANCE = Mappers.getMapper(RepresentanteMapper.class);

    @Mapping(target = "tipoPessoa", ignore = true)
    RepresentanteResponse.PessoaFisica pessoaResponseToResponse(PessoaResponse.PessoaFisica pessoaFisica);

    @Mapping(target = "tipoPessoa", ignore = true)
    RepresentanteResponse.PessoaJuridica pessoaResponseToResponse(PessoaResponse.PessoaJuridica pessoaJuridica);

    default RepresentanteResponse pessoaResponseToResponse(PessoaResponse pessoa) {
        if (pessoa instanceof PessoaResponse.PessoaFisica pessoaFisica) {
            return pessoaResponseToResponse(pessoaFisica);
        } else {
            return pessoaResponseToResponse((PessoaResponse.PessoaJuridica) pessoa);
        }
    }

}

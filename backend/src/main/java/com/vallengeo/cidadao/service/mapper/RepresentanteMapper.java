package com.vallengeo.cidadao.service.mapper;

import com.vallengeo.cidadao.model.Representante;
import com.vallengeo.cidadao.payload.response.cadastro.imovel.RepresentanteResponse;
import com.vallengeo.portal.payload.response.PessoaResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface RepresentanteMapper {
    RepresentanteMapper INSTANCE = Mappers.getMapper(RepresentanteMapper.class);

    @Mapping(target = "contato.nome", source = "contatoNome")
    @Mapping(target = "contato.email", source = "contatoEmail")
    @Mapping(target = "contato.telefone", source = "contatoTelefone")
    @Mapping(target = "contato.documento", source = "contatoDocumento")
    @Mapping(target = "contato.representanteLegal", source = "representanteLegal")
    @Mapping(target = "contato.responsavelTecnico", source = "responsavelTecnico")
    @Mapping(target = "contato.outro", source = "outro")
    RepresentanteResponse toResponse(Representante representante);

    @Mapping(target = "tipoPessoa", ignore = true)
    RepresentanteResponse.PessoaFisica toResponse(PessoaResponse.PessoaFisica pessoaFisica);

    @Mapping(target = "tipoPessoa", ignore = true)
    @Mapping(target = "responsavel.contato", ignore = true)
    RepresentanteResponse.PessoaJuridica toResponse(PessoaResponse.PessoaJuridica pessoaJuridica);

    default RepresentanteResponse toResponse(PessoaResponse pessoa) {
        if (pessoa instanceof PessoaResponse.PessoaFisica pessoaFisica) {
            return toResponse(pessoaFisica);
        } else {
            return toResponse((PessoaResponse.PessoaJuridica) pessoa);
        }
    }
}

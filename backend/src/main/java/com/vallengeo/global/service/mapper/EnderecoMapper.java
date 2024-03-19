package com.vallengeo.global.service.mapper;

import com.vallengeo.core.service.mapper.EntityMapper;
import com.vallengeo.global.model.Endereco;
import com.vallengeo.global.payload.request.EnderecoRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface EnderecoMapper extends EntityMapper<EnderecoRequest, Endereco> {
    EnderecoMapper INSTANCE = Mappers.getMapper(EnderecoMapper.class);

    @Mapping(source = "idMunicipio", target = "municipio.id")
    Endereco toEntity(EnderecoRequest request);
}

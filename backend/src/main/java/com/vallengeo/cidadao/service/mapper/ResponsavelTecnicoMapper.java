package com.vallengeo.cidadao.service.mapper;

import com.vallengeo.cidadao.model.ResponsavelTecnico;
import com.vallengeo.cidadao.payload.request.ResponsavelTecnicoRequest;
import com.vallengeo.core.service.mapper.EntityMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ResponsavelTecnicoMapper extends EntityMapper<ResponsavelTecnicoRequest, ResponsavelTecnico> {
    ResponsavelTecnicoMapper INSTANCE = Mappers.getMapper(ResponsavelTecnicoMapper.class);
}

package com.vallengeo.global.service.mapper;

import com.vallengeo.core.service.mapper.EntityMapper;
import com.vallengeo.global.model.Municipio;
import com.vallengeo.global.payload.response.localidade.MunicipioResponse;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MunicipioMapper extends EntityMapper<MunicipioResponse, Municipio> {
    MunicipioMapper INSTANCE = Mappers.getMapper(MunicipioMapper.class);
}

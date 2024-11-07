package com.vallengeo.global.service.mapper;

import com.vallengeo.core.service.mapper.EntityMapper;
import com.vallengeo.global.model.CamadaCategoria;
import com.vallengeo.global.payload.response.CamadaCategoriaResponse;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CamadaCategoriaMapper extends EntityMapper<CamadaCategoriaResponse, CamadaCategoria> {
    CamadaCategoriaMapper INSTANCE = Mappers.getMapper(CamadaCategoriaMapper.class);
}

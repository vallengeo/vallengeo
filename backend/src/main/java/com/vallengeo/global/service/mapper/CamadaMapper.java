package com.vallengeo.global.service.mapper;

import com.vallengeo.core.service.mapper.EntityMapper;
import com.vallengeo.global.model.Camada;
import com.vallengeo.global.payload.response.CamadaResponse;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CamadaMapper extends EntityMapper<CamadaResponse, Camada> {
    CamadaMapper INSTANCE = Mappers.getMapper(CamadaMapper.class);
}

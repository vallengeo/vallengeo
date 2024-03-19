package com.vallengeo.global.service.mapper;

import com.vallengeo.core.service.mapper.EntityMapper;
import com.vallengeo.global.model.Estado;
import com.vallengeo.global.payload.response.localidade.EstadoResponse;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface EstadoMapper extends EntityMapper<EstadoResponse, Estado> {
    EstadoMapper INSTANCE = Mappers.getMapper(EstadoMapper.class);

}

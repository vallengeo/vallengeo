package com.vallengeo.cidadao.service.mapper;

import com.vallengeo.cidadao.model.TipoUso;
import com.vallengeo.cidadao.payload.response.TipoUsoResponse;
import com.vallengeo.core.service.mapper.EntityMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TipoUsoMapper extends EntityMapper<TipoUsoResponse, TipoUso> {
    TipoUsoMapper INSTANCE = Mappers.getMapper(TipoUsoMapper.class);
}

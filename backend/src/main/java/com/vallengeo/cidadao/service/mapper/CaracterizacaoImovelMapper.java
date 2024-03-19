package com.vallengeo.cidadao.service.mapper;

import com.vallengeo.cidadao.model.CaracterizacaoImovel;
import com.vallengeo.cidadao.payload.request.imovel.CaracterizacaoImovelRequest;
import com.vallengeo.core.service.mapper.EntityMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CaracterizacaoImovelMapper extends EntityMapper<CaracterizacaoImovelRequest, CaracterizacaoImovel> {
    CaracterizacaoImovelMapper INSTANCE = Mappers.getMapper(CaracterizacaoImovelMapper.class);
}

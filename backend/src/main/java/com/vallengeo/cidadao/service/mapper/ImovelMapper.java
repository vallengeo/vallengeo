package com.vallengeo.cidadao.service.mapper;

import com.vallengeo.cidadao.model.Imovel;
import com.vallengeo.cidadao.payload.response.cadastro.imovel.ImovelResponse;
import com.vallengeo.core.service.mapper.EntityMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ImovelMapper extends EntityMapper<ImovelResponse, Imovel> {
    ImovelMapper INSTANCE = Mappers.getMapper(ImovelMapper.class);

}

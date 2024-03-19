package com.vallengeo.cidadao.service.mapper;


import com.vallengeo.cidadao.model.InformacaoImovel;
import com.vallengeo.cidadao.payload.request.imovel.InformacaoImovelRequest;
import com.vallengeo.core.service.mapper.EntityMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface InformacaoImovelMapper extends EntityMapper<InformacaoImovelRequest, InformacaoImovel> {
    InformacaoImovelMapper INSTANCE = Mappers.getMapper(InformacaoImovelMapper.class);
}

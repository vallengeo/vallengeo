package com.vallengeo.cidadao.service.mapper;

import com.vallengeo.cidadao.model.HistoricoAnotacaoConsideracaoTecnica;
import com.vallengeo.cidadao.payload.response.HistoricoAnotacaoConsideracaoTecnicaResponse;
import com.vallengeo.core.service.mapper.EntityMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface HistoricoAnotacaoConsideracaoTecnicaMapper extends EntityMapper<HistoricoAnotacaoConsideracaoTecnicaResponse, HistoricoAnotacaoConsideracaoTecnica> {
    HistoricoAnotacaoConsideracaoTecnicaMapper INSTANCE = Mappers.getMapper(HistoricoAnotacaoConsideracaoTecnicaMapper.class);
}

package com.vallengeo.cidadao.service.mapper;

import com.vallengeo.cidadao.model.Processo;
import com.vallengeo.cidadao.payload.response.cadastro.ProcessoResponse;
import com.vallengeo.core.service.mapper.EntityMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProcessoMapper extends EntityMapper<ProcessoResponse, Processo> {
    ProcessoMapper INSTANCE = Mappers.getMapper(ProcessoMapper.class);

}

package com.vallengeo.cidadao.service.mapper;

import com.vallengeo.cidadao.model.Documento;
import com.vallengeo.cidadao.model.TipoDocumento;
import com.vallengeo.cidadao.payload.response.DocumentoResponse;
import com.vallengeo.core.service.mapper.EntityMapper;
import com.vallengeo.global.model.Arquivo;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Mapper
public interface DocumentoMapper extends EntityMapper<DocumentoResponse, Documento> {
    DocumentoMapper INSTANCE = Mappers.getMapper(DocumentoMapper.class);

    @Override
    default Documento toEntity(DocumentoResponse dto) {
        if (dto == null) {
            return null;
        }

        Arquivo.ArquivoBuilder documento = Arquivo.builder();

        return (Documento) documento.build();
    }

    @Override
    default DocumentoResponse toResponse(Documento entity) {
        if (entity == null) {
            return null;
        }

        DocumentoResponse.DocumentoResponseBuilder documentoResponse = DocumentoResponse.builder();

        documentoResponse.tipoDocumento(tipoDocumentoToTipoDocumentoResponse(entity.getTipoDocumento()));

        return documentoResponse.build();
    }

    @Override
    default List<Documento> toEntity(List<DocumentoResponse> dtoList) {
        if (dtoList == null) {
            return Collections.emptyList();
        }

        List<Documento> list = new ArrayList<>(dtoList.size());
        for (DocumentoResponse documentoResponse : dtoList) {
            list.add(toEntity(documentoResponse));
        }

        return list;
    }

    @Override
    default List<DocumentoResponse> toResponse(List<Documento> entityList) {
        if (entityList == null) {
            return Collections.emptyList();
        }

        List<DocumentoResponse> list = new ArrayList<>(entityList.size());
        for (Documento documento : entityList) {
            list.add(toResponse(documento));
        }

        return list;
    }

    default DocumentoResponse.TipoDocumentoResponse tipoDocumentoToTipoDocumentoResponse(TipoDocumento tipoDocumento) {
        if (tipoDocumento == null) {
            return null;
        }

        DocumentoResponse.TipoDocumentoResponse.TipoDocumentoResponseBuilder tipoDocumentoResponse = DocumentoResponse.TipoDocumentoResponse.builder();

        tipoDocumentoResponse.id(tipoDocumento.getId());
        tipoDocumentoResponse.titulo(tipoDocumento.getTitulo());

        return tipoDocumentoResponse.build();
    }
}

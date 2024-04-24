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

        Arquivo documento = Arquivo.builder()
                .id(dto.getId())
                .nome(dto.getNome())
                .extensao(dto.getExtensao())
                .tamanho(dto.getTamanho())
                .dataEnvio(dto.getDataEnvio())
                .build();

        return new Documento(documento);
    }

    @Override
    default DocumentoResponse toResponse(Documento entity) {
        if (entity == null) {
            return null;
        }

        DocumentoResponse.DocumentoResponseBuilder documentoResponse = DocumentoResponse.builder();

        documentoResponse.id(entity.getId());
        documentoResponse.nome(entity.getNome());
        documentoResponse.extensao(entity.getExtensao());
        documentoResponse.tamanho(entity.getTamanho());
        documentoResponse.dataEnvio(entity.getDataEnvio());
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

        Long id = null;
        String titulo = null;

        id = tipoDocumento.getId();
        titulo = tipoDocumento.getTitulo();

        return new DocumentoResponse.TipoDocumentoResponse(id, titulo);
    }
}

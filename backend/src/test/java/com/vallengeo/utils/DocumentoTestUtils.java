package com.vallengeo.utils;

import com.vallengeo.cidadao.model.Documento;
import com.vallengeo.cidadao.model.Processo;
import com.vallengeo.cidadao.model.TipoDocumento;
import com.vallengeo.cidadao.payload.request.DocumentoTemporarioRequest;
import com.vallengeo.cidadao.payload.request.ProcessoDocumentoRequest;

import java.time.LocalDateTime;
import java.util.List;

public class DocumentoTestUtils {

    public static Documento getDocumento(Processo processo, TipoDocumento tipoDocumento) {
        var documento = new Documento();

        documento.setProcesso(processo);
        documento.setTipoDocumento(tipoDocumento);
        documento.setNome("pdf_test_file");
        documento.setExtensao(".pdf");
        documento.setTamanho(255);
        documento.setDataEnvio(LocalDateTime.now());

        return documento;
    }

    public static Documento getDocumentoByTipoDocumento(Processo processo, TipoDocumento tipoDocumento) {
        String extensaoArquivo = tipoDocumento.getFormato().split(",")[0].replace(",", "");
        String nomeArquivo = extensaoArquivo.replace(".", "") + "_test-file";

        Documento documento = new Documento();
        documento.setProcesso(processo);
        documento.setTipoDocumento(tipoDocumento);
        documento.setNome(nomeArquivo);
        documento.setExtensao(extensaoArquivo);
        documento.setTamanho(255);
        documento.setDataEnvio(LocalDateTime.now());

        return documento;
    }

    public static DocumentoTemporarioRequest getDocTemporarioRequest(
            String nomeTemporario, String nomeOriginal, Long tipoDocumentoId
    ) {
        var documentoTemporarioRequest = new DocumentoTemporarioRequest();
        documentoTemporarioRequest.setIdTipoDocumento(tipoDocumentoId);
        documentoTemporarioRequest.setDataEnvio(LocalDateTime.now());
        documentoTemporarioRequest.setNomeTemporario(nomeTemporario);
        documentoTemporarioRequest.setNomeOriginal(nomeOriginal);

        return documentoTemporarioRequest;
    }

    public static ProcessoDocumentoRequest getProcessoDocumentoRequest(
            List<DocumentoTemporarioRequest> documentos, String idProcesso
    ) {
        var request = new ProcessoDocumentoRequest();
        request.setDocumentos(documentos);
        request.setIdProcesso(idProcesso);

        return request;
    }
}

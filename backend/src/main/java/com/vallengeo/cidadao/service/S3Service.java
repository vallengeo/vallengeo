package com.vallengeo.cidadao.service;

import com.google.common.base.Throwables;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3Service {
    private final S3Client s3Client;

    @Value("${application.bucket.name}")
    private String bucketName;

    public static final String LOG_PREFIX = "[AWS S3] - ";

    public String uploadMultipartFile(MultipartFile file, String filename,  String extensao) {
        try {
            String nomeArquivo = filename + extensao;

            log.info(LOG_PREFIX + "Realizando upload do arquivo {} na S3", nomeArquivo);
            byte[] bytesFile = convertMultiPartFileToFile(file);

            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(nomeArquivo)
                    .contentType("application/octet-stream")
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(bytesFile));



            return "File uploaded: " + nomeArquivo;
        } catch (Exception e) {
            log.error("Não foi possível efetuar o upload do arquivo. " + Throwables.getStackTraceAsString(e));
            throw new RuntimeException(e);
        }
    }

    public String uploadFile(File file, String filename,  String extensao) {
        try {
            String nomeArquivo = filename + extensao;

            log.info(LOG_PREFIX + "Realizando upload do arquivo {} na S3", nomeArquivo);
            byte[] bytesFile = convertFileToBytes(file);

            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(nomeArquivo)
                    .contentType("application/octet-stream")
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(bytesFile));


            return "File uploaded: " + nomeArquivo;
        } catch (Exception e) {
            log.error("Não foi possível efetuar o upload do arquivo. " + Throwables.getStackTraceAsString(e));
            throw new RuntimeException(e);
        }
    }

    public byte[] downloadFile(String filename,  String extensao) {
        try {
            String nomeArquivo = filename + extensao;

            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                    .bucket(bucketName)
                    .key(nomeArquivo)
                    .build();

            return s3Client.getObject(getObjectRequest).readAllBytes();
        } catch (Exception e) {
            log.error("Não foi possível efetuar o download do arquivo. " + Throwables.getStackTraceAsString(e));
            throw new RuntimeException(e);
        }
    }

    public String getContentTypeFromS3(String filename,  String extensao) {
        String nomeArquivo = filename + extensao;
        try {

            // Solicita os metadados do objeto no S3
            HeadObjectRequest headObjectRequest = HeadObjectRequest.builder()
                    .bucket(bucketName)
                    .key(nomeArquivo)
                    .build();

            // Obtém a resposta que contém os metadados, incluindo Content-Type
            HeadObjectResponse response = s3Client.headObject(headObjectRequest);

            // Retorna o Content-Type
            return response.contentType();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar Content-Type do S3 para o arquivo: " + nomeArquivo, e);
        }
    }

    private byte[] convertMultiPartFileToFile(MultipartFile file) {
        try  {
            return file.getBytes();
        } catch (IOException e) {
            log.error("Erro convertMultiPartFile. " + Throwables.getStackTraceAsString(e));
            throw new RuntimeException(e);
        }
    }
    private byte[] convertFileToBytes(File file) {
        try (FileInputStream fis = new FileInputStream(file)) {
            return fis.readAllBytes();
        } catch (IOException e) {
            log.error("Erro ao converter File para byte[]. " + Throwables.getStackTraceAsString(e));
            throw new RuntimeException("Erro ao processar o arquivo.", e);
        }
    }
}

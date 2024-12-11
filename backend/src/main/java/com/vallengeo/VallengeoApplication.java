package com.vallengeo;

import com.vallengeo.core.exceptions.custom.ValidatorException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.event.EventListener;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static com.vallengeo.core.config.Config.APPLICATION_TEMP_UPLOAD;

@SpringBootApplication
@EnableFeignClients
public class VallengeoApplication {

    public static void main(String[] args) {
        SpringApplication.run(VallengeoApplication.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void criarPastaTemp() {
        try {
            Path dir = Paths.get(APPLICATION_TEMP_UPLOAD);
            if (!Files.exists(dir)) {
                Files.createDirectory(dir);
            }
        } catch (IOException e) {
            throw new ValidatorException("Não foi possível criar a pasta para upload de arquivos!");
        }
    }

}

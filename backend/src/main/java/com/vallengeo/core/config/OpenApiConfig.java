package com.vallengeo.core.config;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.GroupedOpenApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer",
        description = "Serviço de autorização para a API"
)
public class OpenApiConfig {

    @Value("${spring.profiles.active:dev}") // Obtém o perfil ativo, padrão é 'dev'
    private String activeProfile;

    @Bean
    public OpenAPI customOpenAPI() {
        OpenAPI openAPI = new OpenAPI()
                .components(new Components())
                .info(new Info()
                        .title("VallenGeo - Documentação da API")
                        .description("VallenGeo - uma plataforma de geoprocessamento da Vallenge Engenharia.")
                        .contact(new Contact().name("Vallenge Engenharia")
                                .url("http://vallenge.com.br/")
                                .email("contato@vallenge.com.br"))
                        .version("1.0")
                );

        // Configura servidores com base no perfil ativo
        openAPI.servers(List.of(
                new Server().url("http://localhost:9000").description("Desenvolvimento"),
                new Server().url("http://54.232.129.154:9000").description("Homologação")
        ));

        return openAPI;
    }


    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder().group("api").pathsToMatch("/api/v1/**").build();
    }


}


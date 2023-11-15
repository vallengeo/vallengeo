package com.vallengeo.core.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .components(new Components())
                .info(new Info()
                        .title("VallenGeo - Documentação da API")
                        .description("VallenGeo - uma plataforma de geoprocessamento da Vallenge Engenharia.")
            .contact(new Contact().name("Vallenge Engenharia")
                                .url("http://vallenge.com.br/")
                                .email("contato@vallenge.com.br"))
                        .version("1.0")
                )
                .servers(List.of(
                new Server().url("http://localhost:9000").description(""))
                );

    }

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder().group("api").pathsToMatch("/api/v1/**").build();
    }


}


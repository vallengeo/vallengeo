package com.vallengeo;

import org.flywaydb.core.Flyway;
import org.jetbrains.annotations.NotNull;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.support.TestPropertySourceUtils;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.lifecycle.Startables;
import org.testcontainers.utility.DockerImageName;

import java.util.stream.Stream;

@ActiveProfiles("test")
@Testcontainers @DirtiesContext
@AutoConfigureTestDatabase(replace = Replace.NONE)
@SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT)
@ContextConfiguration(initializers = AbstractIntegrationTest.Initializer.class)
public abstract class AbstractIntegrationTest {

    private static final DockerImageName POSTGIS_IMAGE_NAME = DockerImageName.parse("postgis/postgis:14-3.2")
            .asCompatibleSubstituteFor("postgres:14");

    @Container
    private static final PostgreSQLContainer<?> POSTGRE_SQL = new PostgreSQLContainer<>(POSTGIS_IMAGE_NAME)
            .withDatabaseName("vallengeo")
            .withUsername("vallengeo")
            .withPassword("123456");

    @Container
    private static final GenericContainer<?> MAILHOG = new GenericContainer<>("mailhog/mailhog")
            .withExposedPorts(1025, 8025)
            .withEnv("MAILHOG_USERNAME", "test@vallengeo.com")
            .withEnv("MAILHOG_PASSWORD", "vallengeo@123");

    public static class Initializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

        @Override
        public void initialize(@NotNull ConfigurableApplicationContext applicationContext) {
            startContainers();
            setupFlyway();

            TestPropertySourceUtils.addInlinedPropertiesToEnvironment(
                    applicationContext,
                    "spring.datasource.url= " + POSTGRE_SQL.getJdbcUrl(),
                    "spring.datasource.username= " + POSTGRE_SQL.getUsername(),
                    "spring.datasource.password= " + POSTGRE_SQL.getPassword(),
                    "spring.mail.host= " + MAILHOG.getHost(),
                    "spring.mail.port= " + MAILHOG.getMappedPort(1025),
                    "spring.mail.username= " + MAILHOG.getEnvMap().get("MAILHOG_USERNAME"),
                    "spring.mail.password= " + MAILHOG.getEnvMap().get("MAILHOG_PASSWORD")
            );
        }

        private static void startContainers() {
            Startables.deepStart(Stream.of(POSTGRE_SQL)).join();
            Startables.deepStart(Stream.of(MAILHOG)).join();
        }

        private static void setupFlyway() {
            Flyway.configure()
                    .cleanDisabled(false)
                    .baselineOnMigrate(true)
                    .failOnMissingLocations(true)
                    .dataSource(POSTGRE_SQL.getJdbcUrl(), POSTGRE_SQL.getUsername(), POSTGRE_SQL.getPassword())
                    .load().migrate();
        }
    }
}

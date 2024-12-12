# Etapa de build
FROM ubuntu:latest AS build

RUN apt-get update
RUN apt-get install openjdk-17-jdk -y
RUN apt-get install maven -y

# Define o diretório de trabalho
WORKDIR /app

# Copia o conteúdo do projeto para o diretório de trabalho
COPY . .

# Compila o projeto
RUN mvn clean install

# Etapa de runtime
FROM openjdk:17-jdk-slim

# Define a porta exposta
EXPOSE 5050

# Copia o JAR gerado da etapa de build para a imagem final
COPY --from=build /app/target/vallengeo-0.0.1-SNAPSHOT.jar app.jar

# Comando de entrada para iniciar o aplicativo
ENTRYPOINT ["java", "-jar", "app.jar"]
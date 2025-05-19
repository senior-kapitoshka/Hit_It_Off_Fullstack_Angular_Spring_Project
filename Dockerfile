FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Копируем готовый fat JAR из локальной машины/CI в образ
COPY target/HIO-0.0.1-SNAPSHOT.jar  app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]

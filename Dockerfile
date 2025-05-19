# Используем образ с Maven и Node.js
FROM node:18-bullseye-slim AS build

# Установка Maven
RUN apt-get update && apt-get install -y maven openjdk-17-jdk && apt-get clean

WORKDIR /app

COPY pom.xml ./
COPY src ./src

RUN mvn clean package -DskipTests

# Финальный образ (если нужно только JAR)
FROM openjdk:17
COPY --from=build /app/target/*.jar /app/app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]



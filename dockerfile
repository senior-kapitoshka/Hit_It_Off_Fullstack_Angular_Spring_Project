# Этап сборки backend
FROM maven:3.9.4-eclipse-temurin-17 as builder

WORKDIR /app

# Копируем только необходимые файлы для сборки backend
COPY backend/pom.xml backend/
COPY backend/src backend/src/

# Собираем backend без тестов
RUN mvn -f backend/pom.xml clean package -DskipTests

# Этап запуска
FROM eclipse-temurin:17-jre

WORKDIR /app

# Копируем собранный jar из builder
COPY --from=builder /app/backend/target/app.jar ./app.jar

# Копируем готовую сборку фронтенда (предполагается, что папка hiofront/dist есть рядом с Dockerfile)
COPY hiofront/dist ./static

# Запускаем backend
ENTRYPOINT ["java", "-jar", "app.jar"]

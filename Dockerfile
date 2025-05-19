# === STAGE 1: Build Angular + Spring Boot ===
FROM maven:3.9.6-eclipse-temurin-21 as build

# Установка системных зависимостей (для npm пакетов, которым нужен node-gyp)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Установка Node.js 20 (Angular 19 не поддерживает Node 22!)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    node -v && npm -v

# Создаем рабочую директорию
WORKDIR /app

# Копируем backend и frontend проекты
COPY pom.xml .
COPY hiofront ./hiofront
COPY src ./src

# Установка Node и NPM версий через frontend-maven-plugin
# Установка зависимостей и сборка frontend + backend
RUN mvn clean package -DskipTests

# === STAGE 2: Create minimal JRE image ===
FROM eclipse-temurin:21-jre

WORKDIR /app

# Копируем готовый JAR из предыдущего stage
COPY --from=build /app/target/*.jar app.jar

# Запуск Spring Boot приложения
ENTRYPOINT ["java", "-jar", "app.jar"]

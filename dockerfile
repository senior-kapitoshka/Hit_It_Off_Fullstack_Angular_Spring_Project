# --- Этап 1: Сборка Angular frontend ---
FROM node:18 AS frontend

WORKDIR /app/hiofront

# Копируем зависимости
COPY hiofront/package*.json ./
RUN npm install

# Копируем остальной код и билдим
COPY hiofront/ ./
RUN npm run build

# --- Этап 2: Сборка Spring Boot backend + копирование фронта ---
FROM maven:3.9.6-eclipse-temurin-17 AS backend

WORKDIR /app

# Кэшим зависимости
COPY pom.xml ./
RUN mvn dependency:go-offline

# Копируем остальной backend код
COPY . .

# Копируем фронтенд в Spring Boot (ожидается, что Spring ищет в /static)
RUN rm -rf src/main/resources/static/*
COPY --from=frontend /app/hiofront/dist/ ./src/main/resources/static/

# Сборка JAR
RUN mvn clean package -DskipTests

# --- Этап 3: Минимальный runtime ---
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Копируем jar
COPY --from=backend /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]

# --- Этап 1: Build Angular frontend ---
FROM node:18 AS frontend-builder

WORKDIR /app/hiofront

# Копируем package.json и package-lock.json для кэширования зависимостей
COPY hiofront/package*.json ./

RUN npm ci

# Копируем весь фронтенд код
COPY hiofront/ ./

# Собираем фронтенд
RUN npm run build

# --- Этап 2: Build Spring Boot backend ---
FROM maven:3.9.6-eclipse-temurin-17 AS backend-builder

WORKDIR /app

# Копируем pom.xml и package.json для кэширования зависимостей
COPY pom.xml ./
COPY hiofront/package*.json ./hiofront/

RUN mvn dependency:go-offline

# Копируем весь проект
COPY . ./

# Копируем собранный фронтенд из первого этапа в папку, где Spring Boot будет брать статику
COPY --from=frontend-builder /app/hiofront/dist ./hiofront/dist

# Запускаем сборку jar, frontend уже будет скопирован в target/classes/static
RUN mvn clean package -DskipTests

# --- Этап 3: Минимальный рантайм образ ---
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Копируем jar из предыдущего шага
COPY --from=backend-builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]

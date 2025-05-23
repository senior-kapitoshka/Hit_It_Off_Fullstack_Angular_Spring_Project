# Этап сборки backend
FROM maven:3.9.4-eclipse-temurin-17 as builder

WORKDIR /app

# Копируем pom.xml и src для сборки backend из корня
COPY pom.xml .
COPY src ./src

# Собираем backend без тестов
RUN mvn clean package -DskipTests

# Этап запуска
FROM eclipse-temurin:17-jre

WORKDIR /app

# Копируем собранный jar из builder
COPY --from=builder /app/target/app.jar ./app.jar

# Копируем готовую сборку фронтенда из папки hiofront/dist (предварительно собрать локально!)
COPY hiofront/dist ./static

# Запускаем backend
ENTRYPOINT ["java", "-jar", "app.jar"]

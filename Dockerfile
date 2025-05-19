# === STAGE 1: Build ===
FROM maven:3.9.6-eclipse-temurin-21 as build

# Установка пакетов для сборки node-gyp (npm native модули)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Копируем pom.xml и frontend
COPY pom.xml .
COPY hiofront ./hiofront
COPY src ./src

# Запускаем сборку, где frontend-maven-plugin сделает npm install и соберет фронт,
# а backend соберется в fat jar с фронтом внутри
RUN mvn clean package -DskipTests

# === STAGE 2: Run ===
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Копируем собранный jar из build стадии
COPY --from=build /app/target/*.jar app.jar

# Запускаем приложение
ENTRYPOINT ["java","-jar","app.jar"]

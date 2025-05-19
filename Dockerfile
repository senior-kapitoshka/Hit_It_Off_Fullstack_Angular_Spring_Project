<<<<<<< HEAD
# === STAGE 1: Build frontend + backend ===
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Установка nodejs и системных зависимостей для сборки npm
RUN apt-get update && apt-get install -y curl python3 make g++ && rm -rf /var/lib/apt/lists/*

# Установка Node.js 18 (или другую нужную версию)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs

WORKDIR /app

# Копируем pom, исходники фронта и бэка
=======
# === STAGE 1: Build ===
FROM maven:3.9.6-eclipse-temurin-21 as build

# Установка пакетов для сборки node-gyp (npm native модули)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Копируем pom.xml и frontend
>>>>>>> cde64ecf4af2a18a76b9c23202e19dbcb57d8170
COPY pom.xml .
COPY hiofront ./hiofront
COPY src ./src

<<<<<<< HEAD
# Проверка версий (опционально)
RUN node -v
RUN npm -v

# Собираем проект (frontend-maven-plugin внутри сделает npm install + сборку фронтенда)
RUN mvn clean package -DskipTests


# === STAGE 2: Минимальный образ для запуска ===
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Копируем собранный jar из первого этапа
COPY --from=build /app/target/*.jar app.jar

# Опционально: указать порт (если используется)
EXPOSE 8080

# Запуск
=======
# Запускаем сборку, где frontend-maven-plugin сделает npm install и соберет фронт,
# а backend соберется в fat jar с фронтом внутри
RUN mvn clean package -DskipTests

# === STAGE 2: Run ===
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Копируем собранный jar из build стадии
COPY --from=build /app/target/*.jar app.jar

# Запускаем приложение
>>>>>>> cde64ecf4af2a18a76b9c23202e19dbcb57d8170
ENTRYPOINT ["java","-jar","app.jar"]

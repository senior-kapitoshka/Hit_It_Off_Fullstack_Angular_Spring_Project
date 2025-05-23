
# Этап 1: билд бекенда и фронта
FROM maven:3.9.6-eclipse-temurin-17 AS build


# Копируем pom.xml в корень контейнера
COPY pom.xml .

# Копируем исходники backend (src) и frontend (hiofront)
COPY src ./src
COPY hiofront ./hiofront

# Собираем проект (maven соберет фронт и бэкенд согласно твоему pom.xml)
RUN mvn clean package -X -DskipTests

RUN npm install || (cat /root/.npm/_logs/*-debug-0.log && false)

# Этап 2: runtime образ с JRE
FROM eclipse-temurin:23-jre

# Копируем собранный jar в корень образа
COPY --from=build target/HIO-0.0.1-SNAPSHOT.jar ./HIO-0.0.1-SNAPSHOT.jar

# Открываем порт приложения
EXPOSE 8080

# Запускаем приложение
ENTRYPOINT ["java", "-jar", "HIO-0.0.1-SNAPSHOT.jar"]

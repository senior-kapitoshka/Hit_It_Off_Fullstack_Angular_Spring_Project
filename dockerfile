# Используем официальный OpenJDK образ
FROM eclipse-temurin:17-jre

# Рабочая директория в контейнере
WORKDIR /app

# Копируем backend jar (собранный заранее)
COPY backend/target/app.jar ./app.jar

# Копируем готовый фронтенд (сборку)
COPY hiofront/dist ./static

# Запускаем приложение
ENTRYPOINT ["java", "-jar", "app.jar"]

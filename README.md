# 🎯 Hit It Off — Fullstack-приложение для поиска соратников по интересам

Веб-приложение, созданное на **Angular 19**, **Spring Boot** и **Bootstrap**, предназначено для поиска единомышленников и участия в совместных мероприятиях.

---
![Main](https://github.com/senior-kapitoshka/Hit_It_Off_Fullstack_Angular_Spring_Project/blob/main/scrinshots/main.png)
---

## 📌 Возможности

- 🧩 Создание события по интересам: описание, место, дата, изображение
- 🧑‍🤝‍🧑 Присоединение всех зарегистрированных пользователей к событиям
- 🔐 Поддержка аутентификации через **JWT**, с разграничением ролей:
  - **Admin** — имеет расширенные права
  - **User** — может участвовать в событиях и комментировать
- 💬 Комментарии к событиям доступны всем незаблокированным и не замьюченным пользователям
- 📱 Адаптивный интерфейс под малые и средние экраны (Bootstrap)

---
<p float="left">
  <img src="https://github.com/senior-kapitoshka/Hit_It_Off_Fullstack_Angular_Spring_Project/blob/main/scrinshots/mordor.png" width="45%" />
  <img src="https://github.com/senior-kapitoshka/Hit_It_Off_Fullstack_Angular_Spring_Project/blob/main/scrinshots/comments.png" width="45%" />
</p>


---

## ⚙️ Технологии

- **Frontend**: Angular 19, Bootstrap 5
- **Backend**: Spring Boot, Spring Security (JWT)
- **База данных**: PostgreSQL
- **Аутентификация**: JWT
- **Стили**: Bootstrap (адаптивность, сетка)

---
## Демо
 
- https://hit-it-off-fullstack-angular-spring.onrender.com/
---

## 🚀 Установка и запуск

Проект настроен так, что Angular frontend автоматически собирается и встраивается в Spring Boot-приложение при помощи Maven-плагинов, включая frontend-maven-plugin.

🔧 Сборка:
```
./mvnw clean package
```
Эта команда:

устанавливает Node.js и npm (если не установлены),

устанавливает зависимости Angular-приложения,

запускает ng build --configuration=production,

копирует собранные файлы в src/main/resources/static,

и собирает единый исполняемый .jar файл с фронтом внутри.

▶️ Запуск:
```
java -jar target/HIO-0.0.1-SNAPSHOT.jar
```
После запуска приложение будет доступно по адресу:
```
👉 http://localhost:8080
```

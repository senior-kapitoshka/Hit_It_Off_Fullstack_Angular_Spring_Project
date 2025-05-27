# 🎯 Hit It Off — Fullstack-приложение для поиска соратников по интересам

Веб-приложение, созданное на **Angular 19**, **Spring Boot** и **Bootstrap**, предназначено для поиска единомышленников и участия в совместных мероприятиях.

---
![Main](https://github.com/senior-kapitoshka/Hit_It_Off_Fullstack_Angular_Spring_Project/blob/main/screenshots/main.png)
---

## 📌 Возможности

- ☠︎︎ У каждого пользователя свой личный кабинет со списком предстоящих событий, на которые он подписался
- 🧩 Создание события по интересам: описание, место, дата, изображение
- ♱ Прошедшие события остаются в архиве, к которому имеет доступ каждый зарегистрированный пользователь
- ⛧ События могут быть отфильтрованы по названию города
- 🧑‍🤝‍🧑 Каждый зарегистрированный пользователь может подписаться на событие и отслеживать его через личный кабинет
- 🔐 Поддержка аутентификации через **JWT**, с разграничением ролей:
  - **Admin** — имеет расширенные права
  - **User** — может участвовать в событиях и комментировать
- 💬 Комментарии к событиям доступны всем незаблокированным и не замьюченным пользователям
- 🕯 В приложении для управления доступом к маршрутам используются гарды (route guards).
- 📱 Адаптивный интерфейс под малые и средние экраны (Bootstrap)

---
## Немного скриншотов:

<p float="left">
  <img src="https://github.com/senior-kapitoshka/Hit_It_Off_Fullstack_Angular_Spring_Project/blob/main/screenshots/mordor.png" width="45%" />
  <img src="https://github.com/senior-kapitoshka/Hit_It_Off_Fullstack_Angular_Spring_Project/blob/main/screenshots/comments.png" width="45%" />
</p>

<p float="left">
  <img src="https://github.com/senior-kapitoshka/Hit_It_Off_Fullstack_Angular_Spring_Project/blob/main/screenshots/phone.png" width="45%" />
  <img src="https://github.com/senior-kapitoshka/Hit_It_Off_Fullstack_Angular_Spring_Project/blob/main/screenshots/users.png" width="45%" />
</p>

<p float="left">
  <img src="https://github.com/senior-kapitoshka/Hit_It_Off_Fullstack_Angular_Spring_Project/blob/main/screenshots/archive.png" width="45%" />
  <img src="https://github.com/senior-kapitoshka/Hit_It_Off_Fullstack_Angular_Spring_Project/blob/main/screenshots/404.png" width="45%" />
</p>

---
## Демо
 
- https://hit-it-off-fullstack-angular-spring.onrender.com/

---

## ⚙️ Технологии

- **Frontend**: Angular 19, Bootstrap 5
- **Backend**: Spring Boot, Spring Security (JWT)
- **База данных**: PostgreSQL
- **Аутентификация**: JWT
- **Стили**: Bootstrap (адаптивность, сетка)

---

## 🚀 Установка и запуск

Проект настроен так, что Angular frontend автоматически собирается и встраивается в Spring Boot-приложение при помощи Maven-плагинов, включая frontend-maven-plugin.

После того, как клонировали,

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

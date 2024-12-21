## Требования для запуска

- Установленная версия Node.js: **20.10.0**
- Установленный Docker
- Установленный Docker Compose

Смена версии: 

nvm use 20.10.0

## Шаги для запуска

### 2. Запуск Docker контейнера с базой данных

В корневой директории проекта создайте файл `.env` и добавьте следующие переменные:

```env
DATABASE_URL=postgresql://postgres:123@127.0.0.1:5432/dev
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123
POSTGRES_DB=dev
```

### 2. Запуск Docker контейнера с базой данных

docker compose up -d --force-recreate db_dev

### 3. Запуск проекта

yarn start:dev

## Вы должны увидеть:
API URL: http://localhost:8000/api/v1

Swagger URL: http://localhost:8000/api/v1/swagger (OpenAPI: http://localhost:8000/api/v1/swagger.json )

 (в Swagger находиться вся необходимая документация о проекте)

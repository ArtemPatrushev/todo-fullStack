import "dotenv/config";
import { PrismaClient } from "./generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({
  adapter,
});

// команды Prisma
// 1. npx prisma init - инициализирует и создает prisma/schema.prisma и .env
// 2. npx prisma generate - Генерация Prisma Client. Читает schema.prisma и генерирует prisma.todo.findMany()
// 3. npx prisma migrate dev --name init - Создание миграции + обновление БД (начальная команда)
// - Смотрит schema.prisma
// - Генерирует SQL migration
// - Применяет migration к PostgreSQL
// - Обновляет Prisma Client
// - Создает таблицы
// Потом:
// - npx prisma migrate dev --name add-description - тут add-description это описание как в commit - что ты сделал
// оно должно быть понятно для человека. add-description - описывает, что я добавил поле в модель
// 4. npx prisma studio - Открыть Prisma Studio (UI для БД)
// Можно:
// - смотреть таблицы
// - добавлять rows
// - редактировать данные
// - удалять данные
// 5. npx prisma migrate reset - Сброс БД
// Что делает:
// - удаляет все таблицы
// - удаляет все данные
// - заново применяет migrations
// 6. npx prisma db push - Просто протолкнуть schema без migrations
// Берет schema.prisma и сразу синхронизирует БД.
// 7. npx prisma migrate dev - Посмотреть SQL. Prisma покажет generated SQL
// 8. npx prisma db pull - Pull existing DB schema. Если БД уже существует PostgreSQL → schema.prisma

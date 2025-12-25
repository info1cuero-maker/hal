# HAL Platform - Документация

## Обзор проекта

HAL - это полнофункциональная платформа для поиска качественных услуг с двуязычной поддержкой (украинский/русский). Проект является полной копией сайта hal.in.ua, переписанной с WordPress на современный стек: React + FastAPI + MongoDB.

## Технологический стек

### Frontend
- **React 19** - UI библиотека
- **React Router** - навигация
- **Axios** - HTTP клиент
- **Tailwind CSS** - стилизация
- **Shadcn UI** - компоненты
- **Lucide React** - иконки
- **Inter Font** - типографика

### Backend
- **FastAPI** - Python веб-фреймворк
- **MongoDB** - база данных
- **Motor** - асинхронный драйвер MongoDB
- **Pydantic** - валидация данных
- **JWT** - аутентификация
- **Passlib** - хеширование паролей

## Быстрый старт

### Запуск приложения

Приложение уже запущено через supervisor:

```bash
# Проверка статуса
sudo supervisorctl status

# Frontend: http://localhost:3000
# Backend API: http://localhost:8001/api
# API Docs: http://localhost:8001/docs
```

## Миграция из WordPress

### 3 способа миграции данных:

#### 1. Через WordPress REST API (Рекомендуется)

```bash
cd /app/backend
pip install beautifulsoup4 requests
python migrate_from_wordpress.py
```

Скрипт автоматически:
- Подключается к WordPress REST API
- Загружает посты и custom post types
- Конвертирует в формат HAL
- Импортирует в MongoDB

#### 2. Через CSV файл

Если данные экспортированы в CSV:

```bash
cd /app/backend

# Создать пример CSV
python import_from_csv.py --create-sample

# Импортировать данные
python import_from_csv.py your_companies.csv
```

Формат CSV файла:
```csv
name,nameRu,description,descriptionRu,category,city,address,phone,email,website,image
Компанія 1,Компания 1,Опис,Описание,cafe,Kyiv,вул. 1,+380441234567,info@company.ua,https://site.com,https://image.url
```

#### 3. Через MongoDB импорт

Если у вас есть JSON файл с данными:

```bash
mongoimport --uri="mongodb://localhost:27017/hal" \
  --collection=companies \
  --file=companies.json \
  --jsonArray
```

### Настройка скрипта миграции

Отредактируйте `migrate_from_wordpress.py`:

```python
# Настройте URL WordPress сайта
WORDPRESS_URL = "https://hal.in.ua"

# Настройте маппинг категорий
CATEGORY_MAPPING = {
    "restaurants": "cafe",
    "fitness": "sport",
    # ... добавьте свои категории
}
```

### Проверка после миграции

```bash
# Проверка количества данных
curl http://localhost:8001/api/companies | jq '.total'
curl http://localhost:8001/api/blog | jq '.total'

# Просмотр первой компании
curl http://localhost:8001/api/companies | jq '.companies[0]'
```

## Полная документация

- **[README.md](./README_FULL.md)** - Полная документация проекта
- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Детальное руководство по миграции
- **[contracts.md](./contracts.md)** - API контракты

## API Endpoints

### Компании
```
GET    /api/companies              # Список с фильтрами
GET    /api/companies/{id}         # Детали компании
POST   /api/companies              # Создать (auth)
PUT    /api/companies/{id}         # Обновить (auth)
DELETE /api/companies/{id}         # Удалить (auth)
```

### Категории
```
GET    /api/categories             # Список категорий
```

### Аутентификация
```
POST   /api/auth/register          # Регистрация
POST   /api/auth/login             # Вход
GET    /api/auth/me                # Текущий пользователь
```

### Отзывы
```
GET    /api/companies/{id}/reviews # Отзывы компании
POST   /api/companies/{id}/reviews # Добавить отзыв (auth)
```

### Блог
```
GET    /api/blog                   # Статьи
GET    /api/blog/{id}              # Статья
```

### Контакты
```
POST   /api/contact                # Отправить сообщение
```

## Структура базы данных

### Company
```javascript
{
  name: "Назва (UA)",
  nameRu: "Название (RU)",
  description: "Опис (UA)",
  descriptionRu: "Описание (RU)",
  category: "cafe|sport|beauty|art|home|auto|construction|other",
  location: { city: "Kyiv", address: "..." },
  contacts: { phone: "+380...", email: "...", website: "..." },
  image: "https://...",
  rating: 4.8,
  reviewCount: 45,
  isNew: true,
  isActive: true
}
```

## Логи и отладка

```bash
# Backend логи
tail -f /var/log/supervisor/backend.out.log
tail -f /var/log/supervisor/backend.err.log

# Frontend логи
tail -f /var/log/supervisor/frontend.out.log

# Перезапуск
sudo supervisorctl restart all
```

## Что уже готово

✅ Frontend - точная копия дизайна hal.in.ua
✅ Backend API - все endpoints протестированы (22/22 тесты пройдены)
✅ База данных - MongoDB с тестовыми данными
✅ Интеграция - frontend подключен к backend
✅ Аутентификация - JWT токены
✅ Двуязычность - UA/RU переключение
✅ Скрипты миграции - готовы к импорту данных

## Следующие шаги

1. Запустите скрипт миграции для импорта данных из WordPress
2. Проверьте импортированные данные через API
3. Настройте домен и SSL сертификат для продакшена
4. Добавьте дополнительные функции по необходимости

## Контакты

Website: https://hal.in.ua

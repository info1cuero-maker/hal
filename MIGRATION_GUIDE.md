# Инструкция по миграции данных из WordPress в HAL Platform

## Обзор

Этот документ описывает процесс миграции данных с WordPress сайта hal.in.ua на новую платформу HAL с FastAPI + MongoDB.

## Методы миграции

### Метод 1: Через WordPress REST API (Рекомендуется)

WordPress предоставляет REST API для доступа к данным. Это самый чистый и надежный метод.

**Преимущества:**
- Структурированные данные
- Нет необходимости парсить HTML
- Легко получить метаданные

**Шаги:**

1. **Проверьте доступность API:**
   ```bash
   curl https://hal.in.ua/wp-json/wp/v2/posts
   ```

2. **Установите зависимости:**
   ```bash
   cd /app/backend
   pip install beautifulsoup4 requests
   pip freeze > requirements.txt
   ```

3. **Запустите скрипт миграции:**
   ```bash
   python migrate_from_wordpress.py
   ```

**Что мигрирует скрипт:**
- ✅ Статьи блога (posts)
- ⚠️ Бизнес-листинги (требует настройки под custom post type)
- ✅ Изображения (featured images)
- ✅ Метаданные

### Метод 2: Export/Import через WordPress Admin

**Шаги:**

1. **Экспорт из WordPress:**
   - Войдите в WordPress Admin панель
   - Перейдите в Tools → Export
   - Выберите "All content" или конкретный тип данных
   - Скачайте XML файл

2. **Конвертация XML в JSON:**
   ```python
   # Создайте скрипт для парсинга WordPress XML
   # Используйте библиотеку xml.etree.ElementTree
   ```

3. **Импорт в MongoDB:**
   ```bash
   python import_from_xml.py exported_data.xml
   ```

### Метод 3: Прямой экспорт из MySQL базы данных

Если у вас есть доступ к MySQL базе WordPress:

**Шаги:**

1. **Экспорт таблиц:**
   ```bash
   mysqldump -u username -p database_name wp_posts wp_postmeta > wordpress_export.sql
   ```

2. **Создайте скрипт для чтения SQL и импорта в MongoDB:**
   ```python
   import mysql.connector
   # Подключитесь к MySQL
   # Читайте данные из wp_posts и wp_postmeta
   # Конвертируйте в формат HAL
   # Сохраните в MongoDB
   ```

### Метод 4: Использование плагина (Для больших миграций)

**Рекомендуемые плагины:**
- WP REST API Custom Post Types
- WP All Export
- WPGraphQL (для более мощного API)

## Структура данных WordPress → HAL

### Компании (Listings)

**WordPress (Custom Post Type):**
```
Post Type: listing
Meta Fields:
  - _listing_location
  - _listing_phone
  - _listing_email
  - _listing_website
  - _listing_category
```

**HAL (MongoDB):**
```json
{
  "name": "string (укр)",
  "nameRu": "string (рус)",
  "description": "string (укр)",
  "descriptionRu": "string (рус)",
  "category": "string",
  "location": {
    "city": "string",
    "address": "string"
  },
  "contacts": {
    "phone": "string",
    "email": "string",
    "website": "string"
  },
  "image": "string (URL)",
  "images": ["string"],
  "rating": 0.0,
  "reviewCount": 0,
  "isNew": false,
  "isActive": true
}
```

### Статьи блога

**WordPress:**
```
Post Type: post
Fields: title, content, excerpt, featured_image
```

**HAL (MongoDB):**
```json
{
  "titleUk": "string",
  "titleRu": "string",
  "contentUk": "string",
  "contentRu": "string",
  "excerptUk": "string",
  "excerptRu": "string",
  "image": "string",
  "author": "string",
  "publishedAt": "datetime"
}
```

## Настройка скрипта миграции

Отредактируйте `migrate_from_wordpress.py`:

### 1. Настройте WordPress API endpoints

```python
# Если у вас custom post type с другим именем
LISTING_POST_TYPE = "business"  # Вместо "listing"

response = self.session.get(f"{WORDPRESS_URL}/wp-json/wp/v2/{LISTING_POST_TYPE}")
```

### 2. Маппинг категорий

```python
# Маппинг WordPress категорий на HAL категории
CATEGORY_MAPPING = {
    "restaurants": "cafe",
    "fitness": "sport",
    "beauty-salons": "beauty",
    "entertainment": "art",
    "cleaning": "home",
    "car-service": "auto",
    "construction": "construction",
    "other-services": "other"
}
```

### 3. Маппинг custom fields

```python
# Получение мета-полей WordPress
meta = listing.get('meta', {})

company = {
    "contacts": {
        "phone": meta.get('_listing_phone', ''),
        "email": meta.get('_listing_email', ''),
        "website": meta.get('_listing_website', '')
    },
    "location": {
        "city": meta.get('_listing_city', 'Kyiv'),
        "address": meta.get('_listing_address', '')
    }
}
```

## Миграция изображений

### Вариант 1: Оставить изображения на WordPress хостинге

Просто используйте URL изображений из WordPress - они будут работать через внешние ссылки.

### Вариант 2: Скачать изображения локально

```python
import requests
from pathlib import Path

def download_image(url, save_path):
    response = requests.get(url)
    if response.status_code == 200:
        with open(save_path, 'wb') as f:
            f.write(response.content)
        return True
    return False

# В скрипте миграции
image_url = featured_media[0].get('source_url')
image_name = image_url.split('/')[-1]
local_path = f"/app/frontend/public/images/companies/{image_name}"
download_image(image_url, local_path)
company['image'] = f"/images/companies/{image_name}"
```

### Вариант 3: Загрузить на CDN

Используйте AWS S3, Cloudinary, или другой CDN сервис.

## Проверка после миграции

После запуска миграции проверьте:

```bash
# Проверка количества мигрированных данных
curl http://localhost:8001/api/companies | jq '.total'
curl http://localhost:8001/api/blog | jq '.total'

# Проверка конкретной компании
curl http://localhost:8001/api/companies | jq '.companies[0]'

# Проверка статей блога
curl http://localhost:8001/api/blog | jq '.posts[0]'
```

## Ручной импорт через MongoDB

Если автоматическая миграция не работает, можно импортировать данные вручную:

### 1. Создайте JSON файл с данными

```json
[
  {
    "name": "Компания 1",
    "nameRu": "Компания 1",
    "description": "Описание",
    "descriptionRu": "Описание",
    "category": "cafe",
    "location": {
      "city": "Kyiv",
      "address": "ул. Примерная, 1"
    },
    "contacts": {
      "phone": "+380441234567",
      "email": "info@company.com"
    },
    "image": "https://example.com/image.jpg"
  }
]
```

### 2. Импортируйте в MongoDB

```bash
mongoimport --uri="mongodb://localhost:27017/hal" \
  --collection=companies \
  --file=companies.json \
  --jsonArray
```

## Перевод контента (Украинский ↔ Русский)

Если в WordPress данные только на одном языке:

### Вариант 1: Google Translate API

```python
from googletrans import Translator

translator = Translator()

def translate_text(text, target_lang='ru'):
    result = translator.translate(text, dest=target_lang)
    return result.text

company['nameRu'] = translate_text(company['name'], 'ru')
company['descriptionRu'] = translate_text(company['description'], 'ru')
```

### Вариант 2: Ручной перевод

Экспортируйте данные в CSV для ручного перевода:

```python
import csv

# Экспорт
with open('companies_to_translate.csv', 'w') as f:
    writer = csv.writer(f)
    writer.writerow(['id', 'name_uk', 'name_ru', 'description_uk', 'description_ru'])
    # ... записать данные
```

## Troubleshooting

### Проблема: WordPress REST API не доступен

**Решение:**
1. Убедитесь что WordPress REST API включен
2. Проверьте .htaccess и nginx конфигурацию
3. Включите плагин "WP REST API"

### Проблема: Custom post types не видны в API

**Решение:**
Добавьте в functions.php WordPress темы:

```php
function my_custom_post_type_rest_support() {
    global $wp_post_types;
    $wp_post_types['listing']->show_in_rest = true;
    $wp_post_types['listing']->rest_base = 'listing';
    $wp_post_types['listing']->rest_controller_class = 'WP_REST_Posts_Controller';
}
add_action('init', 'my_custom_post_type_rest_support', 25);
```

### Проблема: Meta fields не возвращаются через API

**Решение:**
Зарегистрируйте meta fields:

```php
register_meta('post', '_listing_phone', array(
    'show_in_rest' => true,
    'type' => 'string',
    'single' => true,
));
```

## Запуск миграции

```bash
# 1. Перейдите в backend директорию
cd /app/backend

# 2. Установите зависимости
pip install beautifulsoup4 requests

# 3. (Опционально) Сделайте backup текущей базы
mongodump --uri="mongodb://localhost:27017/hal" --out=/backup

# 4. Запустите миграцию
python migrate_from_wordpress.py

# 5. Проверьте результаты
python -c "
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
async def check():
    client = AsyncIOMotorClient('mongodb://localhost:27017')
    db = client['hal']
    print(f'Companies: {await db.companies.count_documents({})}')
    print(f'Blog posts: {await db.blog_posts.count_documents({})}')
    client.close()
asyncio.run(check())
"
```

## Дополнительные ресурсы

- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [MongoDB Import/Export Tools](https://docs.mongodb.com/database-tools/)
- [FastAPI Best Practices](https://fastapi.tiangolo.com/tutorial/)

## Поддержка

Если возникли проблемы с миграцией:
1. Проверьте логи: `tail -f /var/log/supervisor/backend.*.log`
2. Проверьте MongoDB: `mongo hal --eval "db.companies.count()"`
3. Проверьте WordPress API: `curl https://hal.in.ua/wp-json/wp/v2/posts`

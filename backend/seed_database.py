"""
Seed database with initial data from mock data
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

async def seed_database():
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    print("🌱 Seeding database...")
    
    # Clear existing data
    await db.companies.delete_many({})
    await db.blog_posts.delete_many({})
    print("✓ Cleared existing data")
    
    # Seed companies
    companies = [
        {
            "name": "Кондитерська Merry - торти, печиво та солодощі",
            "nameRu": "Кондитерская Merry - торты, печенье и сладости",
            "description": "Найсмачніші торти та солодощі на замовлення",
            "descriptionRu": "Самые вкусные торты и сладости на заказ",
            "category": "cafe",
            "location": {
                "city": "Kyiv",
                "address": "вул. Хрещатик, 1"
            },
            "contacts": {
                "phone": "+380 44 123 4567",
                "email": "merry@example.com",
                "website": "https://merry.example.com"
            },
            "image": "https://via.placeholder.com/400x300/FFB6C1/FFFFFF?text=Merry",
            "images": [],
            "rating": 4.8,
            "reviewCount": 45,
            "isNew": True,
            "isActive": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "name": "Кондитерская ExclusiVe Cake-торти на заказ",
            "nameRu": "Кондитерская ExclusiVe Cake-торты на заказ",
            "description": "Ексклюзивні торти для особливих подій",
            "descriptionRu": "Эксклюзивные торты для особых событий",
            "category": "cafe",
            "location": {
                "city": "Kyiv",
                "address": "просп. Перемоги, 50"
            },
            "contacts": {
                "phone": "+380 44 234 5678",
                "email": "exclusive@example.com"
            },
            "image": "https://via.placeholder.com/400x300/FFC0CB/FFFFFF?text=ExclusiVe",
            "images": [],
            "rating": 4.9,
            "reviewCount": 67,
            "isNew": True,
            "isActive": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "name": "Компанія Alp Star -Промисловий альпінізм",
            "nameRu": "Компания Alp Star -Промышленный альпинизм",
            "description": "Професійні послуги промислового альпінізму",
            "descriptionRu": "Профессиональные услуги промышленного альпинизма",
            "category": "construction",
            "location": {
                "city": "Kyiv",
                "address": "вул. Вишгородська, 45"
            },
            "contacts": {
                "phone": "+380 44 345 6789",
                "email": "alpstar@example.com"
            },
            "image": "https://via.placeholder.com/400x300/87CEEB/FFFFFF?text=Alp+Star",
            "images": [],
            "rating": 4.7,
            "reviewCount": 32,
            "isNew": False,
            "isActive": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "name": "Компания АЛЬТИУС-промышленный альпинизм",
            "nameRu": "Компания АЛЬТИУС-промышленный альпинизм",
            "description": "Надійні висотні роботи будь-якої складності",
            "descriptionRu": "Надежные высотные работы любой сложности",
            "category": "construction",
            "location": {
                "city": "Kyiv",
                "address": "вул. Дніпровська набережна, 19"
            },
            "contacts": {
                "phone": "+380 44 456 7890",
                "email": "altius@example.com"
            },
            "image": "https://via.placeholder.com/400x300/4682B4/FFFFFF?text=ALTIUS",
            "images": [],
            "rating": 4.6,
            "reviewCount": 28,
            "isNew": False,
            "isActive": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "name": "Клининговая компания «Уборка Эксперт»",
            "nameRu": "Клининговая компания «Уборка Эксперт»",
            "description": "Професійне прибирання квартир та офісів",
            "descriptionRu": "Профессиональная уборка квартир и офисов",
            "category": "home",
            "location": {
                "city": "Kyiv",
                "address": "вул. Саксаганського, 121"
            },
            "contacts": {
                "phone": "+380 44 567 8901",
                "email": "expert@example.com"
            },
            "image": "https://via.placeholder.com/400x300/98FB98/FFFFFF?text=Expert",
            "images": [],
            "rating": 4.5,
            "reviewCount": 54,
            "isNew": False,
            "isActive": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "name": "Клінінгова компанія Шарком",
            "nameRu": "Клининговая компания Шарком",
            "description": "Якісне прибирання за доступними цінами",
            "descriptionRu": "Качественная уборка по доступным ценам",
            "category": "home",
            "location": {
                "city": "Kyiv",
                "address": "вул. Велика Васильківська, 72"
            },
            "contacts": {
                "phone": "+380 44 678 9012",
                "email": "sharkom@example.com"
            },
            "image": "https://via.placeholder.com/400x300/90EE90/FFFFFF?text=Sharkom",
            "images": [],
            "rating": 4.4,
            "reviewCount": 41,
            "isNew": False,
            "isActive": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "name": "Хімчистка Bellissimo - мобільність і комфорт",
            "nameRu": "Химчистка Bellissimo - мобильность и комфорт",
            "description": "Мобільна хімчистка з виїздом до клієнта",
            "descriptionRu": "Мобильная химчистка с выездом к клиенту",
            "category": "home",
            "location": {
                "city": "Kyiv",
                "address": "вул. Льва Толстого, 23"
            },
            "contacts": {
                "phone": "+380 44 789 0123",
                "email": "bellissimo@example.com"
            },
            "image": "https://via.placeholder.com/400x300/ADD8E6/FFFFFF?text=Bellissimo",
            "images": [],
            "rating": 4.7,
            "reviewCount": 38,
            "isNew": False,
            "isActive": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "name": "Студия OSCAR-студия по уходу за гардеробом и домашним текстилем премиум-класса",
            "nameRu": "Студия OSCAR-студия по уходу за гардеробом и домашним текстилем премиум-класса",
            "description": "Преміум догляд за одягом та текстилем",
            "descriptionRu": "Премиум уход за одеждой и текстилем",
            "category": "home",
            "location": {
                "city": "Kyiv",
                "address": "вул. Інститутська, 18"
            },
            "contacts": {
                "phone": "+380 44 890 1234",
                "email": "oscar@example.com"
            },
            "image": "https://via.placeholder.com/400x300/B0C4DE/FFFFFF?text=OSCAR",
            "images": [],
            "rating": 4.9,
            "reviewCount": 72,
            "isNew": False,
            "isActive": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
    ]
    
    result = await db.companies.insert_many(companies)
    print(f"✓ Inserted {len(result.inserted_ids)} companies")
    
    # Seed blog posts
    blog_posts = [
        {
            "titleUk": "Як обрати якісну клінінгову компанію",
            "titleRu": "Как выбрать качественную клининговую компанию",
            "contentUk": "Детальна стаття про вибір надійного сервісу прибирання...",
            "contentRu": "Подробная статья о выборе надежного сервиса уборки...",
            "excerptUk": "Поради щодо вибору надійного сервісу прибирання...",
            "excerptRu": "Советы по выбору надежного сервиса уборки...",
            "image": "https://via.placeholder.com/800x400/DDA0DD/FFFFFF?text=Blog+Post+1",
            "author": "HAL Team",
            "publishedAt": datetime.utcnow(),
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "titleUk": "Топ-10 ресторанів Києва",
            "titleRu": "Топ-10 ресторанов Киева",
            "contentUk": "Огляд найкращих закладів столиці...",
            "contentRu": "Обзор лучших заведений столицы...",
            "excerptUk": "Огляд найкращих закладів столиці...",
            "excerptRu": "Обзор лучших заведений столицы...",
            "image": "https://via.placeholder.com/800x400/E6E6FA/FFFFFF?text=Blog+Post+2",
            "author": "HAL Team",
            "publishedAt": datetime.utcnow(),
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
    ]
    
    result = await db.blog_posts.insert_many(blog_posts)
    print(f"✓ Inserted {len(result.inserted_ids)} blog posts")
    
    print("✅ Database seeding completed!")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())

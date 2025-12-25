"""
Импорт компаний из CSV файла в MongoDB
Используйте этот скрипт если вы экспортировали данные из WordPress в CSV формат
"""
import asyncio
import csv
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

# Маппинг категорий
CATEGORY_MAPPING = {
    'кафе': 'cafe',
    'ресторан': 'cafe',
    'спорт': 'sport',
    'фітнес': 'sport',
    'краса': 'beauty',
    'салон': 'beauty',
    'мистецтво': 'art',
    'розваги': 'art',
    'прибирання': 'home',
    'клінінг': 'home',
    'авто': 'auto',
    'будівництво': 'construction',
    'ремонт': 'construction',
    'інше': 'other'
}

async def import_from_csv(csv_file_path):
    """
    Импорт компаний из CSV файла
    
    Формат CSV файла:
    name,nameRu,description,descriptionRu,category,city,address,phone,email,website,image
    """
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    print("=" * 70)
    print("Импорт компаний из CSV в MongoDB")
    print("=" * 70)
    print(f"\nФайл: {csv_file_path}")
    
    if not Path(csv_file_path).exists():
        print(f"❌ Файл не найден: {csv_file_path}")
        return
    
    imported = 0
    errors = 0
    
    try:
        with open(csv_file_path, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            
            for row in reader:
                try:
                    # Маппинг категории
                    category = row.get('category', '').lower().strip()
                    mapped_category = 'other'
                    
                    for key, value in CATEGORY_MAPPING.items():
                        if key in category:
                            mapped_category = value
                            break
                    
                    # Создание документа компании
                    company = {
                        "name": row.get('name', '').strip(),
                        "nameRu": row.get('nameRu', row.get('name', '')).strip(),
                        "description": row.get('description', '').strip(),
                        "descriptionRu": row.get('descriptionRu', row.get('description', '')).strip(),
                        "category": mapped_category,
                        "location": {
                            "city": row.get('city', 'Kyiv').strip(),
                            "address": row.get('address', '').strip()
                        },
                        "contacts": {
                            "phone": row.get('phone', '').strip(),
                            "email": row.get('email', '').strip(),
                            "website": row.get('website', '').strip() or None
                        },
                        "image": row.get('image', 'https://via.placeholder.com/400x300/E0E0E0/666666?text=Company').strip(),
                        "images": [],
                        "rating": 0.0,
                        "reviewCount": 0,
                        "isNew": False,
                        "isActive": True,
                        "createdAt": datetime.utcnow(),
                        "updatedAt": datetime.utcnow()
                    }
                    
                    # Валидация обязательных полей
                    if not company['name'] or not company['contacts']['phone']:
                        print(f"⚠️  Пропущена компания (нет имени или телефона): {company.get('name', 'N/A')}")
                        errors += 1
                        continue
                    
                    # Вставка в базу данных
                    await db.companies.insert_one(company)
                    imported += 1
                    print(f"  ✓ Импортировано: {company['name'][:60]}")
                    
                except Exception as e:
                    errors += 1
                    print(f"  ❌ Ошибка при импорте строки: {str(e)}")
        
        print("\n" + "=" * 70)
        print(f"✅ Импорт завершен!")
        print(f"  Успешно: {imported}")
        print(f"  Ошибок: {errors}")
        print("=" * 70)
        
        # Статистика базы данных
        total_companies = await db.companies.count_documents({})
        print(f"\n📊 Всего компаний в базе: {total_companies}")
        
    except Exception as e:
        print(f"❌ Критическая ошибка: {str(e)}")
    
    finally:
        client.close()

async def create_sample_csv():
    """Создать пример CSV файла"""
    sample_data = [
        {
            'name': 'Кондитерська Merry',
            'nameRu': 'Кондитерская Merry',
            'description': 'Найсмачніші торти та солодощі',
            'descriptionRu': 'Самые вкусные торты и сладости',
            'category': 'cafe',
            'city': 'Kyiv',
            'address': 'вул. Хрещатик, 1',
            'phone': '+380441234567',
            'email': 'merry@example.com',
            'website': 'https://merry.example.com',
            'image': 'https://via.placeholder.com/400x300/FFB6C1/FFFFFF?text=Merry'
        },
        {
            'name': 'Спортзал FitLife',
            'nameRu': 'Спортзал FitLife',
            'description': 'Сучасний фітнес-центр з професійними тренерами',
            'descriptionRu': 'Современный фитнес-центр с профессиональными тренерами',
            'category': 'sport',
            'city': 'Kyiv',
            'address': 'просп. Перемоги, 50',
            'phone': '+380442345678',
            'email': 'info@fitlife.ua',
            'website': '',
            'image': 'https://via.placeholder.com/400x300/87CEEB/FFFFFF?text=FitLife'
        }
    ]
    
    csv_file = 'sample_companies.csv'
    
    with open(csv_file, 'w', encoding='utf-8', newline='') as file:
        fieldnames = ['name', 'nameRu', 'description', 'descriptionRu', 'category', 
                     'city', 'address', 'phone', 'email', 'website', 'image']
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        
        writer.writeheader()
        for row in sample_data:
            writer.writerow(row)
    
    print(f"✅ Создан пример CSV файла: {csv_file}")
    print("Отредактируйте его и запустите: python import_from_csv.py {csv_file}")

async def main():
    import sys
    
    if len(sys.argv) < 2:
        print("Использование:")
        print("  python import_from_csv.py <путь_к_csv_файлу>")
        print("\nИли создать пример CSV:")
        print("  python import_from_csv.py --create-sample")
        return
    
    if sys.argv[1] == '--create-sample':
        await create_sample_csv()
    else:
        csv_file = sys.argv[1]
        await import_from_csv(csv_file)

if __name__ == "__main__":
    asyncio.run(main())

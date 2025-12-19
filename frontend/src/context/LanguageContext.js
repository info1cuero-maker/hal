import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  uk: {
    nav: {
      home: 'Головна',
      search: 'Пошук',
      blog: 'Блог',
      contacts: 'Контакти',
      addBusiness: 'Додати бізнес',
      login: 'Увійдіть',
      register: 'Зареєструватися'
    },
    hero: {
      title: 'Зручний сервіс з пошуку',
      title2: 'якісних послуг поруч з вами',
      subtitle: 'скористайтесь зручним пошуком потрібного сервісу або додайте свій бізнес до каталогу просто зараз',
      addCompany: 'Додати компанію',
      toCatalog: 'До каталогу'
    },
    sections: {
      newCompanies: 'Нові компанії',
      viewMore: 'Переглянути більше',
      mainCategories: 'Основні категорії',
      new: 'новий'
    },
    categories: {
      cafe: 'Кафе та ресторани',
      sport: 'Спорт і фітнес',
      beauty: 'Краса та здоров\'я',
      art: 'Мистецтво та розваги',
      home: 'Домашні та побутові послуги',
      auto: 'Авто послуги',
      construction: 'Будівництво та ремонт',
      other: 'Інші послуги'
    },
    footer: {
      description: 'Платформа Хал - объединяем бизнес и потребителей',
      usefulLinks: 'Корисні посилання',
      quickSearch: 'Швидкий пошук',
      subscribe: 'Підпішіться на нашу розсилку',
      subscribeText: 'Ми пишемо рідко, але тільки найкращий контент.',
      join: 'Приєднуйтесь',
      privacy: 'Ми ніколи не розголошуватимемо ваші дані.',
      privacyPolicy: 'Політика конфіденційності',
      allRights: 'Всі права захищені',
      home: 'Головна',
      about: 'Про нас',
      howItWorks: 'Як це працює',
      popular: 'Популярні',
      recentlyAdded: 'Нещодавно додано',
      relevant: 'Найактуальніше'
    },
    common: {
      sendMessage: 'Надіслати повідомлення',
      location: 'Kyiv, Ukraine'
    }
  },
  ru: {
    nav: {
      home: 'Главная',
      search: 'Поиск',
      blog: 'Блог',
      contacts: 'Контакты',
      addBusiness: 'Добавить бизнес',
      login: 'Войти',
      register: 'Зарегистрироваться'
    },
    hero: {
      title: 'Удобный сервис для поиска',
      title2: 'качественных услуг рядом с вами',
      subtitle: 'воспользуйтесь удобным поиском нужного сервиса или добавьте свой бизнес в каталог прямо сейчас',
      addCompany: 'Добавить компанию',
      toCatalog: 'К каталогу'
    },
    sections: {
      newCompanies: 'Новые компании',
      viewMore: 'Просмотреть больше',
      mainCategories: 'Основные категории',
      new: 'новый'
    },
    categories: {
      cafe: 'Кафе и рестораны',
      sport: 'Спорт и фитнес',
      beauty: 'Красота и здоровье',
      art: 'Искусство и развлечения',
      home: 'Домашние и бытовые услуги',
      auto: 'Авто услуги',
      construction: 'Строительство и ремонт',
      other: 'Другие услуги'
    },
    footer: {
      description: 'Платформа Хал - объединяем бизнес и потребителей',
      usefulLinks: 'Полезные ссылки',
      quickSearch: 'Быстрый поиск',
      subscribe: 'Подпишитесь на нашу рассылку',
      subscribeText: 'Мы пишем редко, но только лучший контент.',
      join: 'Присоединяйтесь',
      privacy: 'Мы никогда не разглашаем ваши данные.',
      privacyPolicy: 'Политика конфиденциальности',
      allRights: 'Все права защищены',
      home: 'Главная',
      about: 'О нас',
      howItWorks: 'Как это работает',
      popular: 'Популярные',
      recentlyAdded: 'Недавно добавлено',
      relevant: 'Наиболее актуальное'
    },
    common: {
      sendMessage: 'Отправить сообщение',
      location: 'Киев, Украина'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('uk');

  const t = (path) => {
    const keys = path.split('.');
    let value = translations[language];
    for (const key of keys) {
      value = value?.[key];
    }
    return value || path;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'uk' ? 'ru' : 'uk');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
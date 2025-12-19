import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Target, Users, Award, Zap } from 'lucide-react';

const About = () => {
  const { language } = useLanguage();

  const features = [
    {
      icon: Target,
      titleUk: 'Наша місія',
      titleRu: 'Наша миссия',
      descriptionUk: 'Об\'\'єднати клієнтів та бізнес через якісну платформу для пошуку послуг',
      descriptionRu: 'Объединить клиентов и бизнес через качественную платформу для поиска услуг'
    },
    {
      icon: Users,
      titleUk: 'Наша команда',
      titleRu: 'Наша команда',
      descriptionUk: 'Професіонали, що працюють для вашого комфорту та зручності',
      descriptionRu: 'Профессионалы, работающие для вашего комфорта и удобства'
    },
    {
      icon: Award,
      titleUk: 'Якість',
      titleRu: 'Качество',
      descriptionUk: 'Тільки перевірені та надійні компанії в нашому каталозі',
      descriptionRu: 'Только проверенные и надежные компании в нашем каталоге'
    },
    {
      icon: Zap,
      titleUk: 'Швидкість',
      titleRu: 'Скорость',
      descriptionUk: 'Знайдіть потрібну послугу за лічені секунди',
      descriptionRu: 'Найдите нужную услугу за считанные секунды'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'uk' ? 'Про HAL' : 'О HAL'}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
            {language === 'uk'
              ? 'Ми - провідна платформа для пошуку якісних послуг в Україні'
              : 'Мы - ведущая платформа для поиска качественных услуг в Украине'}
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {language === 'uk' ? feature.titleUk : feature.titleRu}
                </h3>
                <p className="text-gray-600">
                  {language === 'uk' ? feature.descriptionUk : feature.descriptionRu}
                </p>
              </div>
            );
          })}
        </div>

        {/* About Content */}
        <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {language === 'uk' ? 'Хто ми?' : 'Кто мы?'}
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              {language === 'uk'
                ? 'HAL - це сучасна платформа, яка об\'\'єднує споживачів та постачальників послуг. Ми створили зручний сервіс, де кожен може знайти потрібну послугу поряд з собою.'
                : 'HAL - это современная платформа, которая объединяет потребителей и поставщиков услуг. Мы создали удобный сервис, где каждый может найти нужную услугу рядом с собой.'}
            </p>
            <p>
              {language === 'uk'
                ? 'Наша місія - зробити пошук якісних послуг простим, швидким та зручним. Ми ретельно перевіряємо кожну компанію, що приєднується до нашої платформи, щоб гарантувати вам найкращий досвід.'
                : 'Наша миссия - сделать поиск качественных услуг простым, быстрым и удобным. Мы тщательно проверяем каждую компанию, которая присоединяется к нашей платформе, чтобы гарантировать вам лучший опыт.'}
            </p>
            <p>
              {language === 'uk'
                ? 'Приєднуйтесь до HAL та відкрийте для себе світ якісних послуг!'
                : 'Присоединяйтесь к HAL и откройте для себя мир качественных услуг!'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
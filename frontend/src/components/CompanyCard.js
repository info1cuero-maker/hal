import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CompanyCard = ({ company }) => {
  const { language, t } = useLanguage();
  const name = language === 'uk' ? company.name : company.nameRu;
  const description = language === 'uk' ? company.description : company.descriptionRu;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={company.image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {company.isNew && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {t('sections.new')}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <Link to={`/company/${company.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-pink-600 transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>

        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin size={16} className="mr-1" />
          <span>{company.location}</span>
        </div>

        {company.rating && (
          <div className="flex items-center mb-4">
            <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
            <span className="text-sm font-semibold text-gray-700 mr-1">{company.rating}</span>
            <span className="text-sm text-gray-500">({company.reviews} {language === 'uk' ? 'відгуків' : 'отзывов'})</span>
          </div>
        )}

        <button className="w-full bg-gray-100 hover:bg-pink-600 hover:text-white text-gray-700 px-4 py-2.5 rounded-lg transition-all duration-300 font-medium flex items-center justify-center space-x-2">
          <MessageCircle size={18} />
          <span>{t('common.sendMessage')}</span>
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
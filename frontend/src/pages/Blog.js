import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { blogPosts } from '../data/mockData';
import { Calendar, ArrowRight } from 'lucide-react';

const Blog = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">
          {language === 'uk' ? 'Блог' : 'Блог'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden h-56">
                <img
                  src={post.image}
                  alt={language === 'uk' ? post.titleUk : post.titleRu}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar size={16} className="mr-2" />
                  <span>{new Date(post.date).toLocaleDateString(language === 'uk' ? 'uk-UA' : 'ru-RU')}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {language === 'uk' ? post.titleUk : post.titleRu}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {language === 'uk' ? post.excerpt : post.excerptRu}
                </p>
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-pink-600 hover:text-pink-700 font-semibold group"
                >
                  <span>{language === 'uk' ? 'Читати далі' : 'Читать далее'}</span>
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
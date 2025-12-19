import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Footer = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast({
        title: t('footer.subscribe'),
        description: 'Підтвердження надіслано на електронну пошту.',
      });
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-2xl font-bold">hal</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.usefulLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.howItWorks')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.blog')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Search */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickSearch')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/search" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.search')}
                </Link>
              </li>
              <li>
                <Link to="/search?sort=pop" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.popular')}
                </Link>
              </li>
              <li>
                <Link to="/search?sort=recent" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.recentlyAdded')}
                </Link>
              </li>
              <li>
                <Link to="/search?sort=relevant" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.relevant')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.subscribe')}</h3>
            <p className="text-gray-400 text-sm mb-4">
              {t('footer.subscribeText')}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded-lg hover:from-pink-600 hover:to-red-600 transition-all font-semibold"
              >
                {t('footer.join')}
              </button>
            </form>
            <p className="text-gray-500 text-xs mt-3">
              {t('footer.privacy')}{' '}
              <Link to="/privacy" className="text-pink-400 hover:text-pink-300">
                {t('footer.privacyPolicy')}
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 HAL {t('footer.allRights')}
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors"
              aria-label="Youtube"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
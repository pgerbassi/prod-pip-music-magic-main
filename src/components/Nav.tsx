import React from 'react';
import { Link } from 'react-router-dom';
import { MobileNav } from './MobileNav';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/button';

export const Nav = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-prodpip-primary/80 backdrop-blur-lg border-b border-prodpip-highlight/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo_mcpietro.png"
              alt="MC Pietro Logo"
              className="h-10 w-auto rounded-full bg-gradient-to-br from-[#301E67] via-[#5B8FB9] to-[#B6EADA] backdrop-blur-2xl"  
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-prodpip-text hover:text-prodpip-highlight transition-colors"
            >
              {t('home')}
            </Link>
            <Link
              to="/catalog"
              className="text-prodpip-text hover:text-prodpip-highlight transition-colors"
            >
              {t('catalog')}
            </Link>
            <Button
              variant="ghost"
              className="text-prodpip-text hover:text-prodpip-highlight"
              onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
            >
              {language === 'en' ? 'PT' : 'EN'}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

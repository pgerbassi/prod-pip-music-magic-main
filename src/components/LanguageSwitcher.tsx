import React from 'react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { Languages } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pt' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 bg-prodpip-primary/50 backdrop-blur-sm hover:bg-prodpip-primary/70"
    >
      <Languages className="h-5 w-5" />
    </Button>
  );
};

export default LanguageSwitcher;
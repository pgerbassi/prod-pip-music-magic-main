import React from 'react';
import { Instagram, Youtube, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-prodpip-primary py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold text-prodpip-text mb-4">Prod. Pip</h3>
            <p className="text-prodpip-text/70 max-w-md">
              {t('footerTagline')}
            </p>
          </div>
          <div className="flex space-x-6">
            {[
              { icon: Instagram, href: '#' },
              { icon: Youtube, href: '#' },
              { icon: Mail, href: '#' },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-prodpip-text/70 hover:text-prodpip-highlight transition-colors"
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-prodpip-accent/20 text-center text-prodpip-text/50">
          <p>&copy; {new Date().getFullYear()} Prod. Pip. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
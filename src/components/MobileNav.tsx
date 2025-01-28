import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const menuVariants = {
  closed: {
    opacity: 0,
    x: '100%',
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

const menuItemVariants = {
  closed: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.2
    }
  },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3
    }
  })
};

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();

  const menuItems = [
    { label: t('home'), path: '/' },
    { label: t('catalog'), path: '/catalog' },
  ];

  return (
    <div className="flex items-center justify-end">
      <Button
        variant="ghost"
        size="icon"
        className="text-prodpip-text hover:text-prodpip-highlight md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-prodpip-primary/95 backdrop-blur-lg z-50"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between mb-8">
                <Link to="/" onClick={() => setIsOpen(false)}>
                  <img
                    src="/logo_mcpietro.png"
                    alt="MC Pietro Logo"
                    className="h-10 w-auto"
                  />
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-prodpip-text hover:text-prodpip-highlight"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex flex-col space-y-6">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    custom={i}
                    variants={menuItemVariants}
                  >
                    <Button
                      variant="ghost"
                      className="text-2xl font-bold text-prodpip-text hover:text-prodpip-highlight w-full text-left justify-start"
                      onClick={() => {
                        navigate(item.path);
                        setIsOpen(false);
                      }}
                    >
                      {item.label}
                    </Button>
                  </motion.div>
                ))}
                <motion.div
                  custom={menuItems.length}
                  variants={menuItemVariants}
                >
                  <Button
                    variant="ghost"
                    className="text-2xl font-bold text-prodpip-text hover:text-prodpip-highlight w-full text-left justify-start"
                    onClick={() => {
                      setLanguage(language === 'en' ? 'pt' : 'en');
                      setIsOpen(false);
                    }}
                  >
                    {language === 'en' ? 'Português' : 'English'}
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

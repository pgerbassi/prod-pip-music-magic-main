import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { PlayCircle, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ParallaxBackground } from './animations/ParallaxBackground';
import { AnimatedElement } from './animations/AnimatedElement';
import { MusicVisualizer } from './MusicVisualizer';

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const smoothScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ParallaxBackground className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-prodpip-primary to-prodpip-accent">
        <div 
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: 'url("/monkey_hero.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: 0.15
    }}
  />
      <MusicVisualizer />
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="container mx-auto px-4 text-center z-10">
        <AnimatedElement animation="fadeUp" delay={0.2}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-prodpip-text via-prodpip-highlight to-prodpip-text bg-clip-text text-transparent">
            {t('heroTitle')}
          </h1>
        </AnimatedElement>

        <AnimatedElement animation="fadeUp" delay={0.4}>
          <p className="text-xl md:text-2xl mb-8 text-prodpip-text/80 max-w-2xl mx-auto">
            {t('heroSubtitle')}
          </p>
        </AnimatedElement>

        <AnimatedElement animation="fadeUp" delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="bg-prodpip-highlight hover:bg-prodpip-highlight/80 text-white w-full sm:w-auto"
                onClick={smoothScroll}
              >
                <PlayCircle className="mr-2 h-4 w-4" /> {t('listenNow')}
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                className="border-prodpip-highlight text-prodpip-highlight hover:bg-prodpip-highlight/10 w-full sm:w-auto"
                onClick={() => navigate('/catalog')}
              >
                <ShoppingBag className="mr-2 h-4 w-4" /> {t('browseCatalog')}
              </Button>
            </motion.div>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="fadeUp" delay={0.8}>
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Button
              variant="ghost"
              className="text-prodpip-text/60 hover:text-prodpip-text"
              onClick={smoothScroll}
            >
              Scroll Down
            </Button>
          </motion.div>
        </AnimatedElement>
        <MusicVisualizer audioData={[]} />
      </div>
    </ParallaxBackground>
  );
};

export default Hero;
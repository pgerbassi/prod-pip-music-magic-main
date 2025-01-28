import React, { useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { PlayCircle, ExternalLink, Pause } from 'lucide-react';
import { toast } from './ui/use-toast';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAudio } from '@/contexts/AudioContext';

const featuredBeats = [
  {
    title: 'Summer Vibes',
    titlePt: 'Beat Vibes de Verão',
    genre: 'Pop',
    price: 29.99,
    image: '/logo_mcpietro.png',
    audioSrc: '/mcpietro-teste.mp3',
    artist: 'Prod. Pip'
  },
  {
    title: 'Night Rider',
    titlePt: 'Night Rider',
    genre: 'Hip Hop',
    price: 34.99,
    image: '/logo_mcpietro.png',
    audioSrc: '/mcpietro-teste.mp3',
    artist: 'Prod. Pip'
  },
  {
    title: 'Electric Dreams',
    titlePt: 'Sonhos Elétricos',
    genre: 'Electronic',
    price: 24.99,
    image: '/logo_mcpietro.png',
    audioSrc: '/mcpietro-teste.mp3',
    artist: 'Prod. Pip'
  },
  {
    title: 'Soul Session',
    titlePt: 'Sessão Soul',
    genre: 'R&B',
    price: 39.99,
    image: '/logo_mcpietro.png',
    audioSrc: '/mcpietro-teste.mp3',
    artist: 'Prod. Pip'
  },
  {
    title: 'Urban Legend',
    titlePt: 'Lenda Urbana',
    genre: 'Drill',
    price: 44.99,
    image: '/logo_mcpietro.png',
    audioSrc: '/mcpietro-teste.mp3',
    artist: 'Prod. Pip'
  },
];

const Catalog = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: scrollRef
  });
  const { language } = useLanguage();
  const { setCurrentTrack, currentTrack, isPlaying, setIsPlaying } = useAudio();

  const handleBuy = (beatTitle: string) => {
    toast({
      title: "Redirecting to purchase",
      description: `You're being redirected to purchase ${beatTitle}`,
    });
    window.open('https://google.com', '_blank');
  };

  const handlePlay = (beat: typeof featuredBeats[0]) => {
    if (currentTrack?.src === beat.audioSrc) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack({
        src: beat.audioSrc,
        title: language === 'en' ? beat.title : beat.titlePt,
        artist: beat.artist
      });
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { top } = containerRef.current.getBoundingClientRect();
        if (top < window.innerHeight) {
          controls.start({ opacity: 1, y: 0 });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  useEffect(() => {
    let animationFrameId: number;
    let scrollPosition = 0;
    const scrollSpeed = 1; // Adjust this value to control scroll speed

    const animate = () => {
      if (scrollRef.current) {
        scrollPosition += scrollSpeed;
        
        // Reset position when reaching the end
        if (scrollPosition >= scrollRef.current.scrollWidth - scrollRef.current.clientWidth) {
          scrollPosition = 0;
        }
        
        scrollRef.current.scrollLeft = scrollPosition;
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    // Start animation
    animationFrameId = requestAnimationFrame(animate);

    // Pause animation on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId);
    };

    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(animate);
    };

    scrollRef.current?.addEventListener('mouseenter', handleMouseEnter);
    scrollRef.current?.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      scrollRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const x = useTransform(scrollXProgress, [0, 1], ['0%', '-50%']);

  return (
    <section ref={containerRef} className="py-20 overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center text-prodpip-text">
            {language === 'en' ? 'Featured Beats' : 'Beats em Destaque'}
          </h2>
        </motion.div>
        <div 
          ref={scrollRef} 
          className="overflow-x-hidden relative"
        >
          <div className="flex gap-6 px-8 pb-8 w-max ">
            {[...featuredBeats, ...featuredBeats].map((beat, index) => (
              <motion.div
                key={`${beat.title}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-none bg-[#B6EADA] bg-opacity-10 rounded-lg overflow-hidden shadow-lg w-72 "
              >
                <img src={beat.image} alt={language === 'en' ? beat.title : beat.titlePt} className="w-full h-48 object-cover bg-gradient-to-br from-[#301E67] via-[#5B8FB9] to-[#B6EADA] backdrop-blur-2xl" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-prodpip-text">
                    {language === 'en' ? beat.title : beat.titlePt}
                  </h3>
                  <p className="text-prodpip-text/70 mb-4">{beat.genre}</p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-prodpip-highlight text-xl font-bold">
                      {new Intl.NumberFormat(language === 'en' ? 'en-US' : 'pt-BR', {
                        style: 'currency',
                        currency: language === 'en' ? 'USD' : 'BRL'
                      }).format(beat.price)}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-prodpip-text hover:text-prodpip-highlight h-8 w-8 p-0"
                        onClick={() => handlePlay(beat)}
                      >
                        {currentTrack?.src === beat.audioSrc && isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <PlayCircle className={`h-4 w-4 ${currentTrack?.src === beat.audioSrc ? 'text-prodpip-highlight' : ''}`} />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        className="bg-prodpip-highlight hover:bg-prodpip-highlight/80 px-3"
                        onClick={() => handleBuy(language === 'en' ? beat.title : beat.titlePt)}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {language === 'en' ? 'Buy' : 'Comprar'}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlayCircle, ExternalLink, ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAudio } from '@/contexts/AudioContext';
import { AudioPlayer } from '@/components/AudioPlayer';
import { useNavigate } from 'react-router-dom';

const products = [
  {
    title: 'Summer Vibes Beat',
    subtitle: 'Perfect for your next summer hit',
    titlePt: 'Beat Vibes de Verão',
    subtitlePt: 'Perfeito para seu próximo hit de verão',
    genre: 'Pop',
    price: 29.99,
    image: '/logo_mcpietro.png',
    audioSrc: '/mcpietro-teste.mp3',
    artist: 'Prod. Pip'
  },
  {
    title: 'Night Rider',
    subtitle: 'Dark and moody trap beat',
    titlePt: 'Night Rider',
    subtitlePt: 'Beat trap dark e atmosférico',
    genre: 'Hip Hop',
    price: 34.99,
    image: '/logo_mcpietro.png',
    audioSrc: '/mcpietro-teste.mp3',
    artist: 'Prod. Pip'
  },
  {
    title: 'Electric Dreams',
    subtitle: 'Futuristic electronic vibes',
    titlePt: 'Sonhos Elétricos',
    subtitlePt: 'Vibes eletrônicas futuristas',
    genre: 'Electronic',
    price: 24.99,
    image: '/logo_mcpietro.png',
    audioSrc: '/mcpietro-teste.mp3',
    artist: 'Prod. Pip'
  },
  {
    title: 'Soul Session',
    subtitle: 'Smooth R&B production',
    titlePt: 'Sessão Soul',
    subtitlePt: 'Produção suave de R&B',
    genre: 'R&B',
    price: 39.99,
    image: '/logo_mcpietro.png',
    audioSrc: '/mcpietro-teste.mp3',
    artist: 'Prod. Pip'
  },
  {
    title: 'Urban Legend',
    subtitle: 'Hard-hitting drill beat',
    titlePt: 'Lenda Urbana',
    subtitlePt: 'Beat drill impactante',
    genre: 'Drill',
    price: 44.99,
    image: '/logo_mcpietro.png',
    audioSrc: '/mcpietro-teste.mp3',
    artist: 'Prod. Pip'
  },
  {
    title: 'Melodic Wave',
    subtitle: 'Emotional melodic rap production',
    titlePt: 'Onda Melódica',
    subtitlePt: 'Produção de rap melódico emocional',
    genre: 'Rap',
    price: 49.99,
    image: '/logo_mcpietro.png',
    audioSrc: '/mcpietro-teste.mp3',
    artist: 'Prod. Pip'
  }
];

const CatalogPage = () => {
  const { t, language } = useLanguage();
  const { setCurrentTrack, currentTrack, isPlaying, setIsPlaying } = useAudio();
  const navigate = useNavigate();

  const handleBuy = (productTitle: string) => {
    toast({
      title: t('redirectingToPurchase'),
      description: `${t('redirectingMessage')} ${productTitle}`,
    });
    window.open('https://google.com', '_blank');
  };

  const handlePlay = (product: typeof products[0]) => {
    if (currentTrack?.src === product.audioSrc) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack({
        src: product.audioSrc,
        title: language === 'en' ? product.title : product.titlePt,
        artist: product.artist
      });
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-prodpip-primary py-12 md:py-20">
      <div className="container mx-auto px-4 pb-24">
        <div className="mb-8">
          <Button
            variant="ghost"
            className="text-prodpip-text hover:text-prodpip-highlight -ml-2"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('backToHome')}
          </Button>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-center text-prodpip-text animate-fade-up">
          {t('featuredBeats')}
        </h1>
        <p className="text-lg md:text-xl text-center mb-8 md:mb-12 text-prodpip-text/80 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          {language === 'en' ? 'Find the perfect beat for your next hit' : 'Encontre o beat perfeito para seu próximo hit'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {products.map((product, index) => (
            <div
              key={product.title}
              className="rounded-lg overflow-hidden bg-prodpip-accent/20 hover:bg-prodpip-accent/30 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img src={product.image} alt={language === 'en' ? product.title : product.titlePt} className="w-full h-40 md:h-48 object-cover" />
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold mb-2 text-prodpip-text">
                  {language === 'en' ? product.title : product.titlePt}
                </h3>
                <p className="text-sm md:text-base text-prodpip-text/70 mb-2">
                  {language === 'en' ? product.subtitle : product.subtitlePt}
                </p>
                <p className="text-sm md:text-base text-prodpip-text/70 mb-4">{product.genre}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg md:text-xl font-bold text-prodpip-highlight">
                    {new Intl.NumberFormat(language === 'en' ? 'en-US' : 'pt-BR', {
                      style: 'currency',
                      currency: language === 'en' ? 'USD' : 'BRL'
                    }).format(product.price)}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-prodpip-text hover:text-prodpip-highlight"
                      onClick={() => handlePlay(product)}
                    >
                      <PlayCircle className={`h-4 w-4 ${currentTrack?.src === product.audioSrc && isPlaying ? 'text-prodpip-highlight' : ''}`} />
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-prodpip-highlight hover:bg-prodpip-highlight/80 whitespace-nowrap"
                      onClick={() => handleBuy(language === 'en' ? product.title : product.titlePt)}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">{t('buyNow')}</span>
                      <span className="sm:hidden">Buy</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AudioPlayer />
    </div>
  );
};

export default CatalogPage;
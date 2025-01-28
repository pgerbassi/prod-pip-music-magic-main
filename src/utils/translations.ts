export const translations = {
  en: {
    // Navigation
    home: "Home",
    catalog: "Catalog",
    about: "About",
    contact: "Contact",
    backToHome: "Back to Home",
    
    // Hero
    heroTitle: "Bring Your Music to Life with Prod. Pip!",
    heroSubtitle: "Professional music production, beats, and compositions tailored to your sound.",
    listenNow: "Listen Now",
    browseCatalog: "Browse Catalog",
    
    // About
    journeySoFar: "The Journey So Far",
    startedProduction: "Started Music Production",
    beganJourney: "Began journey in professional music production",
    majorCollaboration: "First Major Collaboration",
    workedWith: "Worked with renowned artists in the industry",
    industryRecognition: "Industry Recognition",
    receivedAwards: "Received multiple awards for production excellence",
    studioExpansion: "Studio Expansion",
    launchedStudio: "Launched state-of-the-art production facility",
    
    // Catalog
    featuredBeats: "Featured Beats",
    buyNow: "Buy Now",
    redirectingToPurchase: "Redirecting to purchase",
    redirectingMessage: "You're being redirected to purchase",
    viewDetails: "View Details",
    addToCart: "Add to Cart",
    checkout: "Checkout",
    
    // Footer
    footerTagline: "Creating beats that move souls and productions that define genres.",
    allRightsReserved: "All rights reserved.",
  },
  pt: {
    // Navigation
    home: "Início",
    catalog: "Catálogo",
    about: "Sobre",
    contact: "Contato",
    backToHome: "Voltar ao Início",
    
    // Hero
    heroTitle: "Dê Vida à Sua Música com Prod. Pip!",
    heroSubtitle: "Produção musical profissional, beats e composições adaptados ao seu som.",
    listenNow: "Ouvir Agora",
    browseCatalog: "Ver Catálogo",
    
    // About
    journeySoFar: "Nossa Jornada até Aqui",
    startedProduction: "Início da Produção Musical",
    beganJourney: "Início da jornada em produção musical profissional",
    majorCollaboration: "Primeira Grande Colaboração",
    workedWith: "Trabalhou com artistas renomados da indústria",
    industryRecognition: "Reconhecimento da Indústria",
    receivedAwards: "Recebeu múltiplos prêmios por excelência em produção",
    studioExpansion: "Expansão do Estúdio",
    launchedStudio: "Inaugurou instalação de produção state-of-the-art",
    
    // Catalog
    featuredBeats: "Beats em Destaque",
    buyNow: "Comprar Agora",
    redirectingToPurchase: "Redirecionando para compra",
    redirectingMessage: "Você está sendo redirecionado para comprar",
    viewDetails: "Ver Detalhes",
    addToCart: "Adicionar ao Carrinho",
    checkout: "Finalizar Compra",
    
    // Footer
    footerTagline: "Criando beats que movem almas e produções que definem gêneros.",
    allRightsReserved: "Todos os direitos reservados.",
  }
};

export type Language = 'en' | 'pt';
export type TranslationKey = keyof typeof translations.en;
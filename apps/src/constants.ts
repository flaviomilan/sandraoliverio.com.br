export const CONTACT = {
  WHATSAPP: {
    PHONE_NUMBER: '',
    DEFAULT_MESSAGE: 'Olá Sandra, gostaria de mais informações sobre seus serviços.'
  },
  EMAIL: 'contato@sandraoliverio.com.br',
  PHONE: '',
  ADDRESS: {
    CITY: 'Ribeirão Preto',
    STATE: 'SP',
    COUNTRY: 'Brasil'
  }
};

export const URLS = {
  WHATSAPP_BASE: 'https://wa.me',
  INSTAGRAM: 'https://instagram.com/sandra_oliverio'
};

export const SITE = {
  URL: 'https://sandraoliverio.com.br',
  TITLE: 'Sandra Oliverio',
  DESCRIPTION: 'Sandra Oliverio Cerimonial e Assessoria de Casamentos - Criando momentos inesquecíveis com elegância e sofisticação.',
  KEYWORDS: ['cerimonial de casamento', 'assessoria de casamento', 'casamento de luxo', 'eventos corporativos', 'debutantes', 'festas de 15 anos', 'Ribeirão Preto'],
  FOUNDED_YEAR: 2008,
  LAST_UPDATED: '2025-05-09'
};

export const INSTAGRAM = {
  ACCESS_TOKEN: import.meta.env.INSTAGRAM_ACCESS_TOKEN || null,
  API_BASE: 'https://graph.instagram.com',
  DEFAULT_LIMIT: 6,
  CACHE_DURATION: 3600000,
  USE_FALLBACK: import.meta.env.INSTAGRAM_USE_FALLBACK === 'true' || false
};

export const ANALYTICS = {
  GA_MEASUREMENT_ID: "G-X3PQW9L1HV",
  PRIVACY: {
    ANONYMIZE_IP: true,
    RESPECT_DNT: true,
    ALLOW_AD_PERSONALIZATION: false
  },

  DEBUG_MODE: import.meta.env.MODE === 'development',
  ENABLED: true
};

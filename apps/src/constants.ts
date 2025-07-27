// Constantes centralizadas para uso em toda a aplicação

// Contato
export const CONTACT = {
  WHATSAPP: {
    PHONE_NUMBER: '5516981234567', // Número atualizado - verificar com cliente
    DEFAULT_MESSAGE: 'Olá Sandra, gostaria de mais informações sobre seus serviços.'
  },
  EMAIL: 'contato@sandraoliverio.com.br',
  PHONE: '(16) 98123-4567', // Número atualizado - verificar com cliente
  ADDRESS: {
    CITY: 'Ribeirão Preto',
    STATE: 'SP',
    COUNTRY: 'Brasil'
  }
};

// URLs e endpoints
export const URLS = {
  WHATSAPP_BASE: 'https://wa.me',
  INSTAGRAM: 'https://instagram.com/sandra_oliverio'
};

// Configurações do site
export const SITE = {
  URL: 'https://sandraoliverio.com.br',
  TITLE: 'Sandra Oliverio',
  DESCRIPTION: 'Sandra Oliverio Cerimonial e Assessoria de Casamentos - Criando momentos inesquecíveis com elegância e sofisticação.',
  KEYWORDS: ['cerimonial de casamento', 'assessoria de casamento', 'casamento de luxo', 'eventos corporativos', 'debutantes', 'festas de 15 anos', 'Ribeirão Preto'],
  FOUNDED_YEAR: 2008,
  LAST_UPDATED: '2025-05-09'
};

// Configurações do Instagram
export const INSTAGRAM = {
  // Token de acesso de longa duração do Instagram Basic Display API
  // IMPORTANTE: Este token deve ser configurado nas variáveis de ambiente em produção
  ACCESS_TOKEN: import.meta.env.INSTAGRAM_ACCESS_TOKEN || null,
  
  // URL base da API
  API_BASE: 'https://graph.instagram.com',
  
  // Configurações padrão
  DEFAULT_LIMIT: 6,
  CACHE_DURATION: 3600000, // 1 hora em milliseconds
  
  // Fallback - usar posts estáticos se API falhar
  USE_FALLBACK: import.meta.env.INSTAGRAM_USE_FALLBACK === 'true' || false
};

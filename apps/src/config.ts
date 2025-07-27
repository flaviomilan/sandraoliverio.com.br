// Importando constantes centralizadas
import { CONTACT, SITE } from './constants';

// Configurações centralizadas do site
export default {
  // Informações do site
  site: SITE.URL,
  title: SITE.TITLE,
  
  // Configurações de redes sociais e contato
  socialMedia: {
    // Configuração do WhatsApp
    whatsapp: {
      phoneNumber: CONTACT.WHATSAPP.PHONE_NUMBER,
      defaultMessage: CONTACT.WHATSAPP.DEFAULT_MESSAGE
    }
  }
};
// Utilitários para Google Analytics 4
// Funções helper para tracking de eventos personalizados

import type { GAEventData, GAEventParams } from '../types/analytics';
import { ANALYTICS } from '../constants';

/**
 * Envia evento personalizado para o Google Analytics
 * @param eventData - Dados do evento
 */
export function trackEvent(eventData: GAEventData): void {
  if (!ANALYTICS.ENABLED || !window.gtag) {
    if (ANALYTICS.DEBUG_MODE) {
      console.log('GA Event (tracking disabled):', eventData);
    }
    return;
  }

  window.gtag('event', eventData.event_name, eventData.parameters);
  
  if (ANALYTICS.DEBUG_MODE) {
    console.log('GA Event tracked:', eventData);
  }
}

/**
 * Eventos específicos do negócio
 */
export const analyticsEvents = {
  // Contato
  contactFormSubmit: (serviceType?: string) => {
    trackEvent({
      event_name: 'contact_form_submit',
      parameters: {
        event_category: 'engagement',
        service_type: serviceType,
        event_label: 'contact_form'
      }
    });
  },

  whatsappClick: (source?: string) => {
    trackEvent({
      event_name: 'whatsapp_click',
      parameters: {
        event_category: 'engagement',
        event_label: source || 'unknown'
      }
    });
  },

  phoneClick: () => {
    trackEvent({
      event_name: 'phone_click',
      parameters: {
        event_category: 'engagement',
        event_label: 'header_phone'
      }
    });
  },

  emailClick: () => {
    trackEvent({
      event_name: 'email_click',
      parameters: {
        event_category: 'engagement',
        event_label: 'footer_email'
      }
    });
  },

  // Serviços
  serviceView: (serviceName: string) => {
    trackEvent({
      event_name: 'service_view',
      parameters: {
        event_category: 'content',
        service_type: serviceName,
        event_label: 'service_card'
      }
    });
  },

  // Conteúdo
  testimonialView: (clientName?: string) => {
    trackEvent({
      event_name: 'testimonial_view',
      parameters: {
        event_category: 'content',
        event_label: clientName || 'testimonial'
      }
    });
  },

  galleryImageClick: (imageIndex?: number) => {
    trackEvent({
      event_name: 'gallery_image_click',
      parameters: {
        event_category: 'engagement',
        value: imageIndex,
        event_label: 'instagram_gallery'
      }
    });
  }
};

/**
 * Verifica se o Google Analytics está carregado e funcionando
 */
export function isAnalyticsReady(): boolean {
  return ANALYTICS.ENABLED && typeof window.gtag === 'function';
}

/**
 * Configura dimensões customizadas
 */
export function setCustomDimensions(dimensions: Record<string, string>): void {
  if (!isAnalyticsReady()) return;

  window.gtag!('config', ANALYTICS.GA_MEASUREMENT_ID!, {
    custom_map: dimensions
  });
}
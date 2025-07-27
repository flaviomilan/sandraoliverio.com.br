// Tipos TypeScript para Google Analytics 4

export interface AnalyticsConfig {
  GA_MEASUREMENT_ID: string | null;
  PRIVACY: {
    ANONYMIZE_IP: boolean;
    RESPECT_DNT: boolean;
    ALLOW_AD_PERSONALIZATION: boolean;
  };
  DEBUG_MODE: boolean;
  ENABLED: boolean;
}

export interface GAEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  service_type?: string;
  page_title?: string;
  page_location?: string;
}

export interface GACustomDimensions {
  dimension1?: string; // service_type
  dimension2?: string; // event_category
}

// Eventos personalizados para o site
export type GACustomEvents = 
  | 'contact_form_submit'
  | 'whatsapp_click'
  | 'service_view'
  | 'testimonial_view'
  | 'gallery_image_click'
  | 'phone_click'
  | 'email_click';

export interface GAEventData {
  event_name: GACustomEvents;
  parameters?: GAEventParams;
}

// Extensão da interface global gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}
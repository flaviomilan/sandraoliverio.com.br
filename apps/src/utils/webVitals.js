// Integração de Web Vitals para monitoramento de performance

/**
 * Classe para monitorar e reportar Web Vitals
 */
class WebVitalsReporter {
  constructor() {
    this.analyticsEndpoint = 'https://analytics.sandraoliverio.com.br/collect';
    this.debug = false; // Ativar para logs de debug
    this.initialized = false;
  }

  /**
   * Inicializa o monitoramento de Web Vitals
   */
  init() {
    if (this.initialized) return;

    // Verificar se o módulo web-vitals está disponível
    if (typeof webVitals === 'undefined') {
      // Carrega o módulo web-vitals assincronamente
      this.loadScript('https://unpkg.com/web-vitals', () => {
        this.setupVitalsTracking();
      });
    } else {
      this.setupVitalsTracking();
    }

    this.initialized = true;
  }

  /**
   * Configura o rastreamento das métricas Web Vitals principais
   */
  setupVitalsTracking() {
    if (typeof webVitals !== 'undefined') {
      // Rastreando LCP (Largest Contentful Paint)
      webVitals.onLCP(this.reportMetric.bind(this));

      // Rastreando FID (First Input Delay)
      webVitals.onFID(this.reportMetric.bind(this));

      // Rastreando CLS (Cumulative Layout Shift)
      webVitals.onCLS(this.reportMetric.bind(this));

      // Rastreando TTFB (Time to First Byte)
      webVitals.onTTFB(this.reportMetric.bind(this));

      // Rastreando FCP (First Contentful Paint)
      webVitals.onFCP(this.reportMetric.bind(this));

      if (this.debug) {
        console.log('Web Vitals tracking initialized');
      }
    }
  }

  /**
   * Reporta as métricas coletadas
   * @param {Object} metric - Métrica Web Vital
   */
  reportMetric(metric) {
    if (this.debug) {
      console.log(`[Web Vitals] ${metric.name}: ${metric.value}`);
    }

    // Adicionar dados da página e usuário
    const data = {
      ...metric,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    };

    // Em produção, enviar para o endpoint analítico
    if (window.location.hostname !== 'localhost') {
      this.sendToAnalytics(data);
    }

    // Armazenar localmente para depuração
    this.storeLocally(data);
  }

  /**
   * Envia métricas para um serviço de analytics
   * @param {Object} data - Dados da métrica
   */
  sendToAnalytics(data) {
    // Endpoint placeholder - implementar conforme necessário
    if (navigator.sendBeacon) {
      navigator.sendBeacon(this.analyticsEndpoint, JSON.stringify(data));
    } else {
      fetch(this.analyticsEndpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        keepalive: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch(e => {
        if (this.debug) console.error('Error sending metrics', e);
      });
    }
  }

  /**
   * Armazena métricas localmente para debugging
   * @param {Object} data - Dados da métrica
   */
  storeLocally(data) {
    try {
      const vitals = JSON.parse(localStorage.getItem('web-vitals') || '[]');
      vitals.push(data);
      localStorage.setItem('web-vitals', JSON.stringify(vitals));
    } catch (e) {
      if (this.debug) console.error('Error storing metrics locally', e);
    }
  }

  /**
   * Carrega um script externo
   * @param {string} src - URL do script
   * @param {Function} callback - Callback após carregamento
   */
  loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
  }
}

// Exporta a classe para uso em outras partes da aplicação
export default WebVitalsReporter;

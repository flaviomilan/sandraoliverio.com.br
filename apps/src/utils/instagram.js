/**
 * Instagram Basic Display API Integration
 *
 * Este módulo fornece funcionalidades para buscar posts do Instagram
 * usando a Instagram Basic Display API oficial do Meta.
 *
 * Configuração necessária:
 * 1. Criar um app no Facebook Developers (developers.facebook.com)
 * 2. Configurar Instagram Basic Display Product
 * 3. Obter Access Token de longa duração
 * 4. Configurar variáveis de ambiente
 */

// Configuração da API
const INSTAGRAM_API_BASE = 'https://graph.instagram.com';

/**
 * Busca posts do Instagram usando a Basic Display API
 * @param {string} accessToken - Token de acesso do Instagram
 * @param {number} limit - Número máximo de posts para buscar (padrão: 6)
 * @returns {Promise<Array>} Array de posts do Instagram
 */
export async function fetchInstagramPosts(accessToken, limit = 6) {
  try {
    // Campos que queremos buscar de cada post
    const fields = ['id', 'media_type', 'media_url', 'permalink', 'caption', 'timestamp'].join(',');

    // URL da API com parâmetros
    const apiUrl = `${INSTAGRAM_API_BASE}/me/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Filtra apenas imagens (exclui vídeos para melhor performance)
    const imagePosts = data.data.filter(
      post => post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM'
    );

    // Formata os dados para o formato esperado pelo componente
    return imagePosts.map(post => ({
      id: post.id,
      image: post.media_url,
      caption: post.caption || 'Post do Instagram',
      link: post.permalink,
      timestamp: post.timestamp,
    }));
  } catch (error) {
    console.error('Erro ao buscar posts do Instagram:', error);
    throw error;
  }
}

/**
 * Valida se um token de acesso ainda é válido
 * @param {string} accessToken - Token de acesso a ser validado
 * @returns {Promise<boolean>} True se o token é válido
 */
export async function validateInstagramToken(accessToken) {
  try {
    const response = await fetch(`${INSTAGRAM_API_BASE}/me?access_token=${accessToken}`);
    return response.ok;
  } catch (error) {
    console.error('Erro ao validar token do Instagram:', error);
    return false;
  }
}

/**
 * Renova um token de acesso de longa duração
 * @param {string} accessToken - Token atual
 * @returns {Promise<string>} Novo token de acesso
 */
export async function refreshInstagramToken(accessToken) {
  try {
    const response = await fetch(
      `${INSTAGRAM_API_BASE}/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error('Falha ao renovar token');
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Erro ao renovar token do Instagram:', error);
    throw error;
  }
}

/**
 * Posts de fallback caso a API falhe
 * Usando imagens existentes do projeto como backup
 */
export const fallbackInstagramPosts = [
  {
    id: 'fallback_1',
    image: '/images/casamento-1.avif',
    caption: 'Cerimônia elegante com decoração sofisticada ✨ #casamento #elegancia',
    link: 'https://instagram.com/sandra_oliverio',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'fallback_2',
    image: '/images/casamento.avif',
    caption: 'Detalhes florais únicos para um casamento inesquecível 💐 #flores #casamento',
    link: 'https://instagram.com/sandra_oliverio',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'fallback_3',
    image: '/images/corporativo.avif',
    caption: 'Evento corporativo de alto padrão 🏢 #eventocorporativo #profissional',
    link: 'https://instagram.com/sandra_oliverio',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'fallback_4',
    image: '/images/15anos.avif',
    caption: 'Festa de 15 anos com elegância e modernidade 🎉 #debutante #festa15anos',
    link: 'https://instagram.com/sandra_oliverio',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'fallback_5',
    image: '/images/sandraoliverio.avif',
    caption: 'Sandra Oliverio - Assessoria personalizada 💫 #assessoria #eventos',
    link: 'https://instagram.com/sandra_oliverio',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'fallback_6',
    image: '/images/casamento-1.avif',
    caption: 'Arranjos florais que encantam 🌸 #decoracao #flores',
    link: 'https://instagram.com/sandra_oliverio',
    timestamp: new Date().toISOString(),
  },
];

/**
 * Função principal para obter posts do Instagram com fallback
 * @param {Object} options - Opções de configuração
 * @param {string} options.accessToken - Token de acesso (opcional)
 * @param {number} options.limit - Limite de posts
 * @param {boolean} options.useFallback - Forçar uso do fallback
 * @returns {Promise<Array>} Posts do Instagram
 */
export async function getInstagramPosts({
  accessToken = null,
  limit = 6,
  useFallback = false,
} = {}) {
  // Se não há token ou forçar fallback, usar dados estáticos
  if (!accessToken || useFallback) {
    console.info('Usando posts de fallback do Instagram');
    return fallbackInstagramPosts.slice(0, limit);
  }

  try {
    // Tentar buscar posts reais da API
    const posts = await fetchInstagramPosts(accessToken, limit);

    if (posts.length === 0) {
      console.warn('Nenhum post encontrado na API, usando fallback');
      return fallbackInstagramPosts.slice(0, limit);
    }

    return posts;
  } catch (error) {
    console.error('Erro na API do Instagram, usando fallback:', error);
    return fallbackInstagramPosts.slice(0, limit);
  }
}

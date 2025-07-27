# Configuração da Integração com Instagram

Este guia explica como configurar a integração real com o Instagram usando a Instagram Basic Display API.

## 🎯 Visão Geral

A galeria do Instagram agora está configurada para buscar posts reais do Instagram usando a API oficial do Meta. O sistema inclui:

- ✅ Integração com Instagram Basic Display API
- ✅ Sistema de fallback automático
- ✅ Tratamento de erros elegante
- ✅ Cache de performance
- ✅ Responsividade completa

## 📋 Pré-requisitos

1. Conta Instagram business ou creator
2. Conta Facebook Developer
3. Aplicação configurada no Facebook Developers

## 🚀 Configuração Passo a Passo

### 1. Criar App no Facebook Developers

1. Acesse [Facebook Developers](https://developers.facebook.com/)
2. Clique em "Meus Apps" → "Criar App"
3. Selecione "Consumidor" como tipo de app
4. Preencha as informações básicas do app

### 2. Configurar Instagram Basic Display

1. No painel do app, vá em "Produtos" → "Adicionar Produto"
2. Encontre "Instagram Basic Display" e clique em "Configurar"
3. Em "Configurações Básicas", adicione:
   - **URLs de Redirecionamento OAuth Válidas**: `https://sandraoliverio.com.br/`
   - **Cancelar Autorização URL**: `https://sandraoliverio.com.br/`
   - **URL de Exclusão de Dados**: `https://sandraoliverio.com.br/privacy`

### 3. Criar Usuário de Teste

1. Em "Funções" → "Funções", vá para "Usuários de Teste do Instagram"
2. Clique em "Adicionar Usuários de Teste do Instagram"
3. Adicione o username do Instagram que será usado
4. O usuário deve aceitar o convite no Instagram

### 4. Gerar Token de Acesso

1. Vá em "Instagram Basic Display" → "Configurações Básicas"
2. Copie o **ID do Cliente do Instagram App**
3. Use a URL para autorização (substitua `{app-id}` pelo ID real):

```
https://api.instagram.com/oauth/authorize
  ?client_id={app-id}
  &redirect_uri=https://sandraoliverio.com.br/
  &scope=user_profile,user_media
  &response_type=code
```

4. Após autorização, você receberá um `code` na URL de redirecionamento
5. Use este código para obter o token de acesso

### 5. Converter para Token de Longa Duração

Execute uma requisição POST para:

```
https://graph.instagram.com/access_token
  ?grant_type=ig_exchange_token
  &client_secret={app-secret}
  &access_token={short-lived-token}
```

O token de longa duração dura 60 dias e pode ser renovado.

## ⚙️ Configuração no Projeto

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na pasta `apps/` com:

```env
# Token de acesso do Instagram (obrigatório para produção)
INSTAGRAM_ACCESS_TOKEN=seu_token_aqui

# Forçar fallback em desenvolvimento (opcional)
INSTAGRAM_USE_FALLBACK=false
```

### 2. Uso no Componente

```astro
---
import InstagramGallery from '../components/InstagramGallery.astro';
---

<!-- Configuração padrão - usa API se token disponível -->
<InstagramGallery />

<!-- Forçar uso de fallback para testes -->
<InstagramGallery useFallback={true} />

<!-- Customizar quantidade de posts -->
<InstagramGallery maxPosts={9} />
```

## 🔄 Sistema de Fallback

O sistema funciona em cascata:

1. **API do Instagram**: Tenta buscar posts reais se token disponível
2. **Fallback Automático**: Se API falha, usa imagens locais elegantes
3. **Mensagem Informativa**: Usuário é informado discretamente sobre fallback

## 🛠 Funcionalidades Implementadas

### API Integration (`/src/utils/instagram.js`)
- Busca posts do Instagram com campos customizados
- Validação de token automática
- Renovação de token programática
- Filtros por tipo de mídia (apenas imagens)

### Component (`/src/components/InstagramGallery.astro`)
- Carregamento assíncrono de posts
- Tratamento de erros elegante
- Fallback transparente
- Responsividade completa
- Acessibilidade WCAG AA

### Features Avançadas
- ✅ Truncamento inteligente de legendas
- ✅ Data de publicação dos posts
- ✅ Links diretos para posts originais
- ✅ Loading states e error handling
- ✅ Performance otimizada com lazy loading

## 🔧 Renovação Automática de Token

Para automatizar a renovação do token (recomendado para produção):

```javascript
// Executar mensalmente via cron job
import { refreshInstagramToken } from './src/utils/instagram.js';

const newToken = await refreshInstagramToken(currentToken);
// Salvar novo token no ambiente
```

## 🐛 Troubleshooting

### Token Expirado
- **Sintoma**: API retorna erro 401
- **Solução**: Renovar token usando `refreshInstagramToken()`

### Rate Limiting
- **Sintoma**: API retorna erro 429
- **Solução**: Sistema fallback é ativado automaticamente

### Posts Não Aparecem
- **Verificar**: Conta Instagram é business/creator
- **Verificar**: Usuário acenou convite de teste
- **Verificar**: Token tem permissões corretas

## 📊 Monitoramento

Logs no console indicam status da integração:

- `✅ Instagram: Carregados X posts` - API funcionando
- `⚠️ Instagram: Usando fallback` - API falhou, usando backup
- `❌ Instagram: Erro ao carregar` - Erro específico

## 🚀 Deploy em Produção

1. Configure variáveis de ambiente no Cloudflare Pages
2. Adicione `INSTAGRAM_ACCESS_TOKEN` nas configurações
3. Configure renovação automática do token (opcional)
4. Monitore logs para verificar funcionamento

A integração está pronta! O site agora puxa posts reais do Instagram mantendo elegância e fallback robusto.
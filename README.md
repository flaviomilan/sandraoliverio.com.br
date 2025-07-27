# Sandra Olivério Wedding Planner - Website

Site institucional para a cerimonialista de casamentos Sandra Olivério, com foco em um design minimalista de luxo moderno.

## Tecnologias Utilizadas

- Astro.js
- Cloudflare Pages

## Configuração para Deployment no Cloudflare Pages

### Método 1: Deploy Manual

1. **Acesse o Cloudflare Dashboard**:
   - Entre em sua conta Cloudflare e navegue até a seção "Pages"
   - Clique em "Create a project" e selecione "Connect to Git"

2. **Conecte ao Repositório**:
   - Selecione o repositório GitHub que contém este projeto
   - Configure as opções de build:
     - Framework preset: Astro
     - Build command: `npm run build`
     - Build output directory: `dist`

3. **Configurações Adicionais**:
   - Adicione as seguintes variáveis de ambiente (se necessário):
     - NODE_VERSION: 18

4. **Deploy**:
   - Clique em "Save and Deploy"

### Método 2: GitHub Actions (Automatizado)

Este projeto já contém um fluxo de trabalho do GitHub Actions para deployment automático.

1. **Configure os Secrets no GitHub**:
   - Adicione os seguintes secrets ao repositório:
     - `CLOUDFLARE_API_TOKEN`: Token de API do Cloudflare (com permissões para Pages)
     - `CLOUDFLARE_ACCOUNT_ID`: ID da sua conta Cloudflare

2. **Primeiro Deploy**:
   - O primeiro deploy deve ser feito manualmente no Cloudflare Pages para criar o projeto
   - Depois disso, cada push para a branch main iniciará o deployment automático

## Adaptação de Estilo

O site segue as diretrizes de estilo para um Cerimonial de Casamentos com foco em Luxo Moderno:

- Paleta neutra: ivory, champagne, blush, warm gray com acentos em gold foil
- Tipografia elegante combinando fontes serif para títulos e sans-serif minimalista para o corpo
- Design limpo com espaço negativo e foco em detalhes de luxo

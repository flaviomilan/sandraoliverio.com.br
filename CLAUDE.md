# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a wedding planner website for Sandra Oliverio, built with Astro.js and deployed on Cloudflare Pages. The site features a luxury modern design with elegant typography and focuses on wedding ceremonies, corporate events, and 15-year celebrations.

## Key Technologies

- **Framework**: Astro.js (v5.7.10) - Static site generation
- **Deployment**: Cloudflare Pages with Wrangler
- **Styling**: Custom CSS with modern luxury design principles
- **Fonts**: Playfair Display (serif headers) + Montserrat (sans-serif body)
- **Color Palette**: Ivory, champagne, blush, warm gray with gold foil accents

## Project Structure

```
/
├── apps/                    # Main application directory
│   ├── src/
│   │   ├── components/      # Reusable Astro components
│   │   ├── layouts/         # Page layouts (MainLayout.astro is primary)
│   │   ├── pages/           # Route pages (.astro files)
│   │   ├── utils/           # JavaScript utilities
│   │   ├── constants.ts     # Centralized constants (contact info, URLs)
│   │   └── config.ts        # App configuration
│   ├── public/              # Static assets
│   └── dist/                # Build output
└── infra/aws/               # Terraform infrastructure code
```

## Common Commands

**Development:**
```bash
cd apps
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

**Deployment:**
```bash
cd apps
npm run deploy       # Deploy to Cloudflare Pages via Wrangler
```

**Code Quality:**
```bash
# Linting and formatting
npm run lint           # Run ESLint check
npm run lint:fix       # Auto-fix ESLint issues
npm run format         # Format code with Prettier
npm run format:check   # Check formatting without modifying files
npm run type-check     # Run Astro type checking
npm run code-quality   # Run all checks (lint + format + type)
npm run code-fix       # Auto-fix all issues (lint + format)
```

**Analytics Configuration:**
```bash
# Configure Google Analytics 4
# Set environment variable GA_MEASUREMENT_ID with your Google Analytics ID
# Example: GA_MEASUREMENT_ID=G-XXXXXXXXXX

# For development:
echo "GA_MEASUREMENT_ID=G-XXXXXXXXXX" >> apps/.env

# For production (Cloudflare Pages):
# Add GA_MEASUREMENT_ID in Cloudflare Pages dashboard -> Settings -> Environment variables
```

## Architecture Notes

- **Main Layout**: `MainLayout.astro` contains the complete page structure including SEO meta tags, structured data (JSON-LD), navigation, and footer
- **Constants**: Contact information, URLs, and site metadata are centralized in `src/constants.ts`
- **SEO**: Comprehensive SEO setup with Open Graph, Twitter Cards, and Schema.org structured data for local business and event planning services
- **Mobile-First**: Responsive design with mobile menu implementation
- **Performance**: Optimized images (AVIF format), font preloading, and static generation

## Deployment Configuration

- **Site URL**: https://sandraoliverio.com.br
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Platform**: Cloudflare Pages
- **Wrangler Config**: `wrangler.toml` in apps directory

## Important Files

- `apps/src/constants.ts` - Contact info, WhatsApp number, site metadata, analytics config
- `apps/src/layouts/MainLayout.astro` - Primary page layout with SEO and Google Analytics
- `apps/src/components/GoogleAnalytics.astro` - Google Analytics 4 implementation
- `apps/src/utils/analytics.ts` - Analytics helper functions and event tracking
- `apps/src/types/analytics.ts` - TypeScript types for analytics
- `apps/astro.config.mjs` - Astro configuration
- `apps/wrangler.toml` - Cloudflare deployment settings

## Development Guidelines

Follow these software development best practices to ensure superior quality:

**Core Principles:**
- **DRY (Don't Repeat Yourself)**: Centralize reusable code in components and utilities
- **KISS (Keep It Simple, Stupid)**: Prefer simple, readable solutions over complex ones
- **SOLID Principles**: Write maintainable, extensible code
- **YAGNI (You Aren't Gonna Need It)**: Implement only what's currently required

**Quality Standards:**
- **SEO Optimization**: Maintain comprehensive meta tags, structured data, and semantic HTML
- **WCAG AA Compliance**: Ensure accessibility with proper ARIA labels, color contrast, and keyboard navigation
- **Performance**: Optimize images, minimize bundle size, use efficient loading strategies
- **Code Quality**: Use TypeScript strict mode, consistent formatting with Prettier

**Implementation Standards:**
- Reuse existing components and follow established patterns
- Update centralized constants rather than hardcoding values
- Maintain semantic HTML structure for accessibility
- Test responsive design across device sizes
- Validate markup and structured data

## Design Guidelines

The site follows luxury modern wedding planner aesthetics:
- Elegant typography hierarchy with Playfair Display and Montserrat
- Neutral color palette emphasizing sophistication
- Clean layouts with strategic use of negative space
- Focus on high-quality imagery and minimal, refined interactions

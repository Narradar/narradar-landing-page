# Narradar Landing Page

A modern Next.js 15 marketing website for Narradar's Agent Perception Optimization (APO) platform.

## Features

- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS** with custom design tokens
- **Agent Perception Optimization** focused content structure
- **SEO optimized** with structured data and sitemaps
- **Responsive design** with mobile-first approach
- **Performance optimized** for Core Web Vitals
- **Accessibility compliant** (WCAG 2.2 AA)

## Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── page.tsx           # Homepage
│   ├── apo/               # APO content pages
│   │   ├── page.tsx
│   │   ├── what-is-apo/
│   │   ├── how-apo-works/
│   │   ├── apo-vs-seo-vs-geo/
│   │   └── how-to-measure-drift/
│   ├── how-it-works/      # Platform overview
│   ├── blog/              # Blog with sample posts
│   ├── about/             # Company information
│   ├── legal/             # Privacy & Terms pages
│   └── api/               # API routes
│       ├── summaries/     # JSON endpoints for AI crawlers
│       └── lead-capture/  # HubSpot integration
├── components/            # Reusable components
│   ├── ui/               # Basic UI components
│   ├── layout/           # Header, Footer
│   ├── forms/            # Form components
│   └── sections/         # Page sections
└── lib/                  # Utilities and helpers
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your HubSpot and analytics keys.

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Environment Variables

```env
# HubSpot Configuration (required for lead capture)
HUBSPOT_PORTAL_ID=your_portal_id_here
HUBSPOT_FORM_ID=your_form_id_here
HUBSPOT_API_KEY=your_api_key_here

# Analytics
NEXT_PUBLIC_ANALYTICS_KEY=your_analytics_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://www.narradar.com
```

## Key Pages

- **Homepage** (`/`) - Hero, features, demo, CTA
- **APO Hub** (`/apo`) - Agent Perception Optimization overview
- **Q-Target Pages** - SEO-optimized question-answering pages:
  - `/apo/what-is-apo`
  - `/apo/how-apo-works`
  - `/apo/apo-vs-seo-vs-geo`
  - `/apo/how-to-measure-drift`
- **How It Works** (`/how-it-works`) - Platform process and FAQ
- **Blog** (`/blog`) - Insights and case studies
- **About** (`/about`) - Company mission and team

## API Endpoints

- **Lead Capture** (`/api/lead-capture`) - HubSpot integration with spam protection
- **Content Summaries** (`/api/summaries/[slug]`) - JSON endpoints for AI crawlers

## SEO & AI Optimization

- **Structured Data** - JSON-LD for Organization, WebSite, Articles, FAQs
- **AI-Friendly** - Optimized robots.txt for GPTBot, Claude, Perplexity
- **Answer Boxes** - Prominent answer sections for AI extraction
- **Consistent Messaging** - Beacon-aligned content across all pages

## Performance

- **Static Generation** - All pages pre-rendered for fast loading
- **Image Optimization** - Next.js Image component with modern formats
- **Core Web Vitals** - Optimized for LCP < 2s, CLS < 0.1
- **Lighthouse Score** - Target 95+ on mobile

## Deployment

Deploy to Vercel:

```bash
vercel --prod
```

The site is optimized for Vercel's Edge Network with:
- Automatic HTTPS
- Global CDN
- Edge Functions for API routes
- Analytics integration

## Design Tokens

Tailwind CSS configuration includes:
- **Brand Colors** - Primary blues, accent purples
- **Typography Scale** - Inter font with semantic sizes
- **Component Classes** - Buttons, cards, forms
- **Utilities** - Containers, gradients, animations

## Contributing

1. Follow the existing code style and component patterns
2. Ensure all pages maintain APO messaging consistency
3. Test across multiple devices and browsers
4. Verify accessibility with screen readers
5. Check performance with Lighthouse

## License

Proprietary - Narradar Inc.
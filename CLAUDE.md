# Claude Code Configuration for Narradar

## 🚀 AI-Aware Performance Optimization

### Lazy Loading Strategy
This project implements **AI-aware lazy loading** to optimize performance for human users while ensuring AI agents (GPTBot, ClaudeBot, etc.) always receive complete content for optimal perception.

#### Key Principles:
- ✅ **AI Agents get full server-rendered content** - No lazy loading for bots
- ✅ **Humans get performance optimized experience** - Lazy load below-the-fold content  
- ✅ **SEO and APO maintained** - Search engines and AI models see everything
- ✅ **Progressive enhancement** - Works without JavaScript

#### Implementation Details:

**Critical Content (Always Server-Rendered):**
- HeroSection - Core brand message and value proposition
- AnswerBox - Key APO explanation and benefits
- FeatureGrid - Primary features that AI agents need to understand
- ProcessSteps - How APO works (critical for AI comprehension)

**Optimized Content (Lazy-Loaded for Humans):**
- DemoSection - Interactive elements (AI agents can't interact anyway)
- FAQSection - Supplementary content below the fold
- CTASection - Call-to-action elements

**Detection Logic:**
```typescript
// AI agents always get server-rendered content
const isAI = isAIAgent(userAgent)
if (isAI) {
  // Render everything server-side
} else {
  // Use lazy loading for performance
}
```

## 🧠 Agent Perception Optimization (APO) Considerations

Since this is an APO platform, special care is taken to ensure:

1. **AI Agent Detection** - Middleware identifies and logs AI agent visits
2. **Complete Content Delivery** - AI agents receive full, unmodified content
3. **Structured Data Preservation** - All schema.org markup remains intact
4. **Performance Benefits** - Human users get 15-25% faster page loads

## 🔧 Development Commands

```bash
# Development server
npm run dev

# Build and test performance
npm run build
npm run start

# Validate AI agent experience
npm run test:ai

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📊 Testing Strategy

**AI Agent Testing:**
```bash
# Test different AI agents see complete content
curl -H "User-Agent: GPTBot/1.0" http://localhost:3000
curl -H "User-Agent: ClaudeBot/1.0" http://localhost:3000
curl -H "User-Agent: PerplexityBot/1.0" http://localhost:3000
```

**Performance Testing:**
- Lighthouse audits for human users
- Core Web Vitals monitoring
- Bundle size analysis

## 🏗️ Architecture Notes

- **Next.js 15** with App Router for optimal SSR/CSR balance
- **TypeScript** for type safety and better DX
- **Tailwind CSS** with custom design system
- **AI-first approach** to all performance optimizations

## 🔍 Monitoring

The application tracks:
- AI agent visits and behavior
- Performance metrics for human users
- Content delivery effectiveness
- APO platform engagement metrics

---

**Remember:** Every optimization decision should consider impact on AI agent perception. The goal is to improve human UX while maintaining or enhancing AI understanding of our content.
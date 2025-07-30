
# Narradar Marketing Website PRD v0.6

## 1. Overview

**Vision**
A modern, clean site that borrows the clarity of Scrunch AI while making APO the centerpiece. It should feel senior, fast, and credible.

**Target audience**
CMOs and marketing leaders. Brand and communications teams. Companies worried about how AI rephrases their message.

**Primary goals**
Generate qualified beta leads. Teach APO in plain language. Establish thought leadership.

**Non goals**
No logged in features. No heavy app logic.

---

## 2. Design principles

**Visual**
Minimal layout. Ample white space. Clear type scale. Vector illustrations that explain concepts. Accessible color palette with one accent. Mobile first.

**Content**
Benefit first headlines. Short, scannable blocks. Simple diagrams that show drift and model variance. Consistent patterns that LLMs can lift cleanly.

---

## 3. Pages and content

### 3.1 Homepage

**Hero**
Headline: “Marketing to people is easy. Marketing to AI is where we come in.”
Subheadline: “See how your message shifts across models. Detect drift. Measure meaning loss. Stay in control.”
Primary CTA: **Run a Beacon Check**
Secondary CTA: Join Early Beta
Hero visual: a single message flowing through five model nodes with visible shifts.

**Answer box**
A 40 to 80 word plain language paragraph that explains Narradar near the top.

**What you get**

* Beacon alignment score
* Blip map by model and category
* Top risks and recommended fixes
* Option to enable ongoing **Beacon Monitor**

**Three value props**

1. AI model perception. See how GPT, Claude, and Gemini interpret your content.
2. Semantic drift detection. Track changes and distortions in real time.
3. Brand risk prevention. Catch narrative problems before they spread.

**How it works**
Four steps with icons. Submit content. Models interpret. Detect blips and score alignment. Report and recommend fixes.

**One message, five realities demo**
Lightweight table seeded with a real press release. Columns for Original, GPT, Claude, Gemini, Deltas. Toggle to highlight omissions, exaggerations, substitution, sentiment flip, attribution change, scope creep. Tooltips show severity, direction, and confidence per blip.

**Mini FAQ snippet**
Three common questions that link to full Q target pages.

**Social proof**
Logos when available. Two short testimonials or advisor quotes. Press mentions slot.

**Final CTA**
Copy: “Run a Beacon Check and get your Drift Report in minutes.”
Short form for email, company, role.

**Acceptance criteria**
Form submits without JavaScript. Demo loads under 1.5 seconds on 4G. Answer box is visible in the first viewport. Beacon Check is the visible CTA label.

---

### 3.2 APO page

**Purpose**
Explain APO and why it matters. Show before and after. Map to brand and comms workflows.

**Agent Perception: What It Is, and Why It Matters**
Agent Perception is how autonomous AI systems — from LLMs to action-taking agents — interpret, reframe, and act on your brand's message.

It's not just about showing up in AI answers (GEO).
It's about how you're understood, how you're presented, and eventually, how you're prioritized in decision loops.

Where traditional optimization focuses on visibility, Agent Perception focuses on fidelity:

Did the AI preserve your tone and intent?

Did it frame you correctly for different audiences?

Does it recommend, ignore, or misrepresent you?

Narradar's approach to Agent Perception Optimization (APO) measures these distortions, scoring how closely your message survives across:

Multiple models (GPT, Claude, Gemini, Grok)

Multiple prompts and use cases

Multiple personas (e.g. analyst, consumer, regulator)

In a system where AI agents make decisions before humans ever read the content, controlling perception becomes the new communications challenge.

**Glossary**

* Beacon: your truth
* Reading: what a model says
* Blip: a discrete variance against the Beacon at a point in time
* Drift: the pattern of blips over time
* Alignment score: 0 to 100, higher is better

**Sections**
What APO is. How it works. APO vs SEO vs GEO. How drift is measured. Beacon alignment diagram. Downloadable one pager lead magnet.

**Outputs**

* **Drift Report** for one time results
* **Beacon Monitor** for ongoing tracking

**Q target URLs**
`/apo/what-is-apo`
`/apo/how-apo-works`
`/apo/apo-vs-seo-vs-geo`
`/apo/how-to-measure-drift`

**Acceptance criteria**
Each section under 120 words with a diagram or callout. One deep link to a blog case study. JSON summary endpoint is available.

---

### 3.3 How it works page

**Pipeline**

1. Submit Beacon and source content
2. Collect model readings
3. Detect blips and score alignment
4. Aggregate drift over time
5. Report and recommend fixes
6. Optional Beacon Monitor for continuous tracking

**Key facts block**
Five numbered facts with concise sources.

**FAQ**
5 to 10 structured Q and A pairs.

**Acceptance criteria**
FAQ uses schema. Clear next step CTA.

---

### 3.4 Resources

**Blog**
MDX based. Statically generated. Categories for Insights, Case Studies, Research. Each post ends with a Summary, Key facts, and Sources block. Seed with two posts at launch:

* You are getting misquoted by GPT. What to do about it
* Everything Everywhere. Your press release in the AI multiverse

**About**
Mission. Short team note. Contact.

**Legal**
Privacy policy. Terms.

**Acceptance criteria**
Blog renders as full HTML for all user agents. Canonicals, sitemap, Open Graph, and Article schema are present.

---

## 4. GEO alignment requirements

**Content and UX**
Answer boxes at the top of pillar pages. Structured Q and A sections with 5 to 10 pairs per page. Consistent headings, bullets, end summaries, and key takeaways. Cite first party sources for claims. Evergreen summaries at the end of posts. Define Beacon and blip once near the top of relevant pages.

**Technical**
Serve full HTML to all user agents. No interstitials for bots. robots.txt and allowlists that explicitly permit major AI agents that respect robots. JSON LD everywhere. Stable Q target URLs. Helper JSON endpoints for assistants. Visible Updated stamps and lastmod in the sitemap.

**Helper JSON endpoint**
`/api/summaries/{slug}.json` returns:

* title
* summary80
* alignment\_score
* blips array with model, category, severity, direction, confidence
* facts array of short fact strings with source URLs
* updated ISO date

Example:

```json
{
  "title": "What is APO",
  "summary80": "APO measures how AI models reinterpret your core message and helps you reduce drift against your Beacon.",
  "alignment_score": 87,
  "blips": [
    {"model": "gpt", "category": "omission", "severity": "medium", "direction": "away", "confidence": 0.78}
  ],
  "facts": [
    {"text": "Beacon is the reference truth defined by the brand.", "source": "https://www.narradar.com/apo/what-is-apo"}
  ],
  "updated": "2025-08-04"
}
```

---

## 5. Technical requirements

**Framework and hosting**
Next.js 15 App Router on Vercel. TypeScript. SSG for all pages. SSR only if needed later. MDX for blog. Next image optimization.

**Styling**
Tailwind. Design tokens in a single file. Light theme first. Dark mode optional later.

**Directory layout**

```
src/
  app/
    page.tsx
    apo/page.tsx
    apo/what-is-apo/page.tsx
    apo/how-apo-works/page.tsx
    apo/apo-vs-seo-vs-geo/page.tsx
    apo/how-to-measure-drift/page.tsx
    how-it-works/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx
    about/page.tsx
    legal/privacy/page.tsx
    legal/terms/page.tsx
    api/summaries/[slug]/route.ts
  components/
    ui/
    layout/
    forms/
    sections/
  lib/
  content/   (MDX)
  public/
```

**Key components**
Header and footer with mobile nav. Buttons and cards. Forms with server and client validation. Sections for hero, feature grid, process steps, comparison table, blip map overlay, and CTA. AlignmentScoreBadge.

**Forms and lead capture**
HubSpot forms API. Server route accepts POST and forwards to HubSpot. Works without JavaScript. Honeypot and basic rate limit. When a user runs a Beacon Check, capture consent to email the Drift Report.

**Analytics and tracking**
Choose Plausible or PostHog. HubSpot tracking if needed. Event plan in section 7.

**Crawl and SEO**
Full HTML on first paint for all user agents. No UA sniffing for content. robots.txt and sitemap.xml. Schema for Organization, WebSite, Breadcrumb, Article, FAQPage or QAPage. Canonical tags on blog posts and Q targets.

**Accessibility**
WCAG 2.2 AA. Keyboard focus states. 3 to 1 contrast for UI and 4.5 to 1 for text. Skip link.

**Performance targets**
LCP under 2.0 seconds on mobile 4G. CLS under 0.1. Lighthouse 95 mobile or better.

**Environment**
Support `.env` and `~/.env.secrets`. Provide `.env.example` with `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_ID`, `NEXT_PUBLIC_ANALYTICS_KEY`.

---

## 6. Messaging and SEO

**Primary message**
Control your narrative in the AI multiverse.

**Tone and voice**
Expert and direct with a little wit. No buzzword soup.

**Keyword clusters**
Agent perception. Semantic drift. AI brand monitoring. AI model interpretation. AI misquote.

**On page rules**
Titles under 60 characters. Meta descriptions near 155. OG and Twitter tags. Internal links from homepage into APO and How it works. Cross links from blog back to those pages.

---

## 7. Metrics and events

**Primary metrics**
Beta signup rate per session. Qualified lead count with company domain. Contact submissions. Blog share rate.

**Technical metrics**
Lighthouse mobile score. Crawl success for AI user agents. Index coverage in Search Console. TTFB and LCP.

**Event plan**

* `cta_click` with label
* `lead_submit` with role, company, source
* `beacon_check_start`
* `beacon_check_submit`
* `drift_report_view`
* `beacon_monitor_toggle`
* `demo_toggle` with column focus
* `answer_box_visible` on first paint
* `faq_expand` with question id
* `blog_read` with depth and time bucket
* Weekly bot hit counts by user agent

---

## 8. QA and acceptance criteria

**User agents**
Curl checks for Googlebot, ChatGPT User, GPTBot, OAI SearchBot, and PerplexityBot return full HTML with the Answer box visible. Record 200 status and payload size.

**SEO checks**
All JSON LD validates. FAQ rich results pass. Sitemap lists Q target URLs with lastmod. Canonicals are unique.

**Performance and accessibility**
No layout shift on hero load. Full keyboard navigation. Images have alt text. LCP and CLS targets met on a throttled mobile profile.

**Reliability**
404 and 500 pages exist. Forms submit without JavaScript and return a clear success state.

---

## 9. Robots and schema quick starts

**robots.txt**
Allow Googlebot, Bingbot, GPTBot, OAI SearchBot, PerplexityBot, and other respectful agents. Disallow only admin and build artifacts. Keep CDN and WAF rules in sync so allowlisted agents are not blocked.

Example:

```
User-agent: *
Disallow: /api/
Disallow: /admin/
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /
```

**JSON LD**
Organization on the homepage. WebSite with SearchAction. Breadcrumb on inner pages. Article on blog posts. FAQPage or QAPage on Q target sections.

---

## 10. Implementation plan for Claude Code

Plan for a 1 to 2 day sprint. Give one task at a time. Keep each under 150 words.

**Day 0 prep. 30 to 60 minutes**
Create Vercel project and empty GitHub repo. Decide analytics. Gather logo, two brand colors, type pair, HubSpot form ID, and two MDX posts.

**Hour 0 to 2**
Scaffold Next 15 with TypeScript and Tailwind. Add design tokens and base layout. Header, footer, mobile nav. robots.txt and sitemap stubs. Deploy to a Vercel preview.

**Hour 2 to 4**
Homepage sections. Hero, Answer box, Feature grid, mini FAQ, CTA form. Server route to HubSpot with honeypot. Add analytics and track cta\_click and lead\_submit.

**Hour 4 to 6**
APO and How it works pages and all four Q target pages. Add JSON summary endpoint at `/api/summaries/[slug]`.

**Hour 6 to 8**
Blog pipeline with MDX. Two seeded posts with Summary and Key facts. JSON LD helpers for Organization, WebSite, Breadcrumb, Article, FAQPage. Canonicals and OG tags.

**Hour 8 to 10**
One message, five realities demo using a local JSON fixture. Add blip map overlay and filters. Performance pass for LCP under 2 seconds and CLS under 0.1.

**Hour 10 to 12**
GEO QA. Curl checks for all bot user agents show full HTML and an Answer box. Lighthouse mobile 95 or better. Accessibility pass.

**Acceptance script for the agent**

* Scaffold project and deploy. Output repo and preview URL.
* Home hero with Answer box and tests for presence in HTML.
* HubSpot server route with honeypot and `.env.example`.
* Four Q target routes and summaries API.
* Schema and SEO helpers.
* Demo component with local JSON.
* Perf and a11y checks.

---

## 11. Risks and mitigation

Overpromising on a live Beacon Check
Gate behind a form and deliver a sample Drift Report by email for v1.

AI crawler access blocked by CDN or WAF
Maintain allowlists in robots and infrastructure. Add a weekly bot access report.

Thin content at launch
Two blog posts and one case study stub on day one.

---

## 12. Starter backlog

* Design tokens and type scale
* Header and footer
* HeroSection with Answer box
* FeatureGrid
* ProcessSteps
* ComparisonTable with BlipMap overlay and filters
* AlignmentScoreBadge
* CTASection and form
* HubSpot POST route with honeypot and rate limit
* robots.txt and sitemap.xml
* Schema helpers for Article, FAQPage, Organization, WebSite
* Q target pages under `/apo/*`
* `/api/summaries/[slug]` endpoints
* MDX blog pipeline and two starter posts
* Performance and accessibility pass
* Crawl QA scripts for major AI user agents
* Vercel deploy with preview URLs

---


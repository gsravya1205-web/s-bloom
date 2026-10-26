# S-BLOOM — Official Brand & Design System Document

**Document Version:** 1.0  
**Project:** sBLOOM Digital Growth Partner  
**Target Industries:** Healthcare, Education, Consulting & Professional Services  
**Technology Stack:** React Router v7 · TypeScript · Vanilla CSS · Framer Motion · Vite 8  
**Classification:** Product Design, UX/UI Architecture & Brand Specification  

---

## Table of Contents
1. [Executive Summary & Strategic Positioning](#1-executive-summary--strategic-positioning)
2. [Target Audiences & User Personas](#2-target-audiences--user-personas)
3. [Dual-Journey Information Architecture](#3-dual-journey-information-architecture)
4. [Visual Design System & Design Tokens](#4-visual-design-system--design-tokens)
   - 4.1 [Color Palette & Semantic Tokens](#41-color-palette--semantic-tokens)
   - 4.2 [Typography Scale & Hierarchies](#42-typography-scale--hierarchies)
   - 4.3 [Surface Treatments, Elevation & Borders](#43-surface-treatments-elevation--borders)
   - 4.4 [Iconography & Organic Motifs](#44-iconography--organic-motifs)
5. [The Core 4-Stage Growth Framework (BUILD · CREATE · PROMOTE · GROW)](#5-the-core-4-stage-growth-framework)
6. [Homepage Blueprint & Component Breakdown](#6-homepage-blueprint--component-breakdown)
7. [Industry Verticals & Tailored Strategies](#7-industry-verticals--tailored-strategies)
8. [Creative Workspace (Partner Journey)](#8-creative-workspace-partner-journey)
9. [Service Pricing & Commercial Architecture](#9-service-pricing--commercial-architecture)
10. [Motion, Animation & Micro-Interactions](#10-motion-animation--micro-interactions)
11. [Responsive Layout & Grid System](#11-responsive-layout--grid-system)
12. [Accessibility, SEO & Performance Standards](#12-accessibility-seo--performance-standards)
13. [Engineering & Component Architecture](#13-engineering--component-architecture)
14. [Design Maintenance & Extensibility SOP](#14-design-maintenance--extensibility-sop)

---

## 1. Executive Summary & Strategic Positioning

### 1.1 Brand Vision
**sBLOOM** is an industry-focused marketing and digital growth partner for expertise-led businesses. It does not operate as a generic digital agency or an open freelancer directory; rather, it functions as an elite **growth gateway**. 

Traditional agencies sell disjointed deliverables (e.g., "10 social posts/month" or "basic website development") without understanding the specialized compliance, trust barriers, and high-ticket sales cycles of professional sectors. S-Bloom bridges this gap by unifying authority building, high-touch content production, and patient/student/client acquisition into an integrated digital growth engine.

### 1.2 Core Value Proposition
> *"We turn what you do well into something people can see, understand and act on."*

* **Brand Motto:** *"We will help you bloom socially."*
* **Core Differentiator:** Specialized industry depth (Healthcare, Education, Consulting) + AI-accelerated high-speed execution + In-house creative craftsmanship.

---

## 2. Target Audiences & User Personas

S-Bloom serves two distinct primary stakeholders:

### 2.1 Persona Group A: Expertise-Led Clients

| Segment | Typical Profile | Primary Frustrations | S-Bloom Solution |
| :--- | :--- | :--- | :--- |
| **Healthcare Specialists & Clinics** | Senior Doctors, Surgeons, Multi-Specialty Clinics, Diagnostic Labs | Zero time for marketing, strict ethical/medical guidelines, poor patient inquiry quality | High-authority medical SEO, verified Google Business Profile, ethical patient education video reels |
| **Educators & Academies** | School Directors, EdTech Founders, Test-Prep Mentors, Coaching Institutes | Low admission conversion, reliance on expensive aggregators, seasonal slump | Admission funnels, high-trust student/parent testimonials, institutional brand presence |
| **Consultants & Advisory Firms** | Management Consultants, Legal Advisors, Chartered Accountants, Executive Coaches | High client acquisition cost, difficulty explaining abstract complex value, commoditization | Authority-driven case studies, LinkedIn thought-leadership pipelines, conversion-optimized web presence |

### 2.2 Persona Group B: Creative & Technical Partners

* **Profiles:** High-caliber video editors, motion graphic artists, creative copywriters, brand designers, and camera operators.
* **Primary Need:** Stable, recurring client engagements without the administrative friction of bidding, invoicing, client negotiation, and scope creep.
* **S-Bloom Solution:** The **Creative Workspace** (`/creative-workspace`), where S-Bloom handles client acquisition, project scoping, and client relationship management while partners focus exclusively on creative execution.

---

## 3. Dual-Journey Information Architecture

The website routes every visitor through one of two clear operational funnels directly from the initial viewport:

```
                               ┌─────────────────────────────────┐
                               │        S-BLOOM HOMEPAGE         │
                               │        (/ - Master Gateway)     │
                               └────────────────┬────────────────┘
                                                │
                 ┌──────────────────────────────┴──────────────────────────────┐
                 ▼                                                             ▼
     ┌────────────────────────┐                                   ┌────────────────────────┐
     │   JOURNEY A: CLIENT    │                                   │   JOURNEY B: PARTNER   │
     │   (Growth & Marketing) │                                   │  (Creative Workspace)  │
     └───────────┬────────────┘                                   └───────────┬────────────┘
                 │                                                             │
       ┌─────────┴─────────┐                                                   │
       ▼                   ▼                                                   ▼
 ┌───────────┐       ┌─────────────┐                             ┌────────────────────────┐
 │ Individual│       │ Institution │                             │   Creative Workspace   │
 │  Experts  │       │ /Academy    │                             │  (/creative-workspace) │
 └─────┬─────┘       └─────┬───────┘                             └────────────┬───────────┘
       │                   │                                                  │
       └─────────┬─────────┘                                                  ▼
                 ▼                                               ┌────────────────────────┐
     ┌───────────────────────┐                                   │   Partner Application  │
     │   Tailored Strategy   │                                   │ (/creative-workspace/  │
     │   Industry Solutions  │                                   │         apply)         │
     │ (Healthcare/Edu/Prof) │                                   └────────────────────────┘
     └───────────┬────────────┘
                 │
                 ▼
     ┌───────────────────────┐
     │  Consultation Booking │
     │       (/contact)      │
     └───────────────────────┘
```

### 3.1 Sitemap & Route Matrix
* **`/` (Homepage):** The master gateway featuring the core 4-stage system, dual paths, capability matrix, transparent pricing, and interactive project pipeline.
* **`/industries/healthcare`:** Specialized patient acquisition and doctor authority positioning.
* **`/industries/education`:** Student enrollment funnels and institutional reputation architecture.
* **`/industries/professional-services`:** B2B advisory client acquisition and partner authority building.
* **`/solutions`:** High-level solutions overview.
* **`/solutions/build`:** Authority infrastructure (Web architecture, Local SEO, GBP verification).
* **`/solutions/create`:** Media & narrative engine (Scripting, cinematic video, ad creative).
* **`/solutions/promote`:** Paid acquisition (Meta ads, Google Search, retargeting).
* **`/how-it-works`:** Sprint-based operational methodology.
* **`/proof-of-work`:** Real client metrics, before/after rankings, verified outcomes.
* **`/about`:** Mission, leadership, and operational culture.
* **`/creative-workspace`:** The freelance partner ecosystem.
* **`/apply`:** Partner intake and portfolio submission.
* **`/contact`:** Strategic consultation scheduling and direct messaging.

---

## 4. Visual Design System & Design Tokens

### 4.1 Color Palette & Semantic Tokens

S-Bloom’s color philosophy replaces cold tech monochromes with warm, organic, editorial luxury tones:

```
[ Ivory Canvas #FBF8F2 ]   [ Champagne Gold #C9952E ]   [ Espresso Brown #35251F ]
Warm, anti-glare base       Prestigious accent           Authoritative typography
```

| Token Name | Hex / CSS Value | Semantic Role |
| :--- | :--- | :--- |
| `--bg-primary` | `#FBF8F2` (Warm Ivory) | Base background for pages and main canvas |
| `--bg-secondary` | `#FAF6EE` / `#FFF7E8` | Tonal gradient shift, card backgrounds |
| `--bg-surface` | `#FFFCF7` (Warm White) | Icon circle fill, pill button background, input fills |
| `--text-primary` | `#35251F` (Espresso Brown) | Primary headlines, bold titles, dark buttons |
| `--text-body` | `#24212A` (Deep Ink) | Body paragraphs, long-form content |
| `--text-muted` | `#6C6470` (Muted Slate) | Stage descriptions, metadata, subtitles |
| `--gold-primary` | `#C9952E` / `#D9A52E` | Key badges, stage numbers, arrow accents, active borders |
| `--border-subtle` | `#E5D6C2` (Soft Sand) | Fine dividers, icon circle borders, base connectors |
| `--navbar-bg` | `rgba(20, 13, 9, 0.95)` | Sticky navigation frosted mocha bar |

---

### 4.2 Typography Scale & Hierarchies

* **Heading Font:** `Outfit`, sans-serif (Geometric, modern, elegant, with distinct weights: 600, 700, 750, 800).
* **Body Font:** `Inter`, sans-serif (Neutral, exceptionally legible, weights: 400, 500, 600).
* **Accent Editorial:** `Playfair Display`, serif (Used for editorial contrast in specific section accents).

| Level | Size (Desktop) | Size (Mobile) | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display H1** | `3.75rem` (60px) | `2.25rem` (36px) | 800 | 1.12 | `-0.02em` |
| **Section Title H2** | `2.15rem` (34px) | `1.55rem` (25px) | 750 | 1.25 | `-0.015em` |
| **Card / Subsection H3** | `1.35rem` (22px) | `1.15rem` (18px) | 700 | 1.30 | `0` |
| **Stage Number (01–04)**| `1.85rem` (30px) | `1.45rem` (23px) | 750 | 1.00 | `-0.01em` |
| **Category Eyebrow** | `0.78rem` (12.5px)| `0.72rem` (11.5px)| 700 | 1.00 | `+2.5px` (All Caps)|
| **Body Paragraph** | `1.05rem` (17px) | `0.95rem` (15px) | 400 / 500 | 1.60 | `0` |
| **Stage Description** | `0.92rem` (14.7px)| `0.88rem` (14px) | 500 | 1.40 | `0` |
| **Pill Button Label** | `0.82rem` (13px) | `0.80rem` (12.8px)| 650 | 1.00 | `+0.15px` |

---

### 4.3 Surface Treatments, Elevation & Borders

1. **Pill Buttons (`.dgs-explore-btn`):**
   * Shape: Full pill (`border-radius: 9999px`)
   * Normal State: Background `#FFFCF7`, Border `1.5px solid #C9952E`, Text `#35251F`, Shadow `0 2px 6px rgba(201, 149, 46, 0.08)`
   * Hover State: Background `#35251F`, Border `#35251F`, Text `#FFFCF7`, Arrow `translateX(3px)`, Shadow `0 4px 12px rgba(53, 37, 31, 0.16)`
2. **Icon Pearl Circles (`.dgs-marker-circle`):**
   * Dimensions: `60px × 60px`
   * Shape: 50% circular
   * Fill: `#FFFCF7` (completely opaque to mask background connector lines)
   * Border: `1.5px solid #E5D6C2`
   * Shadow: `0 2px 8px rgba(53, 37, 31, 0.05)`
3. **Connecting Horizontal Line (`.dgs-connector`):**
   * Height: `1.5px`
   * Base Track: `#E5D6C2`
   * Animated Fill: `#C9952E`
   * Central Nodes: `8px × 8px` circle, `#FFFCF7` fill, `1.5px solid #C9952E` border with subtle gold glow.
4. **Vector Silk Waves (`hero-bottom-silk-wrapper`):**
   * Multi-layered SVG curves with subtle multi-stop linear gradients mimicking the organic sheen of luxury silk.

---

## 5. The Core 4-Stage Growth Framework

Located prominently in the **“What S-Bloom Changes”** section, this horizontal pipeline visually encapsulates the full spectrum of S-Bloom’s capabilities:

```
    01                      02                      03                      04
  BUILD                   CREATE                  PROMOTE                 GROW
  ──────                  ──────                  ───────                 ────
Be easier               Be easier               Be easier to            Be easier to
 to find.             to understand.          reach the people           drive sustained
                                                who matter.                 growth.
    │                       │                       │                       │
[Explore Build →]      [Explore Create →]      [Explore Promote →]     [Explore Grow →]
```

### 5.1 Stage Definitions & Deliverables

#### Stage 01: BUILD — *"Be easier to find."*
* **Core Goal:** Build the digital foundation so prospects discover the business immediately upon search.
* **Key Deliverables:**
  * High-speed, mobile-first responsive web architecture
  * Complete Google Business Profile (GBP) verification & local map pack ranking
  * Technical and semantic local SEO
  * Social handle standardization & authority verification
* **Route:** `/solutions#build`

#### Stage 02: CREATE — *"Be easier to understand."*
* **Core Goal:** Transform complex clinical, educational, or consulting expertise into engaging, easily understood digital content.
* **Key Deliverables:**
  * High-definition short-form video production (Reels, Shorts, LinkedIn video)
  * Patient/student journey storytelling & case documentation
  * Brand narrative, visual assets, and high-converting copy
* **Route:** `/solutions#create`

#### Stage 03: PROMOTE — *"Be easier to reach the people who matter."*
* **Core Goal:** Amplify authority with targeted paid campaigns to drive high-intent inquiries.
* **Key Deliverables:**
  * Hyper-local Meta (Instagram/Facebook) precision targeting
  * High-intent Google Search intent capture
  * Retargeting funnels to convert undecided prospects
  * Influencer & creator collaborations in specialized sectors
* **Route:** `/solutions#promote`

#### Stage 04: GROW — *"Be easier to drive sustainable growth."*
* **Core Goal:** Maintain consistent patient, student, and client acquisition without seasonal drop-offs.
* **Key Deliverables:**
  * End-to-end multi-channel growth partner model
  * Review automation and reputation management
  * Conversion rate optimization (CRO) & monthly performance analytics
* **Route:** `/solutions#grow`

---

## 6. Homepage Blueprint & Component Breakdown

```
┌────────────────────────────────────────────────────────────────────────┐
│ [1] NAVBAR: Sticky dark-frosted header, gold logo, dropdown, CTA      │
├────────────────────────────────────────────────────────────────────────┤
│ [2] HERO SECTION:                                                      │
│     - Left: Eyebrow badge, H1 "We will help you bloom socially"        │
│     - Right: Floating orbital constellation & 3D symbols               │
│     - Bottom: Vector silk fold layer with sheen highlight fold         │
├────────────────────────────────────────────────────────────────────────┤
│ [3] WHAT S-BLOOM CHANGES (Digital Growth System):                      │
│     - Centered intro: "We turn what you do well into something..."     │
│     - 4 Horizontal connected columns:                                  │
│       [01 BUILD] ──●── [02 CREATE] ──●── [03 PROMOTE] ──●── [04 GROW]  │
│     - Champagne-gold connector line behind warm-white pearls           │
│     - Outlined gold pill buttons for each stage                        │
├────────────────────────────────────────────────────────────────────────┤
│ [4] DUAL PATHWAYS (How S-Bloom Helps You Grow):                        │
│     - Column A: For Independent Experts & Practitioners                │
│     - Column B: For Institutions, Academies, & Established Firms       │
├────────────────────────────────────────────────────────────────────────┤
│ [5] WHY S-BLOOM IS BEST (Capability Matrix):                           │
│     - Direct comparative breakdown vs. traditional marketing agencies  │
│     - AI speed, industry-specialized workflows, creative rigor         │
├────────────────────────────────────────────────────────────────────────┤
│ [6] TRANSPARENT VALUE PLANS (Pricing):                                 │
│     - Google Business Profile (GBP) + Automation                       │
│     - Website + AI-Powered SEO                                         │
│     - Social Media Authority Engine                                    │
│     - Full Digital Growth Partner (End-to-End)                         │
├────────────────────────────────────────────────────────────────────────┤
│ [7] TRUSTED CLIENT LOGO CLOUD:                                         │
│     - 3-tier marquee ribbon moving in alternating infinite scroll      │
├────────────────────────────────────────────────────────────────────────┤
│ [8] FINAL CTA:                                                         │
│     - "Your business has potential. Let’s help the right people see it"│
│     - Prominent "Talk to sBLOOM →" button                              │
├────────────────────────────────────────────────────────────────────────┤
│ [9] INTERACTIVE CORNER PIPELINE:                                       │
│     - Fixed corner showcase (Camera ➔ Reel ➔ Post ➔ Ad ➔ Web ➔ Video) │
├────────────────────────────────────────────────────────────────────────┤
│ [10] FOOTER:                                                           │
│      - Editorial 3-column navigation, interactive C-O-N-T-A-C-T tiles  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Industry Verticals & Tailored Strategies

S-Bloom customizes its deployment across three distinct high-value verticals:

### 7.1 Healthcare (`/industries/healthcare`)
* **Focus:** Patient acquisition, doctor personal branding, clinic reputation.
* **Compliance & Tone:** Empathetic, scientifically accurate, clinically verified, strictly adhering to medical ethics.
* **Core Assets:** Procedure explainer reels, patient FAQ videos, local Google Maps ranking for high-intent search queries (e.g., *"Best Orthopedic Surgeon near me"*).

### 7.2 Education (`/industries/education`)
* **Focus:** Student admissions, parent trust, institutional credibility.
* **Compliance & Tone:** Inspiring, ambitious, outcome-driven, academic.
* **Core Assets:** Campus walk-throughs, student success stories, faculty spotlight reels, high-converting admission landing pages.

### 7.3 Consulting & Professional Services (`/industries/professional-services`)
* **Focus:** High-ticket retainer acquisition, B2B thought leadership.
* **Compliance & Tone:** Analytical, prestigious, intellectually rigorous.
* **Core Assets:** Case study breakdowns, LinkedIn video essays, executive briefs, partner spotlight pieces.

---

## 8. Creative Workspace (Partner Journey)

Located at `/creative-workspace`, this area acts as the hub for creative freelancers:

* **The S-Bloom Workflow:**
  1. *S-Bloom Secures the Client:* Pre-qualified, high-budget briefs with clear scopes.
  2. *Partner Executes:* Editors, designers, and videographers create high-caliber deliverables without handling client billing or scope negotiations.
  3. *S-Bloom Deploys & Optimizes:* S-Bloom’s internal marketing team manages ad accounts, SEO indexing, and distribution.
* **Application Pathway:** Direct intake form at `/apply` requesting portfolio links, software proficiencies, and turnaround capacity.

---

## 9. Service Pricing & Commercial Architecture

S-Bloom utilizes a transparent, modular pricing model:

| Package | Positioning | Pricing Model | Core Inclusions |
| :--- | :--- | :--- | :--- |
| **Google Business Profile (GBP)** | Local Search Dominance | Starts at ₹2,000 / month | Full profile optimization, review automation, local 3-pack rank tracking |
| **Website + SEO** | Digital Authority Hub | Starts at ₹5,000 / month | AI-enabled high-speed architecture, conversion-focused design, technical SEO |
| **Social Media Growth Engine** | Visual & Video Authority | Custom / Sprint | Scriptwriting, high-definition short-form editing, multi-channel distribution |
| **Full Digital Growth Partner** | Complete Marketing Team | Retainer / Tiered | Integrated Build + Create + Promote + Grow system with dedicated manager |

---

## 10. Motion, Animation & Micro-Interactions

### 10.1 Guiding Principles
* **Elegance Over Exaggeration:** No bouncy cartoon physics or intrusive pop-ups.
* **Purpose-Driven Feedback:** Animations provide visual confirmation of user intent.
* **Zero Layout Shift:** Elements reveal strictly in place without displacing surrounding DOM nodes.

### 10.2 Choreography Standards
* **Scroll Reveals:** Staggered upward translation of `12px – 20px` with an opacity fade over `0.45s – 0.6s` using cubic-bezier easing `(0.16, 1, 0.3, 1)`.
* **Connecting Line Reveal:** Progressively expands horizontally from left to right (`transform: scaleX(0)` to `scaleX(1)`) as the section enters the viewport.
* **Button Micro-Interactions:** 
  * Subtle hover lift: `transform: translateY(-1px)`
  * Arrow displacement: `transform: translateX(3px)`
  * Transition duration: `0.22s ease`
* **Accessibility Override:**
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```

---

## 11. Responsive Layout & Grid System

S-Bloom adapts dynamically across standard screen resolutions:

```
Desktop (≥ 1024px)     Tablet (860px – 1023px)      Mobile (≤ 560px)
┌───┬───┬───┬───┐       ┌───────┬───────┐            ┌───────────────┐
│01 │02 │03 │04 │       │  01   │  02   │            │      01       │
└───┴───┴───┴───┘       ├───────┼───────┤            ├───────────────┤
4-Column Horizontal     │  03   │  04   │            │      02       │
Connected Pipeline      └───────┴───────┘            ├───────────────┤
                        2x2 Grid (Connectors         │      03       │
                        Hidden)                      ├───────────────┤
                                                     │      04       │
                                                     └───────────────┘
                                                     Single Column
```

* **Desktop (1200px container max):** 4 equal columns (`repeat(4, 1fr)`), `28px` gap, continuous horizontal connecting line.
* **Tablet (860px):** 2 equal columns (`repeat(2, 1fr)`), `32px` row gap, horizontal connector hidden to prevent odd wrap lines.
* **Mobile (≤ 560px):** Single vertical column (`1fr`), `28px` gap, touch-friendly button targets (minimum `44px` touch height).

---

## 12. Accessibility, SEO & Performance Standards

1. **Semantic HTML5:** Strict hierarchy with a single `<h1>` per page, logical `<section>` landmarks, and semantic `<nav>`, `<header>`, and `<footer>` tags.
2. **Keyboard Navigability & ARIA:** All interactive pill buttons and links provide explicit focus rings and distinct `aria-label` tags.
3. **Contrast Ratio Compliance:** All text tokens (Espresso `#35251F` on Ivory `#FBF8F2`) exceed WCAG AAA requirements with contrast ratios > 7:1.
4. **Fast Page Loads:** Asset optimization, modern font preloading (`Inter` and `Outfit`), and zero reliance on heavy render-blocking libraries.

---

## 13. Engineering & Component Architecture

### 13.1 Directory Layout
```
src/
├── components/
│   ├── common/              # Global buttons, modals, input elements
│   ├── home/                # Homepage sections
│   │   ├── DigitalGrowthSystem.tsx  # What S-Bloom Changes (4 stages)
│   │   ├── DualPathCards.tsx        # Expert vs. Institution pathways
│   │   ├── WhyBetter.tsx            # Agency comparison matrix
│   │   ├── HomePricingSection.tsx   # Value pricing plans
│   │   ├── ClientLogoMarquee.tsx    # 3-tier scrolling logo cloud
│   │   ├── HeroFloatingIcons.tsx    # 3D floating hero symbols
│   │   └── BottomCornerScrollShowcase.tsx # Pipeline preview
│   └── layout/
│       ├── Navbar.tsx       # Frosted dark header with dropdowns
│       └── Footer.tsx       # Editorial footer with C-O-N-T-A-C-T tiles
├── pages/
│   ├── HomePage.tsx         # Gateway page
│   ├── AboutPage.tsx        # Company vision & leadership
│   ├── ContactPage.tsx      # Strategic consultation form
│   ├── SolutionsPage.tsx    # Detailed service breakdown
│   ├── IndustryPages.tsx    # Vertical-specific templates
│   └── CreativeWorkspacePage.tsx # Freelance partner portal
├── routes.ts                # React Router v7 route definitions
└── index.css                # Global design system & theme tokens
```

---

## 14. Design Maintenance & Extensibility SOP

To preserve design integrity during ongoing feature additions:

1. **Adding an Industry:** Add the new sector key to `src/data/industries.ts`. Do not duplicate page components; the dynamic routing template handles rendering automatically.
2. **Adding a Solution Feature:** Preserve the four-stage framework (`BUILD · CREATE · PROMOTE · GROW`). Do not invent new stages outside this vocabulary.
3. **Adding Buttons or Badges:** Reuse `.dgs-explore-btn` or the global `.btn` classes from `src/index.css`. Never introduce arbitrary hex colors outside the approved palette.
4. **Preserving Vertical Proportions:** Keep section vertical padding between `48px` and `56px`. Avoid hardcoded `min-height: 100vh` on interior components to prevent vertical clipping on standard laptop displays.

---

*End of Document. Maintained by the S-Bloom Product & Design Team.*

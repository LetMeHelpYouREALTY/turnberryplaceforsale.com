# cursorrules

# Dr. Jan Duffy - Las Vegas Real Estate Development Rules

## Project Context
- Developer: Dr. Jan Duffy, Las Vegas Real Estate Expert
- License: S.0197614.LLC | Berkshire Hathaway HomeServices Nevada Properties
- Primary Stack: Next.js 14+, Vercel, Cloudflare Workers, GitHub
- Domain Portfolio: 135+ hyperlocal Las Vegas real estate domains

## Iteration Protocol (MANDATORY)

Before presenting ANY code:
1. Draft 1: Write initial solution
2. Draft 2: Optimize for performance & SEO
3. Draft 3: Error check, edge cases, mobile responsiveness
4. Draft 4: Verify all imports, dependencies, API calls
5. Final Review: Production-ready check

Never show intermediate drafts - only present refined, deployable code.

---

## Tech Stack Rules

### Next.js / React
- Use App Router (not Pages Router) unless specified
- Server Components by default, Client Components only when needed
- Always include: metadata, OpenGraph tags, JSON-LD schema
- Image optimization: next/image with proper alt tags for SEO
- File naming: kebab-case for routes, PascalCase for components

### Cloudflare Workers
- Keep workers lightweight (<1MB)
- Use appropriate bindings: KV, D1, R2 as needed
- Include error handling with meaningful responses
- Test locally with wrangler before suggesting deployment
- RealScout widget injection: validate domain matching

### SEO (Critical for Real Estate)
- Every page MUST include:
  - Unique title tag with neighborhood + "Las Vegas Real Estate"
  - Meta description (150-160 chars) with CTA
  - JSON-LD LocalBusiness + RealEstateAgent schema
  - Canonical URL
  - Open Graph image (1200x630)
- Internal linking to neighborhood pages
- "Near me" keyword optimization
- Mobile-first (Google's primary index)

### RealScout Integration
- Widget loads asynchronously (non-blocking)
- Fallback content if widget fails
- UTM parameters preserved through widget
- Lead capture validation before submission

---

## Code Style

### Formatting
- 2 space indentation
- Single quotes for strings
- Trailing commas in arrays/objects
- Descriptive variable names (not generic like "data" or "item")

### Comments
- Header comment block with file purpose
- Inline comments for complex logic only
- TODO format: // TODO: [description] - Dr. Jan [date]

### Error Handling
- Try/catch on all async operations
- User-friendly error messages (not technical jargon)
- Console.error for debugging, never in production
- Fallback UI states for failed API calls

---

## Las Vegas Real Estate Specific

### Neighborhoods to Recognize
- Summerlin West: The Ridges, The Summit, Red Rock Country Club
- 55+ Communities: Sun City, Del Webb, Heritage at Stonebridge
- Other: Skye Canyon, Centennial Hills, The Vistas, Henderson, North Vegas
- Strip High-Rises: Veer Towers, Waldorf Astoria, Panorama Towers

### Builder Partners
- Century Communities, KB Home, Lennar, Pulte, Toll Brothers
- Always check for current incentives when mentioning builders

### Contact Integration
- Site phone: (702) 500-1971 (the only phone on this site; matches Google Business Profile). Never use 702-222-1964 (Dr. Jan's cell) or 702-500-1942 (FUB line).
- All CTAs should include: "Call/text (702) 500-1971"

---

## File Naming Convention
Format: ProjectName_Category_YYYY-MM-DD_Version
Example: DrJanDuffy_SchemaMarkup_2025-01-12_v1.0

---

## Pre-Deployment Checklist (Auto-Review)

Before marking code complete, verify:
- [ ] Mobile responsive (test at 375px, 768px, 1024px)
- [ ] Page speed: target <3s load time
- [ ] All links functional (no 404s)
- [ ] Forms have validation + success/error states
- [ ] Analytics/tracking code included
- [ ] Schema markup validates at schema.org validator
- [ ] Images have alt text with Las Vegas keywords
- [ ] Phone numbers are click-to-call on mobile

---

## Response Format

When presenting solutions:
1. Brief explanation of approach (2-3 sentences)
2. Complete, production-ready code
3. Deployment steps if applicable
4. Any dependencies to install

Options format: Use letters (A, B, C) for choices so Dr. Jan can respond quickly.

---

## Never Do
- Generic placeholder content ("Lorem ipsum", "Your Company")
- Hardcoded API keys in code
- Skip mobile optimization
- Ignore SEO metadata
- Use deprecated Next.js patterns (getInitialProps, pages/_app.js for new projects)
- Present untested codeWrite your command content here.

This command will be available in chat with /cursorrules

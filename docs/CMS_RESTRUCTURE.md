# ICAP Website CMS Restructuring

## Overview
This document outlines the plan to restructure our Hygraph CMS integration to be more maintainable, scalable, and easier to manage. The goal is to implement a modular approach where pages are built from reusable sections, while keeping the implementation practical and not over-engineered.

## Current Challenges
- Direct component-to-CMS coupling
- No standardized page structure
- Difficult to reuse sections across pages
- Manual content management for each page
- No consistent pattern for component props

## Target Architecture

### 1. Content Structure
```
Page
├── slug (unique identifier)
├── metadata (SEO, etc.)
└── sections (modular components)
    ├── HeroSection
    ├── FundSliderSection
    ├── MarketDataSection
    └── etc.

Content Models (Referenced by sections)
├── MutualFund
├── MarketData
└── etc.
```

### 2. Component Structure
```
components/
├── sections/         # CMS-driven sections
│   ├── hero/
│   ├── fund-slider/
│   └── market-data/
├── shared/          # Reusable components
└── ui/             # Basic UI components
```

## Implementation Phases

### Phase 1: Foundation Setup
- [x] Current implementation working
- [ ] Define base Page model in Hygraph
- [ ] Create section interface
- [ ] Setup TypeScript types for CMS data
- [ ] Implement basic page fetching

### Phase 2: Section Components
- [ ] Move existing components to new structure
- [ ] Create section wrapper component
- [ ] Implement dynamic section renderer
- [ ] Add error boundaries
- [ ] Add loading states

### Phase 3: Content Migration
- [ ] Create new page entries in Hygraph
- [ ] Migrate existing content
- [ ] Test all sections
- [ ] QA responsive behavior

### Phase 4: Optimization
- [ ] Implement proper caching
- [ ] Add preview mode
- [ ] Performance optimization
- [ ] Analytics integration

## Best Practices & Standards

### 1. Naming Conventions
- Hygraph Models: PascalCase (e.g., `HeroSection`)
- React Components: PascalCase (e.g., `HeroSection.tsx`)
- Props interfaces: `IHeroSectionProps`
- Type definitions: `THeroSectionData`
- Files: kebab-case (e.g., `hero-section.ts`)

### 2. Section Structure
Each section should have:
```typescript
interface BaseSection {
  __typename: string;          // Section identifier
  id: string;                  // Unique ID
  title?: string;             // Optional section title
  subtitle?: string;          // Optional section subtitle
  backgroundColor?: string;   // Optional styling
  padding?: string;          // Optional spacing
}
```

### 3. Data Fetching Pattern
```typescript
// Single source of truth for page data
const getPageData = async (slug: string) => {
  const data = await fetchPage(slug);
  return processSections(data);
};
```

## Component Modularity Guidelines

### Deciding Section Flexibility

When creating a new section, use this decision framework:

#### 1. Full CMS Control
Ideal for sections that need:
- Usage across multiple pages
- Frequent content updates
- Consistent but configurable layout

Example: Hero Section
```typescript
// Fully CMS-managed
{
  title: String
  subtitle: String
  backgroundImage: Asset
  ctaText: String
  ctaLink: String
}
```

#### 2. Hybrid Approach
Best for sections with:
- Specific layout requirements
- Mix of fixed and variable content
- Complex interactions

Example: MarginLending Section
```typescript
// Partially CMS-managed
{
  title: String
  description: String
  // Layout and features fixed in code
}
```

#### 3. Fixed in Code
Suitable for:
- Very specific features
- Complex animations
- Custom interactions
- Sections that rarely change

### Decision Framework
Ask these questions for each section:
1. Will this section be used on multiple pages?
2. Does the content need frequent updates?
3. Does the layout need to be flexible?

### Recommended Section Types

1. **Full CMS Control:**
   - Hero sections
   - Fund sliders
   - Generic content sections
   - CTAs
   - Feature lists

2. **Hybrid (Some fixed structure):**
   - MarginLending section
   - Complex calculators
   - Highly interactive sections

3. **Fixed in Code:**
   - Very specific features
   - Complex animations
   - Custom interactions

## Limitations & Considerations

### 1. Performance
- **Challenge**: Each page fetches all section data at once
- **Solution**: Implement:
  - Static generation where possible
  - Proper caching
  - Loading states per section

### 2. Content Management
- **Challenge**: More complex content structure
- **Solution**: 
  - Clear documentation for content editors
  - Strict validation rules in Hygraph
  - Preview mode for content changes

### 3. Maintenance
- **Challenge**: More moving parts to maintain
- **Solution**:
  - Strong typing
  - Centralized error handling
  - Component documentation
  - Reusable utilities

### 4. Flexibility vs Structure
- **Challenge**: Balance between flexibility and maintainability
- **Solution**:
  - Limit section types to actual needs
  - Use composition over configuration
  - Standard props pattern

## Example Usage

```typescript
// pages/[slug].tsx
const Page = async ({ params }) => {
  const page = await getPageData(params.slug);
  return <PageRenderer sections={page.sections} />;
};

// components/PageRenderer.tsx
const PageRenderer = ({ sections }) => {
  return sections.map(section => (
    <SectionRenderer 
      key={section.id} 
      section={section} 
    />
  ));
};
```

## Implementation Plan

### Phase 1: Homepage Sections
1. **Audit Current Sections**
   - [ ] List all homepage sections
   - [ ] Categorize by modularity type
   - [ ] Define data structure for each

2. **Hygraph Setup**
   - [ ] Create Page model
   - [ ] Create base Section interface
   - [ ] Create section models based on audit

3. **Component Restructure**
   - [ ] Create new component structure
   - [ ] Move existing components
   - [ ] Add type definitions

### Phase 2: Content Migration
1. **Homepage Setup**
   - [ ] Create homepage in Hygraph
   - [ ] Migrate current content
   - [ ] Test all sections

2. **Component Testing**
   - [ ] Test each section independently
   - [ ] Verify responsive behavior
   - [ ] Check content editing workflow

### Phase 3: Expand to Other Pages
1. **Site Architecture**
   - [ ] Review all planned pages
   - [ ] Identify shared sections
   - [ ] Plan new section needs

2. **Implementation**
   - [ ] Create additional sections
   - [ ] Set up new pages
   - [ ] Migrate content

## Required From Client

1. **Content Decisions**
   - Confirm which sections need full CMS control
   - Identify sections that can be more fixed
   - List all planned pages and their sections

2. **Design Input**
   - Section variations needed
   - Color/style customization requirements
   - Responsive behavior preferences

3. **Content Management**
   - Who will manage content
   - Required level of flexibility
   - Any specific workflow needs

## Technical Changes Required

1. **Code Structure**
   - New component organization
   - Type system implementation
   - Dynamic section renderer

2. **Hygraph Changes**
   - New models creation
   - Component/model relationship setup
   - Content migration

3. **Data Flow**
   - Updated GraphQL queries
   - New data fetching pattern
   - Type generation setup

## Questions to Answer During Implementation

1. What sections do we need initially?
2. Do we need different layouts per page?
3. How do we handle navigation/menus?
4. What level of customization do editors need?

## Success Criteria

- ✅ Pages manageable through CMS
- ✅ Sections reusable across pages
- ✅ Type-safe component props
- ✅ Clear content editing process
- ✅ Maintainable codebase
- ✅ Fast page loads
- ✅ Easy to add new sections

Remember: This is a living document. Update it as decisions are made and implementation progresses. 
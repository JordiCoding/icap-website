# Mutual Fund Slider Component

## Overview
The Mutual Fund Slider is a modern, responsive carousel component that showcases ICAP's mutual fund offerings. It supports both LTR and RTL layouts, internationalization, and integrates with Hygraph CMS.

## Key Features
- Responsive carousel displaying up to 3 fund cards per view
- RTL support for Arabic localization
- Sharia compliance badge integration
- Smooth animations and transitions
- CMS integration ready

## Technical Stack
- React + TypeScript
- Framer Motion (animations)
- keen-slider (carousel)
- Tailwind CSS (styling)
- i18next (internationalization)
- Hygraph (CMS)

## Component Structure
```
src/
  components/
    mutual-funds/
      MutualFundSlider/
        ├── index.tsx              # Main component
        ├── FundCard.tsx           # Individual fund card
        ├── types.ts               # TypeScript interfaces
        ├── constants.ts           # Static data and configurations
        └── animations.ts          # Framer Motion variants
```

## Implementation Plan

### Milestone 1: Core Components
- [ ] Set up component directory structure
- [ ] Implement `FundCard` component with props interface
- [ ] Create basic slider layout with placeholder data
- [ ] Add Sharia compliance badge component

### Milestone 2: Data Integration
- [ ] Create fund data structure in JSON
- [ ] Implement data mapping logic
- [ ] Add TypeScript interfaces for fund data
- [ ] Set up placeholder icons and illustrations

### Milestone 3: Carousel & Animations
- [ ] Install and configure keen-slider
- [ ] Implement navigation controls
- [ ] Add Framer Motion animations
- [ ] Implement responsive behavior

### Milestone 4: i18n & RTL
- [ ] Set up translation keys
- [ ] Configure RTL support
- [ ] Test language switching
- [ ] Validate RTL carousel behavior

### Milestone 5: CMS Integration
- [ ] Design Hygraph schema
- [ ] Implement GraphQL queries
- [ ] Add loading states
- [ ] Error handling

## Usage Example

```tsx
import { MutualFundSlider } from '@/components/mutual-funds';

function HomePage() {
  return (
    <section className="py-12">
      <MutualFundSlider />
    </section>
  );
}
```

## Props Interface

```typescript
interface FundCardProps {
  icon: string;
  title: string;
  riskLevel: 'low' | 'medium' | 'high';
  description: string;
  isShariaCompliant: boolean;
}

interface MutualFundSliderProps {
  className?: string;
  initialSlide?: number;
}
```

## Styling Guidelines
- Use Tailwind CSS for consistent styling
- Follow ICAP's design system colors and spacing
- Ensure responsive design across all breakpoints
- Maintain accessibility standards

## Testing Checklist
- [ ] Component renders without errors
- [ ] Carousel navigation works in both directions
- [ ] RTL support functions correctly
- [ ] Animations perform smoothly
- [ ] Responsive behavior works as expected
- [ ] Accessibility requirements are met
- [ ] i18n translations are complete
- [ ] CMS integration functions properly

## Notes
- Ensure all icons are optimized SVGs
- Maintain consistent spacing between cards
- Follow ICAP's brand guidelines for colors and typography
- Consider adding loading skeletons for CMS data
- Implement error boundaries for robustness 
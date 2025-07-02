# Mutual Fund Slider Component

## Overview
The Mutual Fund Slider is a modern, responsive carousel component that showcases ICAP's mutual fund offerings. It supports both LTR and RTL layouts, internationalization, and integrates with Hygraph CMS.

## Key Features
- Responsive carousel displaying 1 (mobile), 2 (tablet), or 3 (desktop) fund cards per view
- RTL support for Arabic localization
- Sharia compliance badge integration
- Smooth animations and transitions
- Risk level indicators with color coding
- 24px spacing between cards with hover effects

## Technical Stack
- React + TypeScript
- Framer Motion (animations)
- keen-slider (carousel)
- Tailwind CSS (styling)
- i18next (internationalization)

## Component Structure
```
src/
  components/
    mutual-funds/
      MutualFundSlider/
        ├── index.tsx              # Main slider component
        ├── FundCard.tsx           # Individual fund card with risk levels
        ├── types.ts               # TypeScript interfaces
        ├── constants.ts           # Risk level styles and configurations
        └── animations.ts          # Framer Motion variants
```

## Implementation Status

### Completed Features
✅ Core Components
- [x] Component directory structure
- [x] `FundCard` component with props interface
- [x] Slider layout with sample data
- [x] Sharia compliance badge
- [x] Risk level indicators
- [x] Geometric icons integration

✅ Carousel & Animations
- [x] keen-slider configuration
- [x] Navigation dots and arrows
- [x] Hover animations
- [x] Responsive breakpoints
- [x] Card spacing and scaling

✅ i18n Support
- [x] Translation keys for risk levels
- [x] Translation keys for Sharia compliance
- [x] RTL layout support

### Pending Features
📋 CMS Integration
- [ ] Hygraph schema design
- [ ] GraphQL queries
- [ ] Loading states
- [ ] Error handling

## Usage Example

```tsx
import { MutualFundSlider } from '@/components/mutual-funds';

function MutualFundsSection() {
  return (
    <section className="relative bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-[90%] sm:max-w-[85%] md:max-w-4xl lg:max-w-5xl px-4">
        <MutualFundSlider />
      </div>
    </section>
  );
}
```

## Props Interface

```typescript
type RiskLevel = 'low' | 'medium' | 'high';

interface FundCardProps {
  id: string;
  title: string;
  description: string;
  riskLevel: RiskLevel;
  isShariaCompliant: boolean;
  icon: string;
  className?: string;
}

interface MutualFundSliderProps {
  className?: string;
}
```

## Styling Details
- Card dimensions: 330px × 454px
- Spacing between cards: 24px
- Hover effect: 1.02 scale with smooth transition
- Risk level colors:
  - Low: #EAFAF3 (bg) / #1F9D61 (text)
  - Medium: #FEF5E7 (bg) / #F39C12 (text)
  - High: #FEECEC (bg) / #E74C3C (text)
- Border radius: 20px
- Padding: 32px (p-8)

## Responsive Breakpoints
- Mobile: 1 card per view
- Tablet (min-width: 768px): 2 cards per view
- Desktop (min-width: 1024px): 3 cards per view

## Testing Checklist
✅ Component renders without errors
✅ Carousel navigation works in both directions
✅ RTL support functions correctly
✅ Animations perform smoothly
✅ Responsive behavior works as expected
✅ i18n translations are complete
⏳ CMS integration (pending)

## Next Steps
1. Design and implement Hygraph schema for fund data
2. Add loading states and error handling
3. Implement data fetching from CMS
4. Add unit tests for components
5. Implement error boundaries

## Notes
- All geometric icons (cube, pyramid, hexagon) are optimized SVGs
- Card spacing accounts for hover effect to prevent layout shifts
- Navigation controls use ICAP's brand color (#C87D55)
- Description text is limited to 3 lines with ellipsis
- Risk level badges use consistent padding and rounded corners 
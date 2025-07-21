# ICAP Website - Project Restructuring Guide

## 🏗️ **Project Restructuring Overview**

This document explains the comprehensive restructuring that was performed on the ICAP website project, transitioning from a traditional component-based structure to a **feature-first modular architecture** for better scalability and maintainability.

### **Key Changes Made:**

1. **Moved from flat structure to modular organization**
2. **Implemented feature-first architecture**
3. **Centralized shared resources**
4. **Cleaned up empty directories**
5. **Fixed all import paths**

---

## 📁 **New Project Structure**

```
src/
├── app/                    # Main application files
│   ├── main.tsx           # Entry point
│   └── App.tsx            # Root component with routing
├── assets/                 # Static assets (fonts, images, etc.)
│   ├── fonts/
│   └── react.svg
├── data/                   # JSON data files
│   ├── navs.json
│   └── dividends.json
├── locales/                # Internationalization files
│   ├── en.json
│   └── ar.json
├── modules/                # Feature modules (NEW STRUCTURE)
│   ├── brokerage/          # Brokerage feature
│   │   ├── pages/
│   │   │   ├── index.tsx
│   │   │   └── local-market.tsx
│   │   └── components/
│   │       └── shared/
│   │           ├── BrokerageHero.tsx
│   │           └── TradeYourWaySection.tsx
│   ├── home/               # Home page feature
│   │   ├── pages/
│   │   │   └── index.tsx
│   │   └── components/
│   │       ├── Hero.tsx
│   │       ├── PortfolioSection.tsx
│   │       ├── CtaSection.tsx
│   │       ├── NewsroomSection.tsx
│   │       ├── GlobalMarketsSection.tsx
│   │       ├── WhyAlistithmarSection.tsx
│   │       ├── MarginLendingSection.tsx
│   │       ├── MutualFundsSection.tsx
│   │       └── MarginLendingNewSection.tsx
│   ├── calculator/         # Calculator feature
│   │   ├── pages/
│   │   │   └── index.tsx
│   │   ├── Calculator.tsx
│   │   ├── DepositInput.tsx
│   │   ├── GrowthChart.tsx
│   │   ├── ResultsPanel.tsx
│   │   └── TimeframeSelector.tsx
│   └── real-estate/        # Real estate feature
│       └── pages/
│           └── index.tsx
├── shared/                 # Shared resources (NEW STRUCTURE)
│   ├── components/         # Shared UI components
│   │   ├── TextBlock.tsx
│   │   ├── PromotionModal.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   └── index.ts
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── index.ts
│   │   ├── market-data/
│   │   │   ├── MarketDataSection.tsx
│   │   │   └── MarketCard.tsx
│   │   ├── news/
│   │   │   ├── NewsCard.tsx
│   │   │   ├── NewsSlider.tsx
│   │   │   └── index.ts
│   │   └── mutual-funds/
│   │       ├── MutualFundSlider/
│   │       │   ├── FundCard.tsx
│   │       │   ├── animations.ts
│   │       │   ├── constants.ts
│   │       │   ├── types.ts
│   │       │   └── index.tsx
│   │       └── index.ts
│   ├── hooks/              # Shared custom hooks
│   │   ├── useApi.ts
│   │   ├── useCmsData.ts
│   │   ├── useFundSlider.ts
│   │   ├── useLanguage.ts
│   │   ├── useNewsData.ts
│   │   ├── useTypography.ts
│   │   └── index.ts
│   ├── stores/             # State management
│   │   ├── useAppStore.ts
│   │   ├── useMarketStore.ts
│   │   └── index.ts
│   ├── types/              # TypeScript type definitions
│   │   ├── cms.ts
│   │   ├── market.ts
│   │   ├── news.ts
│   │   └── index.ts
│   └── utils/              # Utility functions
│       ├── calculations.ts
│       ├── hygraph.ts
│       ├── i18n.ts
│       ├── queries.ts
│       └── index.ts
└── styles/                 # Global styles
    └── index.css
```

---

## 🔄 **Migration Summary**

### **What Was Moved:**

| **Old Location** | **New Location** | **Reason** |
|------------------|------------------|------------|
| `src/pages/` | `src/modules/*/pages/` | Feature-based organization |
| `src/components/` | `src/modules/*/components/` + `src/shared/components/` | Shared vs feature-specific |
| `src/hooks/` | `src/shared/hooks/` | Centralized shared resources |
| `src/utils/` | `src/shared/utils/` | Centralized shared resources |
| `src/types/` | `src/shared/types/` | Centralized shared resources |

### **What Was Removed:**
- Empty directories after restructuring
- Duplicate files
- Unused component folders
- Redundant `components` subfolder in calculator module (flattened structure)

---

## 🚀 **How to Work with the New Structure**

### **For New Features:**

1. **Create a new module:**
   ```
   src/modules/your-feature/
   ├── pages/
   │   └── index.tsx
   └── components/
       ├── shared/          # Components used across multiple pages
       └── specific/        # Components specific to this feature
   ```

2. **Use shared resources:**
   ```typescript
   // Import shared components
   import { Button } from '../../../shared/components/ui';
   import { useTypography } from '../../../shared/hooks';
   
   // Import shared utilities
   import { someUtil } from '../../../shared/utils';
   ```

### **Import Paths Guide:**

| **Resource Type** | **Import Path** | **Example** |
|-------------------|-----------------|-------------|
| Shared Components | `../../../shared/components/` | `import { Button } from '../../../shared/components/ui';` |
| Shared Hooks | `../../../shared/hooks` | `import { useTypography } from '../../../shared/hooks';` |
| Shared Utils | `../../../shared/utils` | `import { someUtil } from '../../../shared/utils';` |
| Shared Types | `../../../shared/types` | `import { SomeType } from '../../../shared/types';` |
| Module Components | `../components/` | `import SomeComponent from '../components/SomeComponent';` |

### **Barrel Exports:**

Most shared directories have `index.ts` files for clean imports:
```typescript
// Instead of individual imports
import { Button } from '../../../shared/components/ui/Button';

// Use barrel exports
import { Button } from '../../../shared/components/ui';
```

---

## 🛠️ **Development Guidelines**

### **Adding New Features:**

1. **Create module structure:**
   ```bash
   mkdir -p src/modules/new-feature/{pages,components/{shared,specific}}
   ```

2. **Add to routing in `src/app/App.tsx`:**
   ```typescript
   import NewFeaturePage from '../modules/new-feature/pages';
   
   // Add route
   <Route path="/new-feature" element={<NewFeaturePage />} />
   ```

3. **Use shared resources when possible:**
   - UI components → `src/shared/components/ui/`
   - Hooks → `src/shared/hooks/`
   - Utilities → `src/shared/utils/`

### **Component Organization:**

- **Shared Components** (`src/shared/components/`): Used across multiple features
- **Feature Components** (`src/modules/*/components/`): Specific to one feature
- **Layout Components** (`src/shared/components/layout/`): Global layout components

### **Import Best Practices:**

1. **Use relative paths for module-specific imports**
2. **Use shared paths for common resources**
3. **Leverage barrel exports for cleaner imports**
4. **Keep import paths consistent within modules**

---

## 🔧 **Key Files to Know:**

### **Entry Points:**
- `src/app/main.tsx` - Application entry point
- `src/app/App.tsx` - Root component with routing

### **Configuration:**
- `src/shared/utils/i18n.ts` - Internationalization setup
- `src/styles/index.css` - Global styles

### **Shared Resources:**
- `src/shared/components/ui/` - Reusable UI components
- `src/shared/hooks/` - Custom React hooks
- `src/shared/utils/` - Utility functions
- `src/shared/types/` - TypeScript type definitions

---

## 📋 **Current Features:**

### **Active Modules:**
1. **Home** (`src/modules/home/`) - Landing page with multiple sections
2. **Brokerage** (`src/modules/brokerage/`) - Trading platform features
3. **Calculator** (`src/modules/calculator/`) - Investment calculator
4. **Real Estate** (`src/modules/real-estate/`) - Real estate features

### **Shared Components:**
- Layout components (Header, Footer, Navigation)
- UI components (Button, TextBlock)
- Feature components (MarketData, News, MutualFunds)

---

## 🚨 **Important Notes:**

1. **Import Paths**: All import paths have been updated to reflect the new structure
2. **Barrel Exports**: Use index files for cleaner imports
3. **Feature Isolation**: Each module is self-contained with its own components
4. **Shared Resources**: Common functionality is centralized in `src/shared/`

---

## 🎯 **For New Team Members:**

1. **Start with the module structure** - understand how features are organized
2. **Use shared resources** - avoid duplicating common functionality
3. **Follow the import patterns** - maintain consistency across the codebase
4. **Check existing modules** - see how similar features are implemented

This restructuring provides better scalability, maintainability, and developer experience while preserving all existing functionality.

---

## 📝 **Migration Checklist**

### **Completed Tasks:**
- ✅ Moved all pages to feature modules
- ✅ Centralized shared components
- ✅ Updated all import paths
- ✅ Created barrel exports
- ✅ Cleaned up empty directories
- ✅ Fixed development server issues
- ✅ Updated routing configuration

### **Benefits Achieved:**
- 🎯 **Better Organization**: Features are now grouped logically
- 🔄 **Easier Maintenance**: Shared resources are centralized
- 📈 **Scalability**: New features can be added without affecting existing ones
- 👥 **Team Collaboration**: Clear separation of concerns
- 🚀 **Developer Experience**: Cleaner imports and better structure

---

*This restructuring was completed to improve the project's architecture and make it more maintainable for future development.* 
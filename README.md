# ICAP Bilingual Website

A fully responsive bilingual website (Arabic/English) built with React.js, TypeScript, and Tailwind CSS v4. This project is a collaboration, and this document serves as a log of our development process and key architectural decisions.

## 🚀 Project Status (Last Updated: Core Components Complete)

### ✅ **Phase 1: Project Foundation & Layout Shell (Complete)**

We successfully set up the project from scratch, including configuring the development environment (Node.js, Vite, Tailwind CSS v4) and establishing a robust architecture for a bilingual, responsive website.

### ✅ **Phase 2: Core Component & Section Development (Complete)**

This phase focused on building reusable components and the first content sections of the landing page.

1.  **"Your Portfolio" Section**:
    *   Built the initial section with a background image and text content.
    *   Refined layout, spacing, and colors based on precise design feedback.

2.  **Reusable `TextBlock` Component (`/components/common/TextBlock.tsx`)**:
    *   **Decision**: To avoid repeating code, we created a generic `TextBlock` component to handle a recurring pattern (title, subtitle, actions).
    *   **Implementation**: It's a flexible component that accepts a `title`, `subtitle`, and a generic `actions` node, allowing it to render anything from a single button to a group of app store badges. It also supports a `variant` prop for use on light or dark backgrounds.

3.  **"Margin Lending" Section**:
    *   Served as the first implementation of our reusable `TextBlock`.
    *   **Challenge**: We faced significant challenges with bilingual text that required specific line breaks and styled sub-components (the gold "Margin Lending" text).
    *   **Solution**: After several iterations, we landed on a robust structural pattern. The parent "Section" component defines a content box with a set width and alignment (`justify-end`, `rtl:justify-start`). The child `TextBlock` component lives inside this box and is only responsible for its internal text styling. This pattern is now our standard for building similar sections and has proven to work flawlessly for both LTR and RTL layouts.

4.  **Reusable `Button` Component (`/components/ui/Button.tsx`)**:
    *   **Decision**: To ensure all call-to-action elements are consistent, we built a reusable `Button` component.
    *   **Implementation**: It's a polymorphic component (can be rendered as `<button>` or `<a>`) with `primary` (filled, gold) and `secondary` (outline, white) variants.
    *   **Challenge**: The button styles were not applying correctly at first.
    *   **Solution**: We identified an error in our Tailwind CSS v4 configuration. The issue was resolved by correctly defining our custom brand colors under the `--color-*` namespace in `index.css` (e.g., `--color-icap-gold: #EECA60;`) and restarting the dev server to ensure the theme changes were picked up.

### ▶️ **Phase 3: Navigation & Interactivity (Current Phase)**

This is our current focus.

*   **Next Step**: Build out the main site **navigation**, including the mobile hamburger menu and dropdowns.

### ⏳ **Phase 4: Remaining Content & Internal Pages (Upcoming)**

*   Build remaining landing page sections.
*   Set up all application routes for the 25-35 pages.
*   Build out all internal pages using the established components.

## 🛠 Tech Stack
*   **React 18** with TypeScript
*   **Vite** for fast development
*   **Tailwind CSS 4.x** with the `@tailwindcss/vite` plugin
*   **react-i18next** for internationalization
*   **React Router DOM** for navigation

## 🚀 Getting Started

1.  **Ensure you are using the correct Node.js version.** If you have `nvm` installed, you can run `nvm use` to switch to the version specified in `.nvmrc`.
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start development server**:
    ```bash
    npm run dev
    ```

## 📝 Architectural Notes & Key Decisions

-   **Component-Driven Development**: We are building the UI from small, reusable components (`Button`, `TextBlock`) up to larger "Section" components and finally "Page" components.
-   **Styling with Tailwind v4**: All custom theme properties (colors, fonts) are defined as CSS variables under the `@theme` directive in `src/index.css`. This is the modern, config-less approach.
-   **Bilingual Layout Pattern**: For sections with content aligned to one side, the parent section component is responsible for creating a sized and positioned "content box". The child component (`TextBlock`) is placed inside this box and is only responsible for its own content, not its position on the page. This ensures robust LTR/RTL behavior.
-   **Polymorphic Components**: Components like `Button` are built to be polymorphic (using `as` prop), allowing them to render as different HTML elements (e.g., `<button>` or `<a>`) for better semantic HTML and accessibility.

## 🌐 Bilingual Features

- **Language Detection**: Automatically detects browser language
- **RTL Support**: Full right-to-left layout for Arabic
- **Translation Keys**: All text uses `t('key')` format
- **Font Support**: Ready for Arabic fonts (Noto Sans Arabic)

## 📱 Responsive Design

- **Mobile-first**: Built for mobile devices first
- **Breakpoints**: xs, sm, md, lg, xl, 2xl
- **Container**: Responsive container with proper padding
- **Navigation**: Mobile hamburger menu ready

---

**Ready for your Figma designs!** 🎨

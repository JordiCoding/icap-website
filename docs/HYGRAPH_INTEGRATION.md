# Hygraph CMS Integration Guide

## Overview
This guide explains how to set up content management for your ICAP website using Hygraph (formerly GraphCMS).

## 🎯 What We've Implemented
- **Hero Section Content Management**: Title, subtitle, CTA buttons, and background images
- **Multi-language Support**: Content can be managed separately for English and Arabic
- **Graceful Fallbacks**: If CMS content fails to load, the site uses translation files as backup
- **Loading States**: Smooth loading experience while CMS content is being fetched

## 📋 Setup in Hygraph

### Step 1: Create Your Hygraph Project
1. Go to [app.hygraph.com](https://app.hygraph.com/)
2. Create a new project
3. Choose your region (preferably closest to your users)

### Step 2: Create Content Model

Create a content model called **"Hero Content"** with these fields:

#### Required Fields:
- **Title** (Single line text)
  - API ID: `title`
  - Required: Yes
  
- **Subtitle** (Single line text) 
  - API ID: `subtitle`
  - Required: Yes

- **CTA Primary** (Single line text)
  - API ID: `ctaPrimary` 
  - Required: Yes
  - Description: Primary button text (e.g., "Log in")

- **CTA Secondary** (Single line text)
  - API ID: `ctaSecondary`
  - Required: Yes
  - Description: Secondary button text (e.g., "Sign Up")

- **Language** (Enumeration)
  - API ID: `language`
  - Values: `en`, `ar`
  - Required: Yes

#### Optional Fields:
- **Background Image** (Asset)
  - API ID: `backgroundImage`
  - Required: No

### Step 3: Configure API Access
1. Go to **Settings** → **API Access**
2. Create a **Content API** endpoint
3. Set permissions to **Read** for your Hero Content model
4. Copy your API endpoint URL

### Step 4: Environment Configuration

Create a `.env.local` file in your project root:

```bash
VITE_HYGRAPH_ENDPOINT=https://your-region.hygraph.com/v2/your-project-id/master
```

Replace `your-region` and `your-project-id` with your actual values from Hygraph.

### Step 5: Create Content

In your Hygraph dashboard:

1. Go to **Content** → **Hero Contents**
2. Create new entries:

**English Hero Content:**
```
Title: "Investing Made Smarter"
Subtitle: "Experience seamless and secure investing with Alistithmar Capital"
CTA Primary: "Log in"
CTA Secondary: "Sign Up"
Language: en
Background Image: [Upload your hero background image]
```

**Arabic Hero Content:**
```
Title: "الاستثمار بذكاء أكبر"
Subtitle: "اختبر الاستثمار السلس والآمن مع رأس المال الاستثماري"
CTA Primary: "تسجيل الدخول"
CTA Secondary: "اشتراك"
Language: ar
Background Image: [Upload your hero background image]
```

3. **Publish** your content entries

## 🔄 How It Works

- When users visit your website, the Hero component fetches content from Hygraph
- Content is filtered by the current language (English/Arabic)
- If CMS content is unavailable, the site falls back to your existing translation files
- Changes in Hygraph appear on your website immediately (no deployment needed!)

## 🚀 Benefits

1. **No Code Changes**: Update hero content without touching code
2. **Instant Updates**: Changes appear immediately on your live site
3. **Multi-language**: Manage content separately for each language
4. **Media Management**: Upload and manage images directly in Hygraph
5. **Version Control**: Hygraph tracks content changes and allows rollbacks
6. **Preview**: Preview changes before publishing

## 🔧 Testing

To test the integration:

1. Start your development server: `npm run dev`
2. Check browser console for any CMS-related errors
3. Try updating content in Hygraph and see changes reflected on your site
4. Test with different languages to ensure proper content switching

## 🎛️ Extending the Integration

This is just the beginning! You can easily extend this to manage:

- **Portfolio Section**: Investment options, descriptions, features
- **Margin Lending Section**: Content, benefits, terms
- **Footer Content**: Contact information, links, legal text
- **Navigation**: Menu items, links
- **Blog/News**: Articles, announcements
- **SEO Metadata**: Page titles, descriptions, keywords

Would you like me to help you implement any of these extensions?

## 🆘 Troubleshooting

**Issue**: CMS content not loading
- Check your `VITE_HYGRAPH_ENDPOINT` in `.env.local`
- Verify API permissions in Hygraph
- Check browser console for GraphQL errors

**Issue**: Content not updating
- Ensure content is published in Hygraph
- Check the language field matches your site language
- Clear browser cache and reload

**Issue**: Images not displaying
- Verify image assets are published in Hygraph
- Check CORS settings in Hygraph if needed 
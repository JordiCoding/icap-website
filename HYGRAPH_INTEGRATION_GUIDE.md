# Hygraph Integration Guide: Lessons Learned & Solutions

## 🎯 Overview
This guide documents the complete journey of integrating Hygraph CMS with a React/TypeScript application, including all pain points, loopholes, and proven solutions discovered during the news system implementation.

## 📋 Table of Contents
1. [Common Pain Points & Solutions](#common-pain-points--solutions)
2. [GraphQL Query Issues](#graphql-query-issues)
3. [Component State Management](#component-state-management)
4. [Content Display Problems](#content-display-problems)
5. [Development Workflow Issues](#development-workflow-issues)
6. [Best Practices](#best-practices)
7. [Quick Reference](#quick-reference)

---

## 🚨 Common Pain Points & Solutions

### 1. **The "[object Object]" Problem**
**Problem**: Content displays as `[object Object]` instead of actual text
**Root Cause**: Hygraph returns rich text content as `{ html: string }` object, not plain string
**Solution**:
```typescript
// ❌ Wrong - causes [object Object]
dangerouslySetInnerHTML={{ __html: article.content }}

// ✅ Correct - displays actual content
dangerouslySetInnerHTML={{ __html: article.content.html }}
```

### 2. **GraphQL Schema Mismatches**
**Problem**: Queries fail with "Field doesn't exist" errors
**Root Cause**: Assuming fields exist without checking Hygraph schema
**Solution**:
- Always verify field names in Hygraph schema first
- Common mistakes:
  - `alt` field on Asset (doesn't exist by default)
  - `stage: PUBLISHED` in where clauses (invalid for most types)
  - Wrong field names (`excerpt` vs `description`)

### 3. **Variable Naming Conflicts**
**Problem**: "Identifier 'article' has already been declared" errors
**Root Cause**: Multiple variables with same name in different scopes
**Solution**:
- Use descriptive, unique variable names
- Avoid generic names like `article`, `data`, `item`
- Example: `currentArticle`, `newsArticle`, `articleData`

### 4. **Infinite Re-render Loops**
**Problem**: Components re-render endlessly, causing performance issues
**Root Cause**: Missing dependencies in useEffect or useCallback
**Solution**:
```typescript
// ❌ Wrong - causes infinite loops
const fetchData = async () => { /* ... */ };
useEffect(() => { fetchData(); }, [fetchData]);

// ✅ Correct - stable function reference
const fetchData = useCallback(async () => { /* ... */ }, [dependency]);
useEffect(() => { fetchData(); }, [fetchData]);
```

---

## 🔍 GraphQL Query Issues

### Schema Field Verification
**Always check these common issues:**

1. **Asset Fields**:
```graphql
# ❌ Wrong - 'alt' doesn't exist by default
featuredImage {
  url
  alt
}

# ✅ Correct - only request existing fields
featuredImage {
  url
}
```

2. **Filtering Issues**:
```graphql
# ❌ Wrong - stage filter not valid for ArticleWhereInput
query GetArticles {
  articles(where: { stage: PUBLISHED }) {
    title
  }
}

# ✅ Correct - use proper filtering
query GetArticles {
  articles(where: { featured: true }) {
    title
  }
}
```

### Content Structure
**Rich Text Content**:
```typescript
// Hygraph returns rich text as:
{
  content: {
    html: "<p>Actual HTML content</p>"
  }
}

// Always access the .html property
article.content.html
```

---

## ⚡ Component State Management

### State Conflicts
**Problem**: Multiple components managing same state differently
**Solution**: Clear separation of concerns

```typescript
// ❌ Wrong - conflicting state management
const { articles, loading, error } = useNewsData();
const [article, setArticle] = useState(null);
const [loading, setLoading] = useState(true); // Conflict!

// ✅ Correct - unique state names
const { articles, fetchArticleBySlug } = useNewsData();
const [currentArticle, setCurrentArticle] = useState(null);
const [pageLoading, setPageLoading] = useState(true);
```

### Hook Design Patterns
**Custom Hook Best Practices**:
```typescript
// ✅ Good hook design
export const useNewsData = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Don't manage loading state in fetch functions
  const fetchArticleBySlug = useCallback(async (slug: string) => {
    try {
      const data = await hygraphClient.request(GET_ARTICLE_BY_SLUG, { slug });
      return data.article;
    } catch (err) {
      throw err; // Let component handle error
    }
  }, []);

  return { articles, loading, error, fetchArticleBySlug };
};
```

---

## 📝 Content Display Problems

### TypeScript Interface Issues
**Problem**: Incorrect interface definitions cause runtime errors
**Solution**: Match interfaces exactly to Hygraph schema

```typescript
// ❌ Wrong - assumes content is string
interface Article {
  content: string;
}

// ✅ Correct - matches Hygraph rich text structure
interface Article {
  content: {
    html: string;
  };
}
```

### Content Rendering
**Safe Content Display**:
```typescript
// ✅ Robust content rendering with fallbacks
<div 
  dangerouslySetInnerHTML={{ 
    __html: article.content?.html || article.content || '' 
  }} 
/>
```

---

## 🔧 Development Workflow Issues

### Hot Module Replacement (HMR) Problems
**Problem**: Changes don't reflect due to caching issues
**Solutions**:
1. **Clear cache and restart**:
```bash
pkill -f "vite"
npm run dev
```

2. **Check for syntax errors** in terminal - they prevent HMR
3. **Look for duplicate variable declarations**

### Debugging Strategies
**Effective Debugging Approach**:
```typescript
// Add comprehensive logging
console.log('Component render:', { 
  loading, 
  error, 
  hasData: !!data, 
  slug 
});

// Test queries independently
const testQuery = async () => {
  try {
    const result = await hygraphClient.request(GET_ARTICLE_BY_SLUG, { 
      slug: 'test-slug' 
    });
    console.log('Query result:', result);
  } catch (err) {
    console.error('Query error:', err);
  }
};
```

---

## 🏆 Best Practices

### 1. **Start Simple, Add Complexity Gradually**
```typescript
// ✅ Begin with minimal implementation
const NewsDetailPage = () => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Basic functionality first
  // Add animations, translations, etc. later
};
```

### 2. **Always Handle Edge Cases**
```typescript
// ✅ Comprehensive error handling
if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
if (!article) return <NotFound />;
return <ArticleContent article={article} />;
```

### 3. **User Experience Considerations**
```typescript
// ✅ Auto-scroll to top on navigation
useEffect(() => {
  window.scrollTo(0, 0);
}, [slug]);
```

### 4. **Avoid Over-Engineering**
- Don't add complex animations until basic functionality works
- Avoid excessive abstraction in initial implementation
- Keep components simple and focused

---

## 📚 Quick Reference

### Common GraphQL Query Structure
```graphql
query GetArticleBySlug($slug: String!) {
  article(where: { slug: $slug }) {
    id
    title
    content {
      html
    }
    publishedDate
    featuredImage {
      url
    }
  }
}
```

### Typical Component Structure
```typescript
const NewsDetailPage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data
  }, [slug]);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!article) return <NotFound />;
  return <Content />;
};
```

### Debug Checklist
- [ ] Check Hygraph schema for field existence
- [ ] Verify GraphQL query syntax
- [ ] Check for variable naming conflicts
- [ ] Ensure proper TypeScript interfaces
- [ ] Test content rendering with fallbacks
- [ ] Clear cache if changes don't reflect

---

## 🎯 Key Takeaways

1. **Always verify Hygraph schema** before writing queries
2. **Use unique, descriptive variable names** to avoid conflicts
3. **Handle rich text content properly** with `.html` property
4. **Start with minimal implementation** and add complexity gradually
5. **Clear cache and restart** when facing HMR issues
6. **Add comprehensive error handling** for better UX
7. **Test queries independently** before integrating into components

---

## 🔗 Related Files
- `src/utils/queries.ts` - GraphQL queries
- `src/hooks/useNewsData.ts` - Data fetching hook
- `src/types/news.ts` - TypeScript interfaces
- `src/pages/NewsDetailPage.tsx` - Implementation example

---

**Remember**: The key to successful Hygraph integration is understanding the data structure, proper error handling, and keeping implementations simple initially. Always test queries independently and verify schema fields before implementation. 
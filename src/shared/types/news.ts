// News Article Types for Hygraph Integration

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: {
    html: string;
  };
  publishedDate: string;
  featuredImage: {
    url: string;
  };
  heroImage: {
    url: string;
  };
  featured: boolean;
}

// Enhanced NewsCard interface with date and slug
export interface NewsCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  featured?: boolean;
  className?: string;
}

// GraphQL Response Types
export interface GetNewsArticlesResponse {
  articles: NewsArticle[];
}

export interface GetArticleBySlugResponse {
  article: NewsArticle | null;
}

// Hook return types
export interface UseNewsDataReturn {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
  fetchArticles: (limit?: number) => Promise<void>;
  fetchArticleBySlug: (slug: string) => Promise<NewsArticle | null>;
} 
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { hygraphClient } from '../utils/hygraph';
import { GET_NEWS_ARTICLES, GET_ARTICLE_BY_SLUG } from '../utils/queries';
import type { 
  NewsArticle, 
  GetNewsArticlesResponse, 
  GetArticleBySlugResponse,
  UseNewsDataReturn 
} from '../types/news';

export const useNewsData = (): UseNewsDataReturn => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();

  const fetchArticleBySlug = useCallback(async (slug: string): Promise<NewsArticle | null> => {
    try {
      const data: GetArticleBySlugResponse = await hygraphClient.request(
        GET_ARTICLE_BY_SLUG,
        { 
          slug,
          locale: i18n.language || 'en'
        }
      );
      
      return data.article;
    } catch (err) {
      console.error('useNewsData: Failed to fetch article:', err);
      throw err; // Let the component handle the error
    }
  }, [i18n.language]);

  // Auto-fetch articles when language changes
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data: GetNewsArticlesResponse = await hygraphClient.request(
          GET_NEWS_ARTICLES,
          { 
            locale: i18n.language || 'en',
            first: 10 
          }
        );
        
        setArticles(data.articles || []);
      } catch (err) {
        console.error('Failed to fetch news articles:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch news articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [i18n.language]);

  return {
    articles,
    loading,
    error,
    fetchArticles: async () => {}, // Deprecated, but kept for compatibility
    fetchArticleBySlug
  };
}; 
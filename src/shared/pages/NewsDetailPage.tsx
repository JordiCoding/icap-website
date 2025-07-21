import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTypography } from '../hooks/useTypography';
import { useNewsData } from '../hooks/useNewsData';

interface Article {
  id: string;
  title: string;
  content: {
    html: string;
  };
  publishedDate: string;
  featuredImage: {
    url: string;
  };
}

interface GraphQLResponse {
  article: Article;
}

const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { getTypographyClasses } = useTypography();
  const { fetchArticleBySlug } = useNewsData();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const fetchedArticle = await fetchArticleBySlug(slug);
        setArticle(fetchedArticle);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug, fetchArticleBySlug]);

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-icap-primary mx-auto mb-4"></div>
          <div className={`text-xl ${getTypographyClasses('body')}`}>Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className={`text-2xl mb-4 ${getTypographyClasses('title')}`}>Error</h1>
          <p className={`text-gray-600 mb-4 ${getTypographyClasses('body')}`}>{error}</p>
          <Link to="/" className={`text-blue-600 hover:underline ${getTypographyClasses('body')}`}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className={`text-2xl mb-4 ${getTypographyClasses('title')}`}>Article Not Found</h1>
          <Link to="/" className={`text-blue-600 hover:underline ${getTypographyClasses('body')}`}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className={`text-blue-600 hover:underline mb-6 inline-block ${getTypographyClasses('body')}`}>
          ← Back to Home
        </Link>
        
        <article>
          <h1 className={`text-4xl mb-4 ${getTypographyClasses('title')}`}>{article.title}</h1>
          
          <div className={`text-gray-600 mb-8 ${getTypographyClasses('body')}`}>
            {new Date(article.publishedDate).toLocaleDateString()}
          </div>
          
          {article.featuredImage && (
            <img 
              src={article.featuredImage.url} 
              alt={article.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
          )}
          
          <div 
            className={`prose max-w-none ${getTypographyClasses('body')}`}
            dangerouslySetInnerHTML={{ __html: article.content.html }}
          />
        </article>
      </div>
    </div>
  );
};

export default NewsDetailPage; 
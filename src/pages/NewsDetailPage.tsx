import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { hygraphClient } from '../utils/hygraph';
import { GET_ARTICLE_BY_SLUG } from '../utils/queries';

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
  const { i18n } = useTranslation();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) return;
      
      try {
        const data = await hygraphClient.request<GraphQLResponse>(GET_ARTICLE_BY_SLUG, { 
          slug,
          locale: i18n.language || 'en'
        });
        
        setArticle(data.article);
      } catch (err) {
        console.error('Error loading article:', err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug, i18n.language]);

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link to="/" className="text-blue-600 hover:underline">
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
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link to="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to Home
        </Link>
        
        <article>
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          
          <div className="text-gray-600 mb-8">
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
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content.html }}
          />
        </article>
      </div>
    </div>
  );
};

export default NewsDetailPage; 
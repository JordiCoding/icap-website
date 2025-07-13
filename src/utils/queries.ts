import { gql } from 'graphql-request';

export const GET_FUND_SLIDER_SECTION = gql`
  query GetFundSliderSection {
    fundSliderSections(where: { isVisible: true }) {
      title
      subtitle
      funds(where: { isVisible: true }, orderBy: order_ASC) {
        id
        title
        description
        riskLevel
        isShariaCompliant
        icon {
          url
        }
        order
      }
    }
  }
`;

// News Articles Queries
export const GET_NEWS_ARTICLES = gql`
  query GetNewsArticles($locale: Locale!, $first: Int = 10) {
    articles(
      locales: [$locale, en]
      orderBy: publishedDate_DESC
      first: $first
    ) {
      id
      slug
      title
      excerpt
      publishedDate
      featuredImage {
        url
      }
      featured
    }
  }
`;

export const GET_ARTICLE_BY_SLUG = gql`
  query GetArticleBySlug($slug: String!, $locale: Locale!) {
    article(where: { slug: $slug }, locales: [$locale, en]) {
      id
      slug
      title
      excerpt
      content {
        html
      }
      publishedDate
      featuredImage {
        url
      }
      heroImage {
        url
      }
      featured
    }
  }
`; 
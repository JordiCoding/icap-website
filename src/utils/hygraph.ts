import { GraphQLClient } from 'graphql-request';

export const hygraphClient = new GraphQLClient("https://ap-south-1.cdn.hygraph.com/content/cmcj2g7j600dc07w41e272lvt/master", {
  headers: {
    // Add authorization header if you have a token
    // Authorization: `Bearer ${process.env.VITE_HYGRAPH_TOKEN}`,
  },
}); 
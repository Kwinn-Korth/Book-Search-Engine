// queries.js
import { gql } from '@apollo/client';

export const GET_ME = gql`
  query {
    getMe {
      // Define the fields you need
      // ...
    }
  }
`;

export const SEARCH_BOOKS = gql`
  query SearchBooks($query: String!) {
    searchBooks(query: $query) {
      // Define the fields you need
      // ...
    }
  }
`;

// Add more queries as needed

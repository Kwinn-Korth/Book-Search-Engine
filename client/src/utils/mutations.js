// mutations.js
import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($userData: UserInput!) {
    createUser(userData: $userData) {
      // Define the fields you need
      // ...
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($userData: UserInput!) {
    loginUser(userData: $userData) {
      // Define the fields you need
      // ...
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation SaveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
      // Define the fields you need
      // ...
    }
  }
`;

// Add more mutations as needed

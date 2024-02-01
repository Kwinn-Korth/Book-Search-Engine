// API.js
import { useQuery, useMutation } from '@apollo/client';
import * as queries from './queries';
import * as mutations from './mutations';

export const getMe = (token) => {
  return useQuery(queries.GET_ME, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const searchBooks = (query) => {
  return useQuery(queries.SEARCH_BOOKS, {
    variables: { query },
  });
};

export const createUser = (userData) => {
  return useMutation(mutations.CREATE_USER, {
    variables: { userData },
  });
};

export const loginUser = (userData) => {
  return useMutation(mutations.LOGIN_USER, {
    variables: { userData },
  });
};

export const saveBook = (bookData, token) => {
  return useMutation(mutations.SAVE_BOOK, {
    variables: { bookData },
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

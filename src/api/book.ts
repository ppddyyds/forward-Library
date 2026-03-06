import service from './axios';

export const getBooksApi = (keyword?: string) =>
  service.get('/books/search', {
    params: keyword ? { keyword } : undefined
  });

export const getBookDetailApi = (id: string | number) => service.get(`/books/${id}`);

export const borrowBookApi = (id: string | number) => service.post(`/books/${id}/borrow`);

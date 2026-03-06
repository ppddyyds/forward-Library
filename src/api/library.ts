import http from './http';
import type { Book, ChatRequest, ChatResponse, Recommendation } from '@/types';

export const getBooksApi = (keyword?: string) =>
  http.get<Book[]>('/books', {
    params: keyword ? { keyword } : undefined
  });

export const getRecommendationsApi = () =>
  http.get<Recommendation[]>('/books/recommendations/hot');

export const askAiApi = (payload: ChatRequest) =>
  http.post<ChatResponse>('/ai/ask', payload);

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userName: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  summary: string;
  score: number;
  cover?: string;
  publishDate?: string;
}

export interface Recommendation {
  id: number;
  title: string;
  reason: string;
  heat: number;
}

export interface ChatRequest {
  question: string;
}

export interface ChatResponse {
  answer: string;
}

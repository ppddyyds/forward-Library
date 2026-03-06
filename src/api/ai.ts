import service from './axios';

export const askAiApi = (question: string) =>
  service.post('/ai/ask', {
    question
  });

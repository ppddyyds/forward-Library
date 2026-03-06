import service from './axios';

export const getPersonalRecommendationApi = () => service.get('/recommendation/personal');

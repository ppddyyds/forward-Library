import service from './axios';

export const getUserProfileApi = () => service.get('/user/profile');

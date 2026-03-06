import service from './axios';

export interface UserProfileResponse {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  persona?: {
    readingTags?: string[];
    topCategories?: Array<{
      category: string;
      score: number;
      viewCount: number;
      searchCount: number;
      borrowCount: number;
    }>;
    personalityType?: string;
    personalityDescription?: string;
    totalBooksRead?: number;
    totalBorrows?: number;
    recentBooks?: Array<{
      bookId: number;
      title: string;
      author: string;
      category: string;
      readAt: string;
    }>;
    behaviorDistribution?: Record<string, number>;
  };
}

export const getUserProfileApi = () => service.get<UserProfileResponse>('/user/profile');

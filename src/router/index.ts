import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/store/user';

const routes = [
  { path: '/login', component: () => import('@/views/Login.vue'), meta: { public: true } },
  { path: '/register', component: () => import('@/views/Register.vue'), meta: { public: true } },
  {
    path: '/',
    component: () => import('@/layout/MainLayout.vue'),
    children: [
      { path: '', component: () => import('@/views/Home.vue') },
      { path: 'books', component: () => import('@/views/BookList.vue') },
      { path: 'book/:id', component: () => import('@/views/BookDetail.vue') },
      { path: 'recommend', component: () => import('@/views/Recommend.vue') },
      { path: 'profile', component: () => import('@/views/Profile.vue') },
      { path: 'ai', component: () => import('@/views/AiChat.vue') }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to) => {
  const userStore = useUserStore();
  if (to.meta.public) {
    return true;
  }
  if (!userStore.isLogin) {
    return '/login';
  }
  return true;
});

export default router;

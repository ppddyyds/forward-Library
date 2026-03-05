import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { public: true }
    },
    {
      path: '/',
      component: () => import('@/views/MainLayout.vue'),
      children: [
        {
          path: '',
          redirect: '/books'
        },
        {
          path: '/books',
          name: 'books',
          component: () => import('@/views/BookListView.vue')
        },
        {
          path: '/recommend',
          name: 'recommend',
          component: () => import('@/views/RecommendView.vue')
        },
        {
          path: '/ai',
          name: 'ai',
          component: () => import('@/views/AiQaView.vue')
        }
      ]
    }
  ]
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  if (to.meta.public) {
    return true;
  }

  if (!authStore.isLoggedIn) {
    return '/login';
  }

  return true;
});

export default router;

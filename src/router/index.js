import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/board/reg',
      name: 'boardRegister',
      component: () => import('../components/board/BoardRegister.vue'),
    },
    {
      path: '/board',
      name: 'boardList',
      component: () => import('../components/board/BoardList.vue'),
    },
  ],
})

export default router
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/board/reg',
      name: 'postCreate',
      component: () => import('../components/board/BoardRegister.vue'),
    },
  ],
})

export default router
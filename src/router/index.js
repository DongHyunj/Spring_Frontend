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
    {
      path: '/board/list/:idx',
      name: 'boardDetail',
      component: () => import('../components/board/BoardDetail.vue'),
    },
    {
      path: '/board/list/:idx/update',
      name: 'boardUpdate',
      component: () => import('../components/board/BoardUpdate.vue'),
    },
    {
      path: '/user/login',
      name: 'userLogin',
      component: () => import('../components/user/UserLogin.vue'),
    },
    {
      path: '/user/signup',
      name: 'userSignup',
      component: () => import('../components/user/UserSignup.vue'),
    },
    {
      path: '/verify',
      name: 'emailVerify',
      component: () => import('../components/user/EmailVerify.vue'),
    },
  ],
})

export default router
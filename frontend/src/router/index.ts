import { createRouter, createWebHistory } from 'vue-router'
import OnboardingView from '../views/OnboardingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'onboarding',
      component: OnboardingView,
    },
    {
      path: '/company-name',
      name: 'company-name',
      component: () => import('../views/CompanyNameView.vue'),
    },
    {
      path: '/product-name',
      name: 'product-name',
      component: () => import('../views/ProductNameView.vue'),
    },
    {
      path: '/purpose',
      name: 'purpose',
      component: () => import('../views/PurposeView.vue'),
    },
    {
      path: '/complete',
      name: 'complete',
      component: () => import('../views/CompleteView.vue'),
    },
  ],
})

export default router

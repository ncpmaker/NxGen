import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '@/views/LoginPage.vue'
import SignupPage from '@/views/SignupPage.vue'
import IntroductionPage from '@/views/IntroductionPage.vue'
import HomePage from '@/views/HomePage.vue'
import PostTestPage from '@/views/PostTestPage.vue'
import AdminPage from '@/views/AdminPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'login' }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupPage
    },
    {
      path: '/introduction',
      name: 'introduction',
      component: IntroductionPage
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage
    },
    {
      path: '/post-test',
      component: PostTestPage,
      children: [
        {
          path: '',
          redirect: { name: 'categories' }
        },
        {
          path: 'categories',
          name: 'categories',
          component: () => import('@/views/posttest/CategoriesPage.vue')
        },
        {
          path: ':id',
          name: 'case scenario',
          component: () => import('@/views/posttest/CaseScenarioPage.vue')
        },
        {
          path: 'evaluation/:id',
          name: 'evaluation',
          component: () => import('@/views/posttest/EvaluationPage.vue')
        }
      ]
    },
    {
      path: '/admin',
      component: AdminPage,
      children: [
        {
          path: '',
          redirect: { name: 'admin login' }
        },
        {
          path: 'login',
          name: 'admin login',
          component: () => import('@/views/admin/LoginPage.vue')
        },
        {
          path: 'dashboard',
          name: 'admin dashboard',
          component: () => import('@/views/admin/DashboardPage.vue')
        },
        {
          path: 'test-records',
          name: 'admin test records',
          component: () => import('@/views/admin/TestRecordsPage.vue')
        },
        {
          path: 'ncp',
          name: 'admin ncp',
          component: () => import('@/views/admin/NursingCarePlanPage.vue')
        },
        {
          path: 'case-scenarios/:category',
          name: 'admin case scenarios',
          component: () => import('@/views/admin/CasesPage.vue')
        },
        {
          path: 'case-scenarios/:category/create-case',
          name: 'admin create case',
          component: () => import('@/views/admin/EditCasePage.vue')
        },
        {
          path: 'case-scenarios/:category/edit-case/:id',
          name: 'admin edit case',
          component: () => import('@/views/admin/EditCasePage.vue')
        }
      ]
    }
  ]
})

export default router

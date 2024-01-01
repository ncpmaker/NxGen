import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

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
      path: '/home',
      redirect: { name: 'home', params: { userId: localStorage.getItem('ncp_user_id') } }
    },
    {
      path: '/admin/home',
      redirect: { name: 'admin dashboard' }
    },
    {
      path: '/login',
      name: 'login',
      meta: { auth: { isRequired: false } },
      component: LoginPage
    },
    {
      path: '/signup',
      name: 'signup',
      meta: { auth: { isRequired: false } },
      component: SignupPage
    },
    {
      path: '/introduction',
      name: 'introduction',
      meta: { auth: { isRequired: true, role: 'student' } },
      component: IntroductionPage
    },
    {
      path: '/home/:userId?',
      name: 'home',
      meta: { auth: { isRequired: true, role: 'student' } },
      component: HomePage,
      beforeEnter: (to) => {
        const userId = localStorage.getItem('ncp_user_id')

        if (to.params.userId !== userId) {
          return { name: 'home', params: { userId: userId }, replace: true }
        }
      }
    },
    {
      path: '/post-test',
      meta: { auth: { isRequired: true, role: 'student' } },
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
          path: ':category/:number/:id',
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

    //admin pages here
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
          meta: { auth: { isRequired: true, role: 'admin' } },
          component: () => import('@/views/admin/LoginPage.vue')
        },
        {
          path: 'home',
          name: 'admin home',
          meta: { auth: { isRequired: true, role: 'admin' } },
          component: () => import('@/views/admin/HomePage.vue'),
          children: [
            {
              path: 'dashboard',
              name: 'admin dashboard',
              meta: { auth: { isRequired: true, role: 'admin' } },
              component: () => import('@/views/admin/DashboardPage.vue')
            },
            {
              path: 'case-scenarios/:category',
              name: 'admin case scenarios',
              meta: { auth: { isRequired: true, role: 'admin' } },
              component: () => import('@/views/admin/CasesPage.vue')
            },
            {
              path: 'case-scenarios/:category/create-case',
              name: 'admin create case',
              meta: { auth: { isRequired: true, role: 'admin' } },
              component: () => import('@/views/admin/EditCasePage.vue')
            },
            {
              path: 'case-scenarios/:category/edit-case/:number/:id',
              name: 'admin edit case',
              meta: { auth: { isRequired: true, role: 'admin' } },
              component: () => import('@/views/admin/EditCasePage.vue')
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  const userId = localStorage.getItem('ncp_user_id')
  const isAuthenticated = await checkAuthentication()

  if (to.meta.auth.isRequired && to.meta.auth.role === 'student') {
    if (!isAuthenticated && to.path !== '/login') {
      return { name: 'login', replace: true }
    }
  } else {
    if (isAuthenticated) {
      return { name: 'home', params: { userId: userId }, replace: true }
    }
  }

  //create the admin route guard
})

async function checkAuthentication() {
  const userId = localStorage.getItem('ncp_user_id')
  const token = localStorage.getItem('ncp_token')

  const isAuthenticated = await axios
    .post(
      `http://localhost:3000/auth`,
      { userId: userId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((res) => {
      if (res.status === 200) {
        return true
      } else if (res.status === 401) {
        return false
      }
    })
    .catch((err) => console.log(err))

  return isAuthenticated
}

export default router

import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

import LoginPage from '@/views/student/LoginPage.vue'
import SignupPage from '@/views/student/SignupPage.vue'
import IntroductionPage from '@/views/student/IntroductionPage.vue'
import HomePage from '@/views/student/HomePage.vue'
import CaseScenarioPage from '@/views/student/CaseScenarioPage.vue'
import TestsPageVue from '@/views/student/TestsPage.vue'

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
      meta: { auth: { isRequired: false, role: 'student' } },
      component: LoginPage
    },
    {
      path: '/signup',
      name: 'signup',
      meta: { auth: { isRequired: false, role: 'student' } },
      component: SignupPage
    },
    {
      path: '/introduction',
      name: 'introduction',
      meta: { auth: { isRequired: true, role: 'student' } },
      component: IntroductionPage,
      beforeEnter: () => {
        const userId = localStorage.getItem('ncp_user_id')
        const finishedPreTest = JSON.parse(localStorage.getItem('ncp_finished_pre_test'))

        if (finishedPreTest) {
          return { name: 'home', params: { userId: userId }, replace: true }
        }
      }
    },
    {
      path: '/home/:userId?',
      name: 'home',
      meta: { auth: { isRequired: true, role: 'student' } },
      component: HomePage,
      beforeEnter: (to) => {
        const userId = localStorage.getItem('ncp_user_id')
        const finishedPreTest = JSON.parse(localStorage.getItem('ncp_finished_pre_test'))

        console.log(finishedPreTest)

        if (to.params.userId !== userId) {
          return { name: 'home', params: { userId: userId }, replace: true }
        }

        if (!finishedPreTest) {
          return { name: 'introduction' }
        }
      }
    },
    {
      path: '/post-test',
      name: 'post-test',
      meta: { auth: { isRequired: true, role: 'student' } },
      component: TestsPageVue,
      beforeEnter: () => {
        const userId = localStorage.getItem('ncp_user_id')
        const finishedPostTest = JSON.parse(localStorage.getItem('ncp_finished_post_test'))

        if (finishedPostTest) {
          return { name: 'home', params: { userId: userId }, replace: true }
        }
      }
    },
    {
      path: '/pre-test',
      name: 'pre-test',
      meta: { auth: { isRequired: true, role: 'student' } },
      component: TestsPageVue,
      beforeEnter: () => {
        const userId = localStorage.getItem('ncp_user_id')
        const finishedPreTest = JSON.parse(localStorage.getItem('ncp_finished_pre_test'))

        if (finishedPreTest) {
          return { name: 'home', params: { userId: userId }, replace: true }
        }
      }
    },
    {
      path: '/case-scenario',
      meta: { auth: { isRequired: true, role: 'student' } },
      component: CaseScenarioPage,
      children: [
        {
          path: ':category/:number/:id',
          name: 'case scenario',
          component: () => import('@/views/student/caseScenario/CaseScenarioPage.vue')
        },
        {
          path: 'evaluation/:id',
          name: 'evaluation',
          component: () => import('@/views/student/caseScenario/EvaluationPage.vue')
        }
      ]
    },

    //admin pages here
    {
      path: '/admin',
      children: [
        {
          path: '',
          redirect: { name: 'admin login' }
        },
        {
          path: 'login',
          name: 'admin login',
          meta: { auth: { isRequired: false, role: 'admin' } },
          component: () => import('@/views/admin/LoginPage.vue')
        },
        {
          path: 'home',
          name: 'admin home',
          meta: { auth: { isRequired: false, role: 'admin' } },
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
  if (to.meta.auth.role === 'student') {
    const userId = localStorage.getItem('ncp_user_id')
    const isAuth = await checkAuth('student')

    if (to.meta.auth.isRequired) {
      if (!isAuth && to.path !== '/login') {
        return { name: 'login', replace: true }
      }
    } else {
      if (isAuth) {
        return { name: 'home', params: { userId: userId }, replace: true }
      }
    }
  } else if (to.meta.auth.role === 'admin') {
    const isAuth = await checkAuth('admin')

    if (to.meta.auth.isRequired) {
      if (!isAuth && to.path !== '/admin/login') {
        return { name: 'admin login', replace: true }
      }
    } else {
      if (isAuth) {
        return { name: 'admin dashboard', replace: true }
      }
    }
  }

  //create the admin route guard
})

async function checkAuth(role) {
  let isAuthenticated = null

  if (role === 'student') {
    const userId = localStorage.getItem('ncp_user_id')
    const token = localStorage.getItem('ncp_token')

    isAuthenticated = await axios
      .post(
        `${import.meta.env.VITE_API_DOMAIN}/auth/student`,
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
  } else if (role === 'admin') {
    const token = localStorage.getItem('ncp_admin_token')

    isAuthenticated = await axios
      .post(`${import.meta.env.VITE_API_DOMAIN}/auth/admin`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.status === 200) {
          return true
        } else if (res.status === 401) {
          return false
        }
      })
      .catch((err) => console.log(err))
  }

  return isAuthenticated
}

export default router

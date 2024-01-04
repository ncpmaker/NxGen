import { createRouter, createWebHistory } from 'vue-router'
import { goToPostTestStore } from '@/store'
import axios from 'axios'

import LoginPage from '@/views/student/LoginPage.vue'
import SignupPage from '@/views/student/SignupPage.vue'
import IntroductionPage from '@/views/student/IntroductionPage.vue'
import HomePage from '@/views/student/HomePage.vue'
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

        if (to.params.userId !== userId) {
          return { name: 'home', params: { userId: userId }, replace: true }
        }

        if (!finishedPreTest) {
          return { name: 'introduction' }
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
        } else {
          localStorage.setItem('ncp_pre_test_session', true)
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
        const onPostTest = JSON.parse(localStorage.getItem('ncp_post_test_session'))

        if ((finishedPostTest || !goToPostTestStore.value) && !onPostTest) {
          return { name: 'home', params: { userId: userId }, replace: true }
        } else {
          localStorage.setItem('ncp_post_test_session', true)
        }
      }
    },
    {
      path: '/case-scenario',
      meta: { auth: { isRequired: true, role: 'student' } },
      children: [
        {
          path: ':category/:number/:id',
          name: 'case scenario',
          component: () => import('@/views/student/caseScenario/CaseScenarioPage.vue'),
          beforeEnter: () => {
            localStorage.setItem('ncp_case_scenario_session', true)
          }
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
    const onPreTest = JSON.parse(localStorage.getItem('ncp_pre_test_session'))
    const onPostTest = JSON.parse(localStorage.getItem('ncp_post_test_session'))
    const onCaseScenario = JSON.parse(localStorage.getItem('ncp_case_scenario_session'))
    const csCategory = localStorage.getItem('ncp_case_scenario_category')
    const csNumber = parseInt(localStorage.getItem('ncp_case_scenario_number'))
    const csId = localStorage.getItem('ncp_case_scenario_id')

    if (to.meta.auth.isRequired) {
      if (!isAuth && to.name !== 'login') {
        return { name: 'login', replace: true }
      }

      if (onPreTest && to.name !== 'pre-test') {
        return { name: 'pre-test', replace: true }
      }

      if (onPostTest && to.name !== 'post-test') {
        return { name: 'post-test', replace: true }
      }

      if (onCaseScenario && to.name !== 'case scenario') {
        return { name: 'case scenario', params: { number: csNumber, id: csId, category: csCategory }, replace: true }
      }
    } else {
      if (isAuth) {
        return { name: 'home', params: { userId: userId }, replace: true }
      }
    }
  } else if (to.meta.auth.role === 'admin') {
    const isAuth = await checkAuth('admin')

    if (to.meta.auth.isRequired) {
      if (!isAuth && to.name !== 'admin login') {
        return { name: 'admin login', replace: true }
      }
    } else {
      if (isAuth) {
        return { name: 'admin dashboard', replace: true }
      }
    }
  }
})

async function checkAuth(role) {
  let isAuthenticated = null
  const userId = localStorage.getItem('ncp_user_id')
  const token = localStorage.getItem(`${role === 'student' ? 'ncp_token' : role === 'admin' ? 'ncp_admin_token' : ''}`)

  isAuthenticated = await axios
    .post(
      `${import.meta.env.VITE_API_DOMAIN}/auth/${role === 'student' ? 'student' : role === 'admin' ? 'admin' : ''}`,
      { ...(role === 'student' ? { userId: userId } : role === 'admin' ? {} : {}) },
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

import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from './components/general/HomePage'
import NotFoundPage from './components/general/NotFoundPage.vue'
import TermsOfServicePage from './components/general/TermsOfServicePage.vue'

import UserActivatePage from './components/users/UserActivatePage.vue'
import UserLoginPage from './components/users/UserLoginPage.vue'
import UserPasswordResetPage from './components/users/UserPasswordResetPage.vue'
import UserPasswordNewPage from './components/users/UserPasswordNewPage.vue'

import OnboardingPage from './components/onboarding/OnboardingPage.vue'

import ProfilePage from './components/profile/ProfilePage.vue'

import TodayPage from './components/today/TodayPage.vue'
import DashboardPage from './components/dashboard/DashboardPage.vue'

import ProjectsPage from './components/projects/ProjectsPage.vue'
import ProjectContainer from './components/projects/ProjectContainer.vue'
import ProjectShowPage from './components/projects/ProjectShowPage.vue'
import ProjectEditPage from './components/projects/ProjectEditPage.vue'

import TasksPage from './components/tasks/TasksPage.vue'

import DesignIndexPage from './components/design/DesignIndexPage.vue'
import DesignGridPage from './components/design/DesignGridPage.vue'
import DesignTypographyPage from './components/design/DesignTypographyPage.vue'
import DesignColorsPage from './components/design/DesignColorsPage.vue'
import DesignVisualsPage from './components/design/DesignVisualsPage.vue'
import DesignComponentsPage from './components/design/DesignComponentsPage.vue'
import DesignWordingPage from './components/design/DesignWordingPage.vue'
import DesignLogoPage from './components/design/DesignLogoPage.vue'

import auth from './auth'
import i18n from './locales'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: HomePage, meta: { restrictForUnauth: true, iTitle: 'general.homePage.browserTitle' } },
  { path: '/terms-of-service', component: TermsOfServicePage, meta: { iTitle: 'general.termsOfServicePage.title' } },

  { path: '/login', component: UserLoginPage, meta: { restrictForUnauth: true, iTitle: 'users.loginPage.title' } },
  { path: '/password/reset', component: UserPasswordResetPage, meta: { restrictForUnauth: true, iTitle: 'users.passwordResetPage.title' } },
  { path: '/password/:token/new', component: UserPasswordNewPage, meta: { restrictForUnauth: true, iTitle: 'users.passwordNewPage.title' } },
  { path: '/users/:token/activate', component: UserActivatePage, meta: { iTitle: 'users.activatePage.title' } },

  { path: '/onboarding', redirect: '/onboarding/1', meta: { restrictForAuth: true } },
  { path: '/onboarding/:step',
    component: OnboardingPage,
    meta: { restrictForAuth: true, iTitle: 'onboarding.page.title' },
  },

  { path: '/profile', component: ProfilePage, meta: { restrictForAuth: true, iTitle: 'layouts.profile.title' } },

  { path: '/today', component: TodayPage, meta: { restrictForAuth: true, iTitle: 'today.page.title' } },
  { path: '/dashboard', component: DashboardPage, meta: { restrictForAuth: true, iTitle: 'dashboard.page.title' } },

  // We keep this route for historical purposes
  { path: '/tasks', component: TasksPage, name: 'tasks', meta: { restrictForAuth: true, iTitle: 'tasks.page.title' } },
  { path: '/tasks/backlog', redirect: '/tasks', meta: { restrictForAuth: true } },

  { path: '/projects', component: ProjectsPage, meta: { iTitle: 'projects.header.title' } },
  // We keep this route for historical purposes
  { path: '/projects/inbox', redirect: '/projects', meta: { restrictForAuth: true } },
  { path: '/projects/:projectSlug',
    component: ProjectContainer,
    children: [
      { path: '', component: ProjectShowPage, name: 'project/show', meta: { restrictForAuth: true, iTitle: 'projects.header.title' } },
      { path: 'edit', component: ProjectEditPage, name: 'project/edit', meta: { restrictForAuth: true, iTitle: 'projects.header.title' } },
    ],
    props: true,
  },

  { path: '/design', component: DesignIndexPage, meta: { title: 'Lessy Design Guide' } },
  { path: '/design/grid', component: DesignGridPage, meta: { title: 'Grid · Lessy Design Guide' } },
  { path: '/design/typography', component: DesignTypographyPage, meta: { title: 'Typography · Lessy Design Guide' } },
  { path: '/design/colors', component: DesignColorsPage, meta: { title: 'Colors · Lessy Design Guide' } },
  { path: '/design/visuals', component: DesignVisualsPage, meta: { title: 'Visuals · Lessy Design Guide' } },
  { path: '/design/components', component: DesignComponentsPage, meta: { title: 'Components · Lessy Design Guide' } },
  { path: '/design/wording', component: DesignWordingPage, meta: { title: 'Wording · Lessy Design Guide' } },
  { path: '/design/logo', component: DesignLogoPage, meta: { title: 'Logo · Lessy Design Guide' } },

  { path: '*', component: NotFoundPage, meta: { iTitle: 'general.notFoundPage.title' } },
]

let router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

function isRestrictedForAuth (route) {
  return route.matched.some(record => record.meta.restrictForAuth)
}

function isRestrictedForUnauth (route) {
  return route.matched.some(record => record.meta.restrictForUnauth)
}

router.beforeEach((to, from, next) => {
  const { iTitle, title } = to.meta
  const docTitle = iTitle ? i18n.t(iTitle) : title
  document.title = docTitle ? docTitle + ' · Lessy' : 'Lessy'
  if (isRestrictedForAuth(to) && !auth.isLoggedIn()) {
    next({ path: '/' })
  } else if (isRestrictedForUnauth(to) && auth.isLoggedIn()) {
    next({ path: '/today' })
  } else {
    next()
  }
})

export default router
export {
  isRestrictedForAuth,
  isRestrictedForUnauth,
}

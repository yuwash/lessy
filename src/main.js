import Vue from 'vue'

import LyBadge from './components/Ly/LyBadge.vue'
import LyButton from './components/Ly/LyButton.vue'
import LyCard from './components/Ly/LyCard.vue'
import LyCardDeck from './components/Ly/LyCardDeck.vue'
import { LyColumns, LyColumn } from './components/Ly/LyColumns.vue'
import { LyForm, LyFormGroup, LyFormInput, LyFormSelect, LyFormTextarea } from './components/Ly/LyForm.vue'
import LyIcon from './components/Ly/LyIcon.vue'
import { LyList, LyListGroup, LyListItem, LyListItemAdapt } from './components/Ly/LyList.vue'
import LyModal from './components/Ly/LyModal.vue'
import { LyPopover, LyPopoverItem, LyPopoverSeparator } from './components/Ly/LyPopover.vue'
import LySection from './components/Ly/LySection.vue'
import LyTextContainer from './components/Ly/LyTextContainer.vue'

import App from './components/App/App.vue'
import AppHeader from './components/App/AppHeader.vue'
import AppLayout from './components/App/AppLayout.vue'
import AppLogo from './components/App/AppLogo.vue'
import AppPage from './components/App/AppPage.vue'
import AppMenu from './components/App/AppMenu.vue'
import AppMenuLink from './components/App/AppMenuLink.vue'

import LayoutApplication from './components/layouts/LayoutApplication.vue'
import LayoutDefault from './components/layouts/LayoutDefault.vue'
import LayoutDesign from './components/layouts/LayoutDesign.vue'
import LayoutEmpty from './components/layouts/LayoutEmpty.vue'
import LayoutProfile from './components/layouts/LayoutProfile.vue'
import LayoutSingleForm from './components/layouts/LayoutSingleForm.vue'

import LoadingPage from './components/general/LoadingPage.vue'

import i18n from './locales/index.js'
import router from './router.js'
import store from './store/index.js'

import VTooltip from 'v-tooltip'

Vue.use(VTooltip)

// register global components
Vue.component('app-header', AppHeader)
Vue.component('app-layout', AppLayout)
Vue.component('app-logo', AppLogo)
Vue.component('app-page', AppPage)
Vue.component('app-menu', AppMenu)
Vue.component('app-menu-link', AppMenuLink)

Vue.component('layout-application', LayoutApplication)
Vue.component('layout-default', LayoutDefault)
Vue.component('layout-design', LayoutDesign)
Vue.component('layout-empty', LayoutEmpty)
Vue.component('layout-profile', LayoutProfile)
Vue.component('layout-single-form', LayoutSingleForm)

Vue.component('loading-page', LoadingPage)

Vue.component('ly-badge', LyBadge)
Vue.component('ly-button', LyButton)
Vue.component('ly-card', LyCard)
Vue.component('ly-card-deck', LyCardDeck)
Vue.component('ly-columns', LyColumns)
Vue.component('ly-column', LyColumn)
Vue.component('ly-form', LyForm)
Vue.component('ly-form-group', LyFormGroup)
Vue.component('ly-form-input', LyFormInput)
Vue.component('ly-form-select', LyFormSelect)
Vue.component('ly-form-textarea', LyFormTextarea)
Vue.component('ly-icon', LyIcon)
Vue.component('ly-list', LyList)
Vue.component('ly-list-group', LyListGroup)
Vue.component('ly-list-item', LyListItem)
Vue.component('ly-list-item-adapt', LyListItemAdapt)
Vue.component('ly-modal', LyModal)
Vue.component('ly-popover', LyPopover)
Vue.component('ly-popover-item', LyPopoverItem)
Vue.component('ly-popover-separator', LyPopoverSeparator)
Vue.component('ly-section', LySection)
Vue.component('ly-text-container', LyTextContainer)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store,
  i18n,
})
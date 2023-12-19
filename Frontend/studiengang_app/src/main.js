import { createApp } from 'vue'
import App from './App.vue'

// Fremdcode -> Vue JS 3 für Einsteiger #10 Routing mit dem Vue-Router (https://youtu.be/o62BwRSaEHo)
import { createRouter, createWebHashHistory } from 'vue-router'

import Home from "./components/Home.vue"
import History from "./components/History.vue"
import Settings from "./components/Settings.vue"
// ---------------------------------------------------------------------------------------------------


// Vuetify
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
})


// Fremdcode -> Vue JS 3 für Einsteiger #10 Routing mit dem Vue-Router (https://youtu.be/o62BwRSaEHo)
const app = createApp(App).use(vuetify)

createApp(App)

const routes = [
  { path: "/", component: Home },
  { path: "/history", component: History },
  { path: "/settings", component: Settings }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  linkActiveClass: "active"
})

app.use(router)
// ---------------------------------------------------------------------------------------------------

app.mount('#app')
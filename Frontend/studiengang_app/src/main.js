import { createApp } from 'vue'
import App from './App.vue'
import { createAuth0 } from '@auth0/auth0-vue';

// Fremdcode -> Vue JS 3 für Einsteiger #10 Routing mit dem Vue-Router (https://youtu.be/o62BwRSaEHo)
import { createRouter, createWebHashHistory } from 'vue-router'

import Home from "./components/Home.vue"
import Favorites from "./components/Favorites.vue"
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
  { path: "/favorites", component: Favorites },
  { path: "/settings", component: Settings },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  linkActiveClass: "active"
})

app.use(router)
app.use(
  createAuth0({
    domain: "dev-7a5o048ysc5rzbjx.eu.auth0.com",
    clientId: "MhZhqogZT75RNzsgFD1AC3gFJXj22xrM",
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  })
);
// ---------------------------------------------------------------------------------------------------

app.mount('#app')
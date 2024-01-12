<template>
  <header>
    <h3 class="headline_1">Personal</h3>
    <h1 class="headline_2">Settings</h1>
    <!-- <img src=> TODO Logo-->
  </header>
  <div v-if="this.$auth0.isAuthenticated" class="container_pages">
    <PersonalData @dataChanged="changeData" :data=daten[0]></PersonalData>
    <Logout></Logout>
    <Login v-if="!this.$auth0.isAuthenticated"></Login>
  </div>
  <div>
    <Login></Login>
  </div>
</template>

<script>
import PersonalData from "./PersonalData.vue"
import Login from "./Login.vue"
import Logout from "./Logout.vue"
import axios from "axios"

export default {
  name: "Settings",
  props: {
    msg: String
  },
  data: function () {
    return {
      daten: [],
    };
  },
  components: {
    PersonalData,
    Login,
    Logout
  },
  methods: {
    changeData: function (e) {
      axios
        .put("http://localhost:8080/data/0", {
          name: e.name,
          bundesland: e.bundesland,
          nc: e.nc
        })
        .then(response => {
          console.log('Server response:', response.data);
        })
        .catch(error => {
          console.error('Error updating data:', error);
         });
    }
  },
  created() {
    // Überprüfe den Authentifizierungsstatus und setze isAuthenticated
    this.isAuthenticated = this.$auth0.isAuthenticated;
  },

  mounted() {
    axios
      .get("http://localhost:8080/data/").then(response => {
        this.daten = response.data;
      });
  }
}
</script>

<template>
    <div>
        <v-btn @click="login"> Log in </v-btn>
    </div>
  </template>
  
  <script>
    export default {
      methods: {
        login() {
          this.$auth0.loginWithRedirect();
          console.log("login")
        },
      }
    };
  </script>
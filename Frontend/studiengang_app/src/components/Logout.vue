<template>
    <div>
      <button @click="logout">Log out</button>
    </div>
  </template>
  
  <script>
    export default {
      methods: {
        logout() {
          this.$auth0.logout({ logoutParams: { returnTo: "http://localhost:5173/#/settings" } });
          console.log("logout");
        }
      }
    };
  </script>
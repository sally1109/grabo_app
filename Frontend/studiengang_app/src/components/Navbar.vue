<template>
  <div class="navbar">
    <div class="nav_buttons">
      <v-btn icon="mdi-home" size="x-large" flat>
        <router-link to="/">          
          <v-icon size="39" class="ma-n1">mdi-home</v-icon>
        </router-link>
      </v-btn>
      <div id="gap">
        <v-btn icon="history" size="x-large" flat>
          <router-link to="/favorites">            
            <v-icon size="39" class="ma-n1">mdi-star-outline</v-icon>
          </router-link>
        </v-btn>
      </div>
      <v-btn icon="account" size="x-large" flat>
        <router-link to="/settings">          
          <v-icon size="39" class="ma-n1">mdi-account</v-icon>
        </router-link>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    msg: String
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  width: 100%;
  bottom: 0;
  right: 1.5px;
  margin: 0;
  padding: 31px 0px 40px;
  font-size: 28px;
  background-color: #fefcfa;
}

.navbar .nav_buttons {
  display: flex;
  align-items: center;
}

.navbar .nav_buttons a {
  cursor: pointer;
  text-decoration: none;
  border-radius: 100px;
  padding: 16.5px;
  background: #fefcfa;
  color: #b5aba3;
}

#gap {
  padding-left: 30px;
  padding-right: 30px;
}

.active {
  color: #F74E15 !important;
  background: rgb(255, 255, 255) !important;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.2);
}</style>

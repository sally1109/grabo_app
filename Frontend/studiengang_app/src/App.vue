<template>
  <div>
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  }
}

</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

#app {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  color: #202020;
  background-color: #fefcfa;
  padding: 35px 28px 0 28px;
}

/* Styling Header --------------------------------------------------- */
header {
  position: fixed;
  z-index: 2;
  width: 100vw;
  left: 0;
  top: 0;
  background-color: #fefcfa;
}

.headline_1 {
  font-size: 21px;
  color: #AFB0B8;
  font-weight: 500;
  margin: 50px 0 0px 44px;
}

.headline_2 {
  font-size: 38px;
  font-weight: 500;
  margin: 50px 0px 20px 28px;
}

img {
  position: fixed;
  right: 0;
  top: 52px;
  height: 50px;
  margin-right: 47px;
}

/* Styling Container für Home, History und Settings ----------------- */
.container_pages {
  margin-top: 112px;
  margin-bottom: 17.2vh;
  min-height: 500px
}

/* Styling Container auf den jeweiligen Seiten ---------------------- */
.container {
  background-color: white;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 13px;
  margin-bottom: 28px;
}

/* Styling Buttons -------------------------------------------------- */
.btn {
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  border: none;
  font-size: 17.5px;
  color: white;
  background-color: #F74E15;
  margin: 0;
}

.btn:active {
  background-color: #ED8A68;
}
</style>

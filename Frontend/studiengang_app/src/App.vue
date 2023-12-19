<template>
  <div>
    <Navbar></Navbar>
    <router-view></router-view> <!--  Fremdcode -> Vue JS 3 für Einsteiger #10 Routing mit dem Vue-Router (https://youtu.be/o62BwRSaEHo) -->
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
  background-color: #FAFCFE;
  padding: 35px 28px 0 28px;
}

/* Styling Header --------------------------------------------------- */
header {
  position: fixed;
  z-index: 2;
  width: 100vw;
  height: 138px;
  left: 0;
  top: 0;
  background-color: #FAFCFE;
}

.headline_1 {
  font-size: 21px;
  color: #AFB0B8;
  font-weight: 500;
  margin: 35px 0 -5px 44px;
}

.headline_2 {
  font-size: 38px;
  font-weight: 500;
  margin-left: 43px;
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
  background-color: #6D60FF;
  margin: 0;
}

.btn:active {
  background-color: #7c70fc;
}
</style>

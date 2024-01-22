<template>
  <header>
    <h1 class="headline_2">Favoriten</h1>
    <img src="https://cdn.discordapp.com/attachments/1186652965105303582/1198972537053392979/StudiFinder_Logo_Orange.png?ex=65c0d930&is=65ae6430&hm=0e6e4cbe9dd420ff1fefb13ab53065c5f7c8c2b06a3ce5fa7ee397f432ffb008&">
  </header>
  <div class="container_pages">
    <ListFavorites v-for="(singleEntry, index) of listOfEntries.slice().reverse()" :key="index" :entry="singleEntry"
      :index="listOfEntries.length - index - 1" @favoritesRemoved="removeFavorites" @openInfo="openInfo">
    </ListFavorites>
    <DetailsCourse v-model="dialogVisible" :selectedCourse="definedCourse" @closeDialog="closeDialog"/>
  </div>
</template>

<script>

import ListFavorites from "./ListFavorites.vue";
import DetailsCourse from "./DetailsCourse.vue"
import axios from "axios";

export default {
  name: "Favorites",
  props: {
    msg: String
  },
  components: {
    ListFavorites,
    DetailsCourse
  },
  data: function () {
    return {
      listOfEntries: [],
      dialogVisible: false,
      definedCourse: [],
    };
  },
  methods: {
    removeFavorites: function (e) {
      axios
        .delete("http://localhost:8080/favorites/" + e.index)
        .then(response => {
          this.listOfEntries = response.data;
        });
    },
    openInfo(e) {
        this.dialogVisible = true;
        this.definedCourse = e.data;
    },
    closeDialog(){
      this.dialogVisible = false;
    },
  },
  mounted() {
    axios
      .get("http://localhost:8080/favorites").then(response => {
        this.listOfEntries = response.data;
      });
  }
}
</script>


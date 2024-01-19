<template>
  <header>
    <h1 class="headline_2">Favoriten</h1>
    <!-- <img src=> TODO Logo-->
  </header>
  <div class="container_pages">
    <ListFavorites v-for="(singleEntry, index) of listOfEntries.slice().reverse()" :key="index" :entry="singleEntry"
      :index="listOfEntries.length - index - 1" @favoritesRemoved="removeFavorites">
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
      listOfEntries: []
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
  },
  mounted() {
    axios
      .get("http://localhost:8080/favorites").then(response => {
        this.listOfEntries = response.data;
      });
  }
}
</script>


<template>
  <header>
    <h3 class="headline_1">Saved</h3>
    <h1 class="headline_2">Favorites</h1>
    <img src="https://cdn.discordapp.com/attachments/1057666656320618587/1063508132757778512/waage_9.png">
  </header>
  <div class="container_pages">
    <ListFavorites v-for="(singleEntry, index) of listOfEntries.slice().reverse()" :key="index" :entry="singleEntry"
      :index="listOfEntries.length - index - 1" @favoritesRemoved="removeFavorites">
    </ListFavorites>
  </div>
</template>

<script>

import ListFavorites from "./ListFavorites.vue";
import axios from "axios";

export default {
  name: "Favorites",
  props: {
    msg: String
  },
  components: {
    ListFavorites
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
    }
  },
  mounted() {
    axios
      .get("http://localhost:8080/favorites").then(response => {
        this.listOfEntries = response.data;
      });
  }
}
</script>


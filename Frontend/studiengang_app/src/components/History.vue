<template>
  <header>
    <h3 class="headline_1">Weight</h3>
    <h1 class="headline_2">History</h1>
    <img src="https://cdn.discordapp.com/attachments/1057666656320618587/1063508132757778512/waage_9.png">
  </header>
  <div class="container_pages">
    <ListWeight v-for="(singleEntry, index) of listOfEntries.slice().reverse()" :key="index" :entry="singleEntry"
      :index="listOfEntries.length - index - 1" @weightRemoved="removeWeight" @weightEdited="editWeight">
    </ListWeight>
  </div>
</template>

<script>

import ListWeight from "./ListWeight.vue";
import axios from "axios";

export default {
  name: "History",
  props: {
    msg: String
  },
  components: {
    ListWeight
  },
  data: function () {
    return {
      listOfEntries: []
    };
  },
  methods: {
    editWeight: function (e) {
      axios
        .put("http://localhost:8080/weight/" + e.index, {
          weight: e.weight
        })
        .then(response => {
          this.listOfEntries = response.data;
        });
    },
    removeWeight: function (e) {
      axios
        .delete("http://localhost:8080/weight/" + e.index)
        .then(response => {
          this.listOfEntries = response.data;
        });
    }
  },
  mounted() {
    axios
      .get("http://localhost:8080/weight/").then(response => {
        this.listOfEntries = response.data;
      });
  }
}
</script>


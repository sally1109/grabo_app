<template>
  <header>
    <h3 class="headline_1">Personal</h3>
    <h1 class="headline_2">Settings</h1>
    <img src="https://cdn.discordapp.com/attachments/1057666656320618587/1063508132757778512/waage_9.png">
  </header>
  <div class="container_pages">
    <PersonalData @dataChanged="changeData" :data=daten[0]></PersonalData>
  </div>
</template>

<script>
import PersonalData from "./PersonalData.vue"
import axios from "axios"

export default {
  name: "Settings",
  props: {
    msg: String
  },
  data: function () {
    return {
      daten: [],
      weightData: []
    };
  },
  components: {
    PersonalData,
  },
  methods: {
    changeData: function (e) {
      axios
        .put("http://localhost:8080/data/0", {
          name: e.name,
          height: e.height,
          age: e.age
        })
    }
  },
  mounted() {
    axios
      .get("http://localhost:8080/data/").then(response => {
        this.daten = response.data;
      });
  }
}
</script>

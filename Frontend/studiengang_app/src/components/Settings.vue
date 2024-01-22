<template>
  <header>
    <h1 class="headline_2">Einstellungen</h1>
    <img src="https://cdn.discordapp.com/attachments/1186652965105303582/1198972537053392979/StudiFinder_Logo_Orange.png?ex=65c0d930&is=65ae6430&hm=0e6e4cbe9dd420ff1fefb13ab53065c5f7c8c2b06a3ce5fa7ee397f432ffb008&">
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
    PersonalData
  },
  methods: {
    changeData: function (e) {
      axios
        .put("http://localhost:8080/data/0", {
          name: e.name,
          bundesland: e.bundesland,
          nc: e.nc
        })
        .then(response => {
          console.log('Server response:', response.data);
        })
        .catch(error => {
          console.error('Error updating data:', error);
         });
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

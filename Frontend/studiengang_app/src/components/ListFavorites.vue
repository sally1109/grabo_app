<template>
  <v-card class="container" id="ListFavorites">
    <div id="div_name">
      <v-card-title @click="openInfo(entry)"> {{ entry.data.data.studiBezeichnung }} </v-card-title>
      <v-btn class="btn" id="btn_remove" density="comfortable" variant="text" icon="mdi-close"
        @click="removeFavorite"></v-btn>
    </div>
    <div id="div_ort" @click="openInfo(entry)">
      <v-icon icon="mdi-map-marker" size="small"></v-icon>
      <v-card-subtitle> {{ entry.data.data.studienort.postleitzahl }} {{ entry.data.data.studienort.ort }}
      </v-card-subtitle>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "ListFavorites",
  props: ["entry", "index"],
  methods: {
    removeFavorite: function () {
      this.$emit("favoritesRemoved", {
        index: this.index
      });
    },
    openInfo: function (course) {
      this.$emit("openInfo", {
        data: course.data
      })
    },
  }
}
</script>


<style scoped>
#ListFavorites {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px 15px 10px 15px;
  border-radius: 13px;
}

#div_name {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

#div_ort {
  display: flex;
  flex-direction: row;
  align-items: left;
  width: 100%;
}

.v-card-title {
  padding: 0px;
  max-width: 265px;
  font-size: medium;
}

.v-card-subtitle {
  padding-left: 5px;
}
</style>
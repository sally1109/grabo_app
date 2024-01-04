<template>
  <div class="container" id="ListWeight">
    <span v-if= "entry && entry.name" id="span_name"> {{ entry.name }}</span>
    <v-icon icon="mdi-map-marker"></v-icon>
    <span v-if= "entry && entry.ort" id="span_ort"> {{ entry.ort }} </span>
    <v-btn class="btn" id="btn_remove" density="comfortable" variant="text" icon="mdi-close" @click="removeFavorite"></v-btn>
  </div>
  <!-- <v-card id="ListWeight">
    <div>
      <v-card-text id="span_name"> {{ entry.name }} </v-card-text>
      <v-icon icon="mdi-map-marker"></v-icon>
      <v-card-text id="span_ort"> {{ entry.ort }} </v-card-text>
    </div>
      <v-card-action>
        <v-btn class="btn" id="btn_remove" density="comfortable" variant="text" icon="mdi-close" @click="removeFavorite"></v-btn>
      </v-card-action>
  </v-card> -->
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
    }
  }
}
</script>


<style scoped>
div {
  display: flex;
}

#ListWeight {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 21.3px;
  padding-left: 20px;
}

span {
  margin: 0px 5px;
}

#span_ort {
  font-style: italic;
  font-size: small;
  width: 100px;
}

#span_name {
  width: 200px;
}

#btn_remove {
  border-radius: 0 13px 13px 0;
  align-items: right;
}
</style>
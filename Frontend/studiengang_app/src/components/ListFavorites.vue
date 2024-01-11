<template>
  <div class="container" id="ListFavorites">
    <span v-if= "entry && entry.name" id="span_name"> {{ entry.name }}</span>
    <v-icon icon="mdi-map-marker" size="small" ></v-icon>
    <span v-if= "entry && entry.ort" id="span_ort"> {{ entry.ort }} </span>
    <v-btn class="btn" id="btn_remove" density="comfortable" variant="text" icon="mdi-close" @click="removeFavorite"></v-btn>
  </div>
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

#ListFavorites {
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
  font-size: small;
}

#btn_remove {
  border-radius: 0 13px 13px 0;
  align-items: right;
}
</style>
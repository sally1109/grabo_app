<template>
  <div class="container" id="ListWeight">
    <v-text-field v-model="favorite.name" class="mt-n6" variant="underlined"></v-text-field>
    <span>{{ favorite.ort }}</span>
    <button class="btn" id="btn_remove" @click="removeFavorite">Remove</button>
  </div>
</template>

<script>
export default {
  name: "ListFavorites",
  props: ["favorite", "index"],
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
  flex-direction: row;
  align-items: center;
  margin-bottom: 21.3px;
  padding-left: 20px;
}

span {
  font-style: italic;
  margin-right: 32px;
}

#btn_remove {
  border-radius: 0 13px 13px 0;
  padding: 12px 17px;
}
</style>
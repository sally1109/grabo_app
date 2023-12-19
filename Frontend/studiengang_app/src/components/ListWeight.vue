<template>
  <div class="container" id="ListWeight">
    <v-text-field v-model="entry.weight" @focusout="editWeight" class="mt-n6" variant="underlined" suffix="kg">
    </v-text-field>
    <span>{{ entry.date }}</span>
    <button class="btn" id="btn_remove" @click="removeWeight">Remove</button>
  </div>
</template>

<script>
export default {
  name: "ListWeight",
  props: ["entry", "index"],
  methods: {
    removeWeight: function () {
      this.$emit("weightRemoved", {
        index: this.index
      });
    },
    editWeight: function () {
      this.$emit("weightEdited", {
        index: this.index,
        weight: this.entry.weight
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
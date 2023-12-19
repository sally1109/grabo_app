<template>
  <div class="container" id="add_weight">
    <h4>Add weight</h4>
    <v-text-field class="mt-1" v-model="weight" variant="underlined" suffix="kg"></v-text-field>
    <button class="btn" id="btn_add" @click="addWeight">Add</button>
  </div>
</template>

<script>
export default {
  name: "AddWeight",
  data: function () {
    return {
      weight: 0,
      date: "",
      disable: false
    };
  },
  methods: {
    addWeight: function () {
      if (this.weight.length > 0) {
        var date = new Date(Date.now()).toLocaleDateString("en-GB")
        this.$emit("weightAdded", {
          weight: this.weight,
          date: date
        });
        this.weight = 0;
        this.date = "";
      }
    }
  }
};
</script>

<style scoped>
div {
  display: flex;
}

#add_weight {
  align-items: center;
  padding-left: 20px;
}

h4 {
  position: absolute;
  font-size: 19px;
  font-weight: 600;
  margin-bottom: 32px;
}

#btn_add {
  border-radius: 0 13px 13px 0;
  padding: 24px 30px;
}
</style>
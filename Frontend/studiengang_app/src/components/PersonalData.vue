<template>
  <div class="container" id="welcome">
    <h4>Willkomen zurück</h4>
    <h2> {{ data.name }} </h2>
  </div>
  <div class="container">
    <h4 id="headline_data">Personal Data</h4>
    <v-text-field id="input" label="Name" v-model="data.name" variant="underlined"></v-text-field>
    <v-autocomplete label="Bundesland" :items="items" :menu-props="{ maxHeight: 200 }" v-model="data.bundesland" variant="underlined"></v-autocomplete>
    <v-text-field id="input" label="NC (numerus clausus)" v-model="data.nc" variant="underlined"></v-text-field>
    <button class="btn" id="btn_change" @click="changeData">Change</button>
  </div>
</template>

<script>
export default {
  name: "Data",
  props: {
    data: {
      type: Object,
      required: true,
      default: {},
    }
  },
  data: ()=> ({
    items: [{ title: 'Baden-Württemberg', value: 'BW' },
            { title: 'Bayern', value: 'BY' },
            { title: 'Berlin', value: 'BE' },
            { title: 'Brandenburg', value: 'BB' },
            { title: 'Hamburg', value: 'BY' },
            { title: 'Hessen', value: 'BY' },
            { title: 'Mecklenburg-Vorpommern', value: 'BY' },
            { title: 'Niedersachsen', value: 'BY' },
            { title: 'Nordrhein-Westfalen', value: 'BY' },
            { title: 'Rheinland-Pfalz', value: 'BY' },
            { title: 'Saarland', value: 'SL' },
            { title: 'Sachsen', value: 'SN' },
            { title: 'Sachsen-Anhalt', value: 'ST' },
            { title: 'Schleswig-Holstein', value: 'SH' },
            { title: 'Thüringen', value: 'TH' },
            { title: 'Österreich', value: 'iA' }]
  }),
  methods: {
    changeData: function () {
      this.$emit("dataChanged", {
        name: this.data.name,
        bundesland: this.data.bundesland,
        nc: this.data.nc
      });
    },
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 21px;
}

#welcome {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
}

h4 {
  font-size: 20px;
  font-weight: 600;
}

h2 {
  font-size: 30px;
  font-weight: 500;
  color: #F74E15;
  margin-bottom: -2px;
}

span {
  font-style: italic;
  color: #A3A5B5;
}

#headline_data {
  margin-bottom: 25px;
}

#btn_change {
  border-radius: 13px;
  margin: 8px -2.5px 0 -2.5px;
  padding: 12px 15px;
}
</style>

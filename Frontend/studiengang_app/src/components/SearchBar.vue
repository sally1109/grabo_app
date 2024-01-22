
<template>
  <div class="container" id="SearchBar">
    <!-- Suchleiste -->
    <v-text-field id="Search" v-model="searchWord" variant="underlined" label="Suche einen Studiengang"
      :rules="[rules.required]"></v-text-field>

    <v-btn class="btn" id="search_btn" density="comfortable" variant="text" @click="search" icon="mdi-filter">
      <v-icon class="ma-n1">mdi-magnify</v-icon>
    </v-btn>

    <v-btn class="btn" id="filter_btn" density="comfortable" variant="text" @click="openDialog" icon="mdi-filter">
      <v-icon class="ma-n1">mdi-filter</v-icon>
    </v-btn>

    <!-- Popup-Fenster -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card class="container">
        <v-card-title>Filter</v-card-title>
        <div id="filterCard">
          <v-autocomplete v-model="selectedParameter1" :items="[
            { title: '-', value: null },
            { title: 'Baden-Württemberg', value: 'BW' },
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
            { title: 'Österreich', value: 'iA' },]" id="inputState" label="Bundesland" item-text="text"
            item-value="value" :menu-props="{ maxHeight: 200 }" variant="underlined" density="compact"></v-autocomplete>
          <v-autocomplete class="textf" v-model="selectedParameter2" :items="[
            { title: '-', value: null },
            { title: 'ohne Angabe', value: '0' },
            { title: 'Abschlussprüfung', value: '1' },
            { title: 'Bachelor', value: '2' },
            { title: 'Diplom', value: '3' },
            { title: 'Diplom(FH)', value: '4' },
            { title: 'Master', value: '10' },
            { title: 'Staatsexamen', value: '12' },
          ]" id="inputState" label="Abschluss" item-value="value" :menu-props="{ maxHeight: 200 }" variant="underlined"
            density="compact"></v-autocomplete>
          <v-autocomplete class="textf" v-model="selectedParameter3" :items="[
            { title: '-', value: null },
            { title: 'Vollzeitstudium', value: '1' },
            { title: 'Teilzeitstudium', value: '2' },
            { title: 'Wochenendveranstaltung', value: '3' },
            { title: 'Fernstudium', value: '4' },
            { title: 'Selbststudium', value: '5' },
            { title: 'Blockstudium', value: '6' },
          ]" id="inputState" label="Art des Studiums" item-value="value" :menu-props="{ maxHeight: 200 }"
            variant="underlined" density="compact"></v-autocomplete>
          <v-autocomplete class="textf" v-model="selectedParameter4" :items="[
            { title: '-', value: null },
            { title: 'Studiengang grundständig', value: '0' },
            { title: 'Studiengang weiterführend', value: '1' },
          ]" id="inputState" label="Studiumstyp" item-value="value" :menu-props="{ maxHeight: 200 }"
            variant="underlined" density="compact"></v-autocomplete>
          <v-autocomplete class="textf" v-model="selectedParameter5" :items="[
            { title: '-', value: null },
            { title: 'Berufsakademie/Duale Hochschule', value: '101' },
            { title: 'FH/FAW', value: '106' },
            { title: 'Kunst- und Musikhochschule', value: '107' },
            { title: 'Universität', value: '108' },
            { title: 'Private Hochschule', value: '113' },
            { title: 'Hochschule eigenen Typs', value: '114' },
          ]" id="inputState" label="Studiengangmodell" item-value="value" :menu-props="{ maxHeight: 200 }"
            variant="underlined" density="compact"></v-autocomplete>
        </div>
        <v-card-actions>
          <button class="btn" @click="closeDialog">Zurücksetzen</button>
          <button class="btn" @click="applyFilter">Anwenden</button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
  
<script>
import axios from "axios"
export default {

  data() {
    return {
      searchResults: [],
      searchWord: null,
      dialog: false,
      selectedParameter1: null,
      selectedParameter2: null,
      selectedParameter3: null,
      selectedParameter4: null,
      selectedParameter5: null,
      selectedParameter6: null,
      daten: [],
      rules: {
        required: value => !!value || 'Field is requiered',
      },
    };
  },


  methods: {

    search: function () {
      this.$emit("search", {
        searchWord: this.searchWord,
      })
    },

    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.$emit('resetFilters');
      this.dialog = false;
      this.selectedParameter1 = null;
      this.selectedParameter2 = null;
      this.selectedParameter3 = null;
      this.selectedParameter4 = null;
      this.selectedParameter5 = null;
      this.selectedParameter6 = null;
    },

    async applyFilter() {
      const filterParams = {
        parameter1: this.selectedParameter1,
        parameter2: this.selectedParameter2,
        parameter3: this.selectedParameter3,
        parameter4: this.selectedParameter4,
        parameter5: this.selectedParameter5,
      };
      this.$emit('filterChanged', filterParams);
      this.dialog = false;
    },

  },
  mounted() {
    axios
      .get("http://localhost:8080/data").then(response => {
        this.daten = response.data;
        this.selectedParameter1 = this.daten[0].bundesland;
      })
  }
}

</script>
  
<style scoped>
#SearchBar {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 10px 10px 10px;
  border-radius: 13px;
  max-height: 80px;
}

#filterCard {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0px 21px 0px 21px;
}

#inputState {
  margin: auto;
  padding-left: 10px;
  width: 100%;
}

.v-card-actions {
  display: flex;
  justify-content: space-between;
}

.btn {
  border-radius: 13px;
  margin: 0px;
  padding: 5px 5px;
}

.v-card-title {
  padding-left: 20px;
  font-size: large;
  color: #F74E15;
}

.btn:active {
  background-color: white;
}
</style>

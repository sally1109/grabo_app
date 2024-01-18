
<template>
  <div class="container" id="Filter">
    <!-- Suchleiste -->
    <v-text-field id="Search" v-model="search_word" label="Suche nach Studiengang" variant="underlined"></v-text-field>

    <v-btn class="btn" id="filter_btn" density="comfortable" variant="text" @click="search" icon="mdi-filter">
      <v-icon>mdi-search</v-icon>
    </v-btn>

    <v-btn class="btn" id="filter_btn" density="comfortable" variant="text" @click="openDialog" icon="mdi-filter">
      <v-icon>mdi-filter</v-icon>
    </v-btn>
    <!-- Popup-Fenster -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card class="container">
        <v-card-title>Filter</v-card-title>
        <div id="filterCard">
          <v-autocomplete v-model="selectedParameter1" :items="[
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
            { title: 'ohne Angabe', value: '0' },
            { title: 'Abschlussprüfung', value: '1' },
            { title: 'Bachelor', value: '2' },
            { title: 'Diplom', value: '3' },
            { title: 'Diplom(FH)', value: '4' },
            { title: 'Master', value: '10' },
            { title: 'Staatsexamen', value: '12' },
          ]" id="inputState" label="Abschluss" item-value="value" :menu-props="{ maxHeight: 200 }" variant="underlined" density="compact"></v-autocomplete>
          <v-autocomplete class="textf" v-model="selectedParameter3" :items="[
            { title: 'Vollzeitstudium', value: '1' },
            { title: 'Teilzeitstudium', value: '2' },
            { title: 'Wochenendveranstaltung', value: '3' },
            { title: 'Fernstudium', value: '4' },
            { title: 'Selbststudium', value: '5' },
            { title: 'Blockstudium', value: '6' },
          ]" id="inputState" label="Art des Studiums" item-value="value"
            :menu-props="{ maxHeight: 200 }" variant="underlined" density="compact"></v-autocomplete>
          <v-autocomplete class="textf" v-model="selectedParameter4" :items="[
            { title: 'Studiengang grundständig', value: '0' },
            { title: 'Studiengang weiterführend', value: '1' },
          ]" id="inputState" label="Studiumstyp" item-value="value" :menu-props="{ maxHeight: 200 }" variant="underlined" density="compact"></v-autocomplete>
          <v-autocomplete class="textf" v-model="selectedParameter5" :items="[
            { title: 'ausbildungsintegrierend', value: '1' },
            { title: 'berufsintegrierend', value: '2' },
            { title: 'berufsbegleitend', value: '3' },
            { title: 'praxisintegrierend', value: '4' },
            { title: 'Duales Studium allgemein', value: '5' },
          ]" id="inputState" label="Studiengangmodell" item-value="value"
            :menu-props="{ maxHeight: 200 }" variant="underlined" density="compact"></v-autocomplete>
          <v-autocomplete class="textf" v-model="selectedParameter6" :items="[
            { title: 'Berufsakademie/Duale Hochschule', value: '101' },
            { title: 'FH/FAW', value: '106' },
            { title: 'Kunst- und Musikhochschule', value: '107' },
            { title: 'Universität', value: '108' },
            { title: 'Private Hochschule', value: '113' },
            { title: 'Hochschule eigenen Typs', value: '114' },
          ]" id="inputState" label="Studiengangmodell" item-value="value"
            :menu-props="{ maxHeight: 200 }" variant="underlined" density="compact"></v-autocomplete>
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
  props: {
        bundeslaender: Array,
        abschlussgrade: Array,
        studienformen: Array,
        studientypen: Array,
        studiengangmodelle: Array,
        hochschularten: Array,
      },
  data() {
    return {
      search_word: 'Informatik',
      dialog: false,
      selectedParameter1: null,
      selectedParameter2: null,
      selectedParameter3: null,
      selectedParameter4: null,
      selectedParameter5: null,
      selectedParameter6: null,
    };
  },

  methods: {
    async fetchDataFromBackend(filterParams) {
    try {
      const response = await axios.post("http://localhost:8080/fetchData", filterParams);
      console.log(response.data); 
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten:", error.message);
    }
  },
    search : function (){
      axios.get("http://localhost:8080/testFilter",{
        params: {
          filterWord: this.search_word,
        }
      })
    },
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.$emit('reset-filters');
      this.dialog = false;
      this.selectedParameter1 = null;
      this.selectedParameter2 = null;
      this.selectedParameter3 = null;
      this.selectedParameter4 = null;
      this.selectedParameter5 = null;
      this.selectedParameter6 = null;
    },
    
    applyFilter() {
      const filterParams = {
        parameter1: this.selectedParameter1,
        parameter2: this.selectedParameter2,
        parameter3: this.selectedParameter3,
        parameter4: this.selectedParameter4,
        parameter5: this.selectedParameter5,
        parameter6: this.selectedParameter6,
        search_word: this.search_word,
      };
      this.$emit('filter-changed', filterParams);
      this.dialog = false;
      this.fetchDataFromBackend(filterParams);
    },
    setBackendData() {
          this.selectedParameter1 = this.bundeslaender;
          this.selectedParameter2 = this.abschlussgrade;
          this.selectedParameter3 = this.studienformen;
          this.selectedParameter4 = this.studientypen;
          this.selectedParameter5 = this.studiengangmodelle;
          this.selectedParameter6 = this.hochschularten;
        },
  },
};
</script>
  
<style scoped>
#Filter {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 0px !important;
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
#Filter {
  margin-right: 10px;
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
  margin: 5px 10px;
  padding: 12px 15px;
}
.v-card-title {
  padding-left: 20px;
  font-size: large;
  color: #F74E15;
}
</style>

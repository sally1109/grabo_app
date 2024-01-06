<template>
  <div class="container" id="SearchBar">

    <!-- Suchleiste -->
    <v-text-field id="Search" v-model="search" label="Suche"></v-text-field>

    <v-btn id="Filter" @click="openDialog" icon>
      <v-icon>mdi-filter</v-icon>
    </v-btn>

    <!-- Popup-Fenster -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title>Filter</v-card-title>
<div id="filterCard">
        <v-autocomplete class="textf" v-model="selectedParameter1" :items="[
          { title: 'Bade-Württemberg', value: 'BW' },
          { title: 'Bayern', value: 'BY' },
          { title: 'Berlin', value: 'BE' },
          { title: 'Brandenburg', value: 'BB' },
          { title: 'Hamburg', value: 'BY' },
          { title: 'Hessen', value: 'BY' },
          { title: 'Mecklenburg-Vorpommern', value: 'BY' },
          { title: 'Niedersachsen', value: 'BY' },
          { title: 'Nordrhei-Westfalen', value: 'BY' },
          { title: 'Rheinland-Pfalz', value: 'BY' },
          { title: 'Saarland', value: 'SL' },
          { title: 'Sachsen', value: 'SN' },
          { title: 'Sachsen-Anhalt', value: 'ST' },
          { title: 'Schleswig-Holstein', value: 'SH' },
          { title: 'Thüringen', value: 'TH' },
          { title: 'Österreich', value: 'iA' },
        ]" id="inputState" label="Bundesland" item-text="text" item-value="value" ></v-autocomplete>

        <v-autocomplete class="textf" v-model="selectedParameter2" :items="[
          { title: 'ohne Angabe', value: '0' },
          { title: 'Abschlussprüfung', value: '1' },
          { title: 'Bachelor', value: '2' },
          { title: 'Diplom', value: '3' },
          { title: 'Diplom(FH)', value: '4' },
          { title: 'Master', value: '10' },
          { title: 'Staatsexamen', value: '12' },
        ]" id="inputState" label="Abschluss" item-value="value"></v-autocomplete>

        <v-autocomplete class="textf" v-model="selectedParameter3" :items="[
          { title: 'Vollzeitstudium', value: '1' },
          { title: 'Teilzeitstudium', value: '2' },
          { title: 'Wochenendveranstaltung', value: '3' },
          { title: 'Fernstudium', value: '4' },
          { title: 'Selbststudium', value: '5' },
          { title: 'Blockstudium', value: '6' },
        ]" id="inputState" label="Art des Studiums" item-value="value"></v-autocomplete>

        <v-autocomplete class="textf" v-model="selectedParameter4" :items="[
          { title: 'Studiengang grundständig', value: '0' },
          { title: 'Studiengang weiterführend', value: '1' },
        ]" id="inputState" label="Studiumstyp" item-value="value"></v-autocomplete>

        <v-autocomplete class="textf" v-model="selectedParameter5" :items="[
          { title: 'ausbildungsintegrierend', value: '1' },
          { title: 'berufsintegrierend', value: '2' },
          { title: 'berufsbegleitend', value: '3' },
          { title: 'praxisintegrierend', value: '4' },
          { title: 'Duales Studium allgemein', value: '5' },
        ]" id="inputState" label="Studiengangmodell" item-value="value"></v-autocomplete>

        <v-autocomplete class="textf" v-model="selectedParameter6" :items="[
          { title: 'Berufsakademie/Duale Hochschule', value: '101' },
          { title: 'FH/FAW', value: '106' },
          { title: 'Kunst- und Musikhochschule', value: '107' },
          { title: 'Universität', value: '108' },
          { title: 'Private Hochschule', value: '113' },
          { title: 'Hochschule eigenen Typs', value: '114' },
        ]" id="inputState" label="Studiengangmodell" item-value="value"></v-autocomplete>

</div>

        <v-card-actions>
          <v-btn @click="closeDialog">Filter zurücksetzen</v-btn>
          <button @click="applyFilter">Filter anwenden</button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      search: '',
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
      }
      this.$emit('filter-changed', filterParams);
      this.dialog = false;
    },
  },
};
</script>
  

<style scoped>
div {
  display: flex;
}

#SearchBar {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 21.3px;
  padding-left: 20px;
}

#filterCard{
  display:flex;
  flex-direction: column;
  width: 100%;

}

#Search {
  margin: auto;
}

#Filter {
  margin-right: 10px;
}

#inputState {
  margin: auto;
  padding-left: 10px;
  width: 100%;
}
</style>

<template>
  <div class="container" id="SearchBar">
    <!-- Suchleiste -->
    <v-text-field id="Search" v-model="searchWord" variant="underlined" label="Suche einen Studiengang" :rules="[rules.required]"></v-text-field>

    <v-btn class="btn" id="search_btn" density="comfortable" variant="text" @click="search" icon="mdi-filter">
      <v-icon>mdi-magnify</v-icon>
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

  data : function () {
    return {
      searchResults: [],
      searchWord: '',
      dialog: false,
      selectedParameter1: null,
      selectedParameter2: null,
      selectedParameter3: null,
      selectedParameter4: null,
      selectedParameter5: null,
      selectedParameter6: null,
      extractedData: [],
      rules: {
        required: value => !!value || 'Field is requiered',
      },
    };
  },
  created() {
    this.fetchDataFromBackend();
  },


  methods: {


    async fetchDataFromBackend() {
      console.log('Ausgabe X');
      try {
        const response = await axios.post("http://localhost:8080/fetchData");
        console.log(response.data);

        this.extractedData = response.data.extractedData;
        console.log(this.extractedData);
        return response.data;
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error.message);
      }
    },

    /*async fetchDataFromBackend(filterParams) {
    try {
      const response = await axios.post("http://localhost:8080/fetchData", filterParams);
      console.log(response.data); 
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten:", error.message);
    }
  },*/
    search : function (){
      this.$emit("search", {
        searchWord: this.searchWord,
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
    
    async applyFilter() {

      // Überprüfen, ob searchWord vorhanden ist
      if (!this.searchWord) {
        console.error("searchWord is required");
        return;
      }

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
      
    // Warten auf den Datenabruf
    try {
      await this.fetchDataFromBackend(this.extractedData);
      this.extractedData = data.extractedData;
      console.log(this.extractedData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      // Hier kannst du entscheiden, wie du mit dem Fehler umgehen möchtest
      return;
    }


        if (this.selectedParameter1) {
          this.extractedData.filter(item => item.data.bundesland === this.selectedParameter1);
        }

        if (this.selectedParameter2) {
          this.extractedData.filter(item => item.data.abschluss === this.selectedParameter2);
        }

        if (this.selectedParameter3) {
          this.extractedData.filter(item => item.data.studienformen === this.selectedParameter3);
        }

        if (this.selectedParameter4) {
          this.extractedData.filter(item => item.data.studientypen === this.selectedParameter4);
        }

        if (this.selectedParameter5) {
          this.extractedData.filter(item => item.data.studiengangmodelle === this.selectedParameter5);
        }

        if (this.selectedParameter6) {
          this.extractedData.filter(item => item.data.abschlussgrade === this.selectedParameter6);
        }

        this.$emit('filter-changed', filteredData);
        return filteredData;
    },

    },



    setBackendData() {
          this.selectedParameter1 = this.bundeslaender;
          this.selectedParameter2 = this.abschlussgrade;
          this.selectedParameter3 = this.studienformen;
          this.selectedParameter4 = this.studientypen;
          this.selectedParameter5 = this.studiengangmodelle;
          this.selectedParameter6 = this.hochschularten;
        },
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

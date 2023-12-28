<template>
     <div class="container" id="SearchBar">

        <!-- Suchleiste -->
        <v-text-field id="Search" v-model="search" label="Suche" ></v-text-field>
     
        <v-btn id= "Filter" @click="openDialog" icon>
            <v-icon>mdi-filter</v-icon>
        </v-btn>

    <!-- Popup-Fenster -->
        <v-dialog v-model="dialog" max-width="600">
        <v-card>
            <v-card-title>Filter</v-card-title>
            <v-autocomplete
            class="textf"
            :items="[
              'Bayern',
              'Berlin',
              'Brandenburg',
              'Bremen',
              'Hamburg',
              'Hessen',
              'Mecklenburg-Vorpommern',
            ]"
            id="inputState"
            label="Bundesland"
            v-model="state"
          ></v-autocomplete>


            <v-card-actions>
            <v-btn @click="closeDialog">Schließen</v-btn>
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
        state: ""
      };
    },
    methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    }
    }
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

#Search {
    margin: auto;
}

#Filter {
    margin-right: 10px;
}

#inputState {
    margin: auto;
    padding-left: 10px;
}




  </style>
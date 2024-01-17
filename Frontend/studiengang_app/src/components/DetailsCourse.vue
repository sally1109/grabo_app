<template>
 <v-dialog v-show="show">
    <v-card class="container" id="DetailsCourse">     
      <v-card-title> {{ selectedCourse.sfa }} </v-card-title>
      <div class="details">
      <v-card-subtitle>Studienfeld: {{ selectedCourse.sfe }}</v-card-subtitle>
      <v-card-subtitle>Stadt: {{ selectedCourse.orte }}</v-card-subtitle>

        <v-card-subtitle v-if="selectedCourse.re === 'BW'">Bundesland: Baden-Württemberg</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.re === 'BY'">Bundesland: Bayern</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.re === 'BE'">Bundesland: Berlin</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.re === 'BB'">Bundesland: Brandenburg</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.re === 'HB'">Bundesland: Bremen</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.re === 'HH'">Bundesland: Hamburg</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.re === 'HE'">Bundesland: Hessen</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.re === 'MV'">Bundesland: Mecklenburg-Vorpommern</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.re === 'NI'">Bundesland: Niedersachsen</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.re === 'NW'">Bundesland: Nordrhei-Westfalen</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.re === 'RP'">Bundesland: Rheinland-Pfalz</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.re === 'SL'">Bundesland: Saarland</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.re === 'SN'">Bundesland: Sachsen</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.re === 'ST'">Bundesland: Sachsen-Anhalt</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.re === 'SH'">Bundesland: Schleswig-Holstein</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.re === 'TH'">Bundesland: Thüringen</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.re === 'iA'">Bundesland: Österreich</v-card-subtitle>

        <v-card-subtitle v-if="selectedCourse.sfo === '0'">Studienart: Auf Anfrage</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.sfo === '1'">Studienart: Vollzeitstudium</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.sfo === '2'">Studienart: Teilzeitstudium</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.sfo === '3'">Studienart: Wochenendveranstaltung</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.sfo === '4'">Studienart: Fernstudium</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.sfo === '5'">Studienart: Selbststudium</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.sfo === '6'">Studienart: Blockstudium</v-card-subtitle>

        <v-card-subtitle v-if="selectedCourse.st === '0'">Studiengang grundständig</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.st === '1'">Studiengang weiterführend</v-card-subtitle>

        <v-card-subtitle v-if="selectedCourse.smo === '1'">ausbildungsintegrierend</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.smo === '2'">berufsintegrierend</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.smo === '3'">berufsbegleitend</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.smo === '4'">praxisintegrierend</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.smo === '5'">Duales Studium allgemein</v-card-subtitle>

        <v-card-subtitle v-if="selectedCourse.abg === '0'">Abschluss: ohne Angabe</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.abg === '1'">Abschluss: Abschlussprüfung</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.abg === '2'">Abschluss: Bachelor</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.abg === '3'">Abschluss: Diplom</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.abg === '4'">Abschluss: Diplom(FH)</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.abg === '10'">Abschluss: Master</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.abg === '12'">Abschluss: Staatsexamen</v-card-subtitle>

        <v-card-subtitle v-if="selectedCourse.hsa === '101'">Berufsakademie/Duale Hochschule</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.hsa === '106'">FH/FAW</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.hsa === '107'">Kunst- und Musikhochschule</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.hsa === '108'">Universität</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.hsa === '113'">Private Hochschule</v-card-subtitle>
        <v-card-subtitle v-else-if="selectedCourse.hsa === '114'">Hochschule eigenen Typs</v-card-subtitle>

        <button class="btn" id="btn_close" @click="closeDialog()">Schließen</button> 

        </div>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: {
    value: Boolean,
    selectedCourse: Object,

  },
  methods: {

    closeDialog() {
      this.$emit('closeDialog', false); // Setze dialogVisible auf false
    },
    
    show: {
      get () {
        return this.value
      },

    }
  },
};
</script>

<style scoped>

#DetailsCourse {
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-bottom: 10px;
  padding: 10px 15px 10px 15px;
  border-radius: 13px;
}

.details {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.v-card-title {
  padding: 5px;
  max-width: 265px;
  font-size: medium;
}

.v-card-subtitle {
  padding: 5px;
}

#btn_close {
  border-radius: 13px;
  margin: 20px -2.5px 0 -2.5px;
  padding: 12px 15px;
}
</style>



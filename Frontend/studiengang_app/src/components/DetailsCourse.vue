<template>
 <v-dialog v-model="show">
    <v-card>     
      <v-card-title> {{ selectedCourse.sfa }}</v-card-title>
      <span>Studienfeld: {{ selectedCourse.sfe }}</span>
      <span>{{ selectedCourse.orte }}</span>

        <span v-if="selectedCourse.re === 'BW'">Baden-Württemberg</span>
        <span v-else-if="selectedCourse.re === 'BY'">Bayern</span>
        <span v-else-if="selectedCourse.re === 'BE'">Berlin</span>
        <span v-else-if="selectedCourse.re === 'BB'">Brandenburg</span>
        <span v-else-if="selectedCourse.re === 'HB'">Bremen</span>
        <span v-else-if="selectedCourse.re === 'HH'">Hamburg</span>
        <span v-else-if="selectedCourse.re === 'HE'">Hessen</span>
        <span v-else-if="selectedCourse.re === 'MV'">Mecklenburg-Vorpommern</span>
        <span v-else-if="selectedCourse.re === 'NI'">Niedersachsen</span>
        <span v-else-if="selectedCourse.re === 'NW'">Nordrhei-Westfalen</span>
        <span v-else-if="selectedCourse.re === 'RP'">Rheinland-Pfalz</span>
        <span v-else-if="selectedCourse.re === 'SL'">Saarland</span>
        <span v-else-if="selectedCourse.re === 'SN'">Sachsen</span>
        <span v-else-if="selectedCourse.re === 'ST'">Sachsen-Anhalt</span>
        <span v-else-if="selectedCourse.re === 'SH'">Schleswig-Holstein</span>
        <span v-else-if="selectedCourse.re === 'TH'">Thüringen</span>
        <span v-else-if="selectedCourse.re === 'iA'">Österreich</span>

        <span v-if="selectedCourse.sfo === '0'">Auf Anfrage</span>
        <span v-else-if="selectedCourse.sfo === '1'">Vollzeitstudium</span>
        <span v-else-if="selectedCourse.sfo === '2'">Teilzeitstudium</span>
        <span v-else-if="selectedCourse.sfo === '3'">Wochenendveranstaltung</span>
        <span v-else-if="selectedCourse.sfo === '4'">Fernstudium</span>
        <span v-else-if="selectedCourse.sfo === '5'">Selbststudium</span>
        <span v-else-if="selectedCourse.sfo === '6'">Blockstudium</span>

        <span v-if="selectedCourse.st === '0'">Studiengang grundständig</span>
        <span v-else-if="selectedCourse.st === '1'">Studiengang weiterführend</span>

        <span v-if="selectedCourse.smo === '1'">ausbildungsintegrierend</span>
        <span v-else-if="selectedCourse.smo === '2'">berufsintegrierend</span>
        <span v-else-if="selectedCourse.smo === '3'">berufsbegleitend</span>
        <span v-else-if="selectedCourse.smo === '4'">praxisintegrierend</span>
        <span v-else-if="selectedCourse.smo === '5'">Duales Studium allgemein</span>

        <span v-if="selectedCourse.abg === '0'">ohne Angabe</span>
        <span v-else-if="selectedCourse.abg === '1'">Abschlussprüfung</span>
        <span v-else-if="selectedCourse.abg === '2'">Bachelor</span>
        <span v-else-if="selectedCourse.abg === '3'">Diplom</span>
        <span v-else-if="selectedCourse.abg === '4'">Diplom(FH)</span>
        <span v-else-if="selectedCourse.abg === '10'">Master</span>
        <span v-else-if="selectedCourse.abg === '12'">Staatsexamen</span>

        <span v-if="selectedCourse.hsa === '101'">Berufsakademie/Duale Hochschule</span>
        <span v-else-if="selectedCourse.hsa === '106'">FH/FAW</span>
        <span v-else-if="selectedCourse.hsa === '107'">Kunst- und Musikhochschule</span>
        <span v-else-if="selectedCourse.hsa === '108'">Universität</span>
        <span v-else-if="selectedCourse.hsa === '113'">Private Hochschule</span>
        <span v-else-if="selectedCourse.hsa === '114'">Hochschule eigenen Typs</span>

        <button class="btn" id="btn_close" @click="closeDialog()">Schließen</button> 
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



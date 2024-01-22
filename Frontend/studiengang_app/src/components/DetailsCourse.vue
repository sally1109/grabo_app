<template>
  <v-dialog v-show="show">
    <v-card class="container" id="DetailsCourse">
      <v-card-title> {{ selectedCourse.data.studiBezeichnung }} </v-card-title>
      <div class="details">
        <v-card-subtitle>Hochschule: {{ selectedCourse.data.studienanbieter.name }}</v-card-subtitle>
        <v-card-subtitle>Adresse: {{ selectedCourse.data.studienort.strasse }}, {{
          selectedCourse.data.studienort.postleitzahl }} {{ selectedCourse.data.studienort.ort }}</v-card-subtitle>
        <v-card-subtitle>Beginn: {{ selectedCourse.data.studiBeginn }}</v-card-subtitle>
        <v-card-subtitle>Studienform: {{ selectedCourse.data.studienform.label }}</v-card-subtitle>
        <v-card-subtitle>Studienfächer: {{ selectedCourse.data.studienfaecher[0] }}</v-card-subtitle>
        <button class="btn" id="btn_close" @click="closeInfo()">Schließen</button>
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

    closeInfo() {
      this.$emit('closeInfo', false);
    },

    show: {
      get() {
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



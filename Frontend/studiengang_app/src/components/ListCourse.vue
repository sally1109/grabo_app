<template>
    <v-card class="container" id="ListHome">
      <div id="div_name">
        <v-card-title @click="openInfo(listedCourse)"> {{ listedCourse.data.studiBezeichnung }} </v-card-title>
          <v-btn class="btn" id="add_btn" density="comfortable" icon="mdi-star-outline" variant="text" @click="defineCourse(listedCourse), addFavorite()"> 
            <v-icon size="large" v-if="isClicked"> {{ 'mdi-star'}} </v-icon>
            <v-icon size="large" v-if="!isClicked"> {{ 'mdi-star-outline'}} </v-icon>
          </v-btn>
      </div>
      <div id="div_infos" @click="openInfo(listedCourse)">
        <v-icon icon="mdi-map-marker" size="small"></v-icon>
        <v-card-subtitle> {{ listedCourse.data.studienort.postleitzahl }} {{ listedCourse.data.studienort.ort }} </v-card-subtitle>
      </div>
    </v-card>
  </template>
  
  <script>

  export default {
    name: "ListCourse",
    props: ["listedCourse", "index"],
    data: function () {
    return {
      dialogVisible: false,
      definedCourse: [],
      isClicked: false
    }},
    methods: {
      defineCourse: function (course) {
        this.definedCourse = course;
        console.log(this.definedCourse)
      },

      openInfo: function (course) {
        this.$emit("openInfo", {
            data: course
        })
      },

      addFavorite: function () {
        console.log('Zu sendende Daten:', this.definedCourse);
        this.$emit("favoriteAdded", {
        data: this.definedCourse
      });
    }
    },
    }
  </script>
  
  
  <style scoped>
  
  #ListHome {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px 15px 10px 15px;
    border-radius: 13px;
  }

  span{
  padding-left: 10px;
}
  
  #div_name {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  
  #div_infos {
    display: flex;
    flex-direction: row;
    align-items: left;
    width: 100%;
  }
  
  .v-card-title {
    padding: 0px;
    max-width: 265px;
    font-size: medium;
  }
  
  .v-card-subtitle {
    padding-left: 5px;
  }
  </style>
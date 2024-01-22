<template>
  <v-card class="container" id="ListHome">
    <div id="div_name">
      <v-card-title @click="openInfo(listedCourse)"> {{ listedCourse.data.studiBezeichnung }} </v-card-title>
      <v-btn class="btn" id="add_btn" density="comfortable" icon="mdi-star-outline" variant="text"
        @click="defineCourse(listedCourse), addFavorite()">
        <v-icon size="large" v-if="checkFavorite(listedCourse)"> {{ 'mdi-star' }} </v-icon>
        <v-icon size="large" v-else> {{ 'mdi-star-outline' }} </v-icon>
      </v-btn>
    </div>
    <div id="div_infos" @click="openInfo(listedCourse)">
      <v-icon icon="mdi-map-marker" size="small"></v-icon>
      <v-card-subtitle> {{ listedCourse.data.studienort.postleitzahl }} {{ listedCourse.data.studienort.ort }}
      </v-card-subtitle>
    </div>
  </v-card>
</template>
  
<script>

import axios from "axios"

export default {
  name: "ListCourse",
  props: ["listedCourse", "index"],
  data: function () {
    return {
      dialogVisible: false,
      definedCourse: [],
      favorites: []
    }
  },
  methods: {
    defineCourse: function (course) {
      this.definedCourse = course;
    },

    openInfo: function (course) {
      this.$emit("openInfo", {
        data: course
      })
    },

    addFavorite: function () {
      if (this.checkFavorite(this.definedCourse)) {
        return;
      } else {
        this.$emit("favoriteAdded", {
          data: this.definedCourse
        });
        axios
          .get("http://localhost:8080/favorites").then(response => {
            this.favorites = response.data;
          })
        this.checkFavorite(this.definedCourse)
      }
    },

    checkFavorite: function (course) {
      for (let i = 0; i < this.favorites.length; i++) {
        if (course.data.id == this.favorites[i].data.data.id) {
          return true
        }
      }
      return false
    },
  },
  mounted() {
    axios
      .get("http://localhost:8080/favorites").then(response => {
        this.favorites = response.data;
      });
  }
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

span {
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
<template>
    <div class = "container" id="ListCourse">
        <v-card>
            <v-card-title>
                <!--{{ course.name }}--> Studiengangsname
            </v-card-title>
            <h2> Bundesland</h2>
        </v-card>
    </div>

</template>

<script>
export default {
    name:"ListCourse",
    props:[""],
    data: function() {
        return {
            dialog:false,
        }
    }

}
</script>

<style scoped>

</style>
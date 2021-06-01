<template>
    <div>
        <v-text-field
            v-model="title"
            outlined
            @keypress.enter="searchMovies"
        >
        <template v-slot:prepend-inner>
          <v-icon>search</v-icon>
        </template>
        <template v-slot:append>
          <v-progress-circular
            indeterminate
            color="primary"
            v-if="loading"
          ></v-progress-circular>
        </template>
        </v-text-field>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SearchBar',
  computed: {
      title: {
          get(){
            return this.$store.state.movie.title
          },
          set(title){
            this.$store.commit('movie/updateState', {
                title
            })
          }
      },
      loading(){
          return this.$store.state.movie.loading
      }
  },
  methods: {
      ...mapActions('movie',[
          'searchMovies'
      ])
    // seachMovies () {
    //     this.$store.dispatch('movie/searchMovie')
    // //   this.loading = true
    // //   const res = await axios.get(`https://www.omdbapi.com/?apikey=9d38c929&s=${this.title}`)
    // //   console.log(res.data)
    // //   this.loading = false
    // //     // .then(res => {
    // //     //   console.log(res)
    // //     // })
    // }
  }
}
</script>

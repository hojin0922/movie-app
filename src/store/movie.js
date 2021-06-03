import axios from 'axios'

export default {
  namespaced : true,
  state: () => ({
    title: '',
    loading: false,
    movies: []
  }),
  getters: {},
  mutations: {
    updateState(state, payload){
      Object.keys(payload).forEach(key =>{
        state[key] = payload[key]
      })
    },
    pushIntoMovies(state, movies){
      state.movies.push(...movies)
    }
  },
  actions: { 
    fetchMovie ({ state, commit }, pageNum){
      return new Promise(async resolve => {
        const res = await axios.get(`https://www.omdbapi.com/?apikey=9d38c929&s=${state.title}&page=${pageNum}`)
        commit('pushIntoMovies', res.data.Search)
        resolve(res.data)
      })
    },
    async searchMovies ({ commit, dispatch }) {
      commit('updateState',{
        loading: true,
        movies: []
      })
      const { totalResults } = await dispatch('fetchMovie', 1)
      const pageLength = Math.ceil(totalResults / 10)
      if(pageLength > 1){
        for(let i = 2; i <= pageLength; i += 1){
          if(i > 4) break
          await dispatch('fetchMovie', i)
        }
      }
      commit('updateState',{
        loading: false
      })
    }
  }
  // actions: { 
  //   async searchMovies ({ state, commit }) {
  //     //state.loading = true\
  //     commit('updateState',{
  //       loading: true,
  //       movies: []
  //     })
  //     const res = await axios.get(`https://www.omdbapi.com/?apikey=9d38c929&s=${state.title}&page=1`)
  //     const pageLength = Math.ceil(res.data.totalResults / 10)
  //     state.loading = false
  //     commit('updateState',{
  //       movies: res.data.Search
  //     })
  //     if(pageLength > 1){
  //       for(let i = 2; i <= pageLength; i += 1){
  //         if(i > 4) break
  //         const resMore = await axios.get(`https://www.omdbapi.com/?apikey=9d38c929&s=${state.title}&page=${i}`)
  //         commit('pushIntoMovies', resMore.data.Search)
  //       }
  //     }
  //     commit('updateState',{
  //       // movies: res.data.Search,
  //       loading: false
  //     })
  //     // .then(res => {
  //     //   console.log(res)
  //     // })
  //   }
  // }
}
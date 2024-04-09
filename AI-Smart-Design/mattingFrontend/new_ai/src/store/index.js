import Vue from "vue"
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    images: [],
  },

  mutations: {
    appendImage(state, image) {
      state.images.push(image)
    },

    updateImage(state, { imageKey, ...newImage }) {
      const imageIndex = state.images.findIndex((i) => i.imageKey === imageKey)
      state.images[imageIndex] = {
        ...state.images[imageIndex],
        ...newImage,
      }

      state.images = [...state.images]
    }
  }
})

export default store

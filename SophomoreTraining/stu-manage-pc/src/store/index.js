import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      username:sessionStorage.getItem('username')||'?',
  },
  getters:{
    getUserName:state =>{
        return state.username
    }
  },
  mutations: {
    setUserName(state,username){
        state.username = username;
        sessionStorage.setItem('username',username);
    }
  },
  actions: {
      setUserNameAsy(context,username){
          context.commit('setUserName',username)
      }
  },
  modules: {
  }
})

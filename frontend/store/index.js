import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = () => new Vuex.Store({
    state: {
        user: null,
        token: null,
        role: null,
        route: null,
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        },
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_ROLE(state, role) {
            state.role = role
        },
        SET_ROUTE(state, route) {
            state.route = route
        }
    },
    actions: {
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                axios({ url: 'http://datascience.mfu.ac.th/dfapi/login', data: user, method: 'POST' })
                    .then(res => {
                        const user = res.data.user
                        const token = res.data.token
                        const role = res.data.role
                        sessionStorage.setItem('store_user',user)
                        sessionStorage.setItem('store_token',token)
                        sessionStorage.setItem('store_role',role)
                        // console.log(localStorage.getItem('store_token'))
                        // axios.defaults.headers.common['Authorization'] = token
                        commit('SET_USER', sessionStorage.getItem('store_user'))
                        commit('SET_TOKEN', sessionStorage.getItem('store_token'))
                        commit('SET_ROLE', sessionStorage.getItem('store_role'))
                        this.$router.push("/dashboard")
                        resolve(res)
                    })
                    .catch(error => {
                        commit('SET_USER', null)
                        commit('SET_TOKEN', null)
                        commit('SET_ROLE', null)
                        commit('SET_ROUTE', null)
                        reject(error)
                    })
            })
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                sessionStorage.removeItem('store_user')
                sessionStorage.removeItem('store_token')
                sessionStorage.removeItem('store_role')
                sessionStorage.removeItem('store_route')
                commit('SET_USER', null)
                commit('SET_TOKEN', null)
                commit('SET_ROLE', null)
                commit('SET_ROUTE', null)
                // delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        },
        route({ commit }, path){
            return new Promise((resolve, reject) => {
                sessionStorage.setItem('store_route',  path.path)
                commit('SET_ROUTE', sessionStorage.getItem('store_route'))
                resolve()
            })
        },
    },
    // getters: {
    //     isLoggedIn: state => !!state.token,
    //     Roll: state => !!state.roll,
    // }

})

export default store


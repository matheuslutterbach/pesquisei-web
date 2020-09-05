import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        bairrosSelecionados: []
    },

    mutations: {
        adicionarBairro(state, bairro) {
            state.bairrosSelecionados.push(bairro)
        },
        limparBairros(state) {
            state.bairrosSelecionados = []
        }
    },
    getters: {
        bairrosSelecionados: state => state.bairrosSelecionados,
    },
});


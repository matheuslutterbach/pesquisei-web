import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        bairrosSelecionados: [],
        perguntasCadastradas: []
    },

    mutations: {
        //Bairros
        adicionarBairro(state, bairro) {
            state.bairrosSelecionados.push(bairro)
        },
        limparBairros(state) {
            state.bairrosSelecionados = []
        },
        removerBairro(state, bairro) {
            let index = state.bairrosSelecionados.indexOf(bairro)
            if (index > -1) {
                state.bairrosSelecionados.splice(index, 1);
            }
        },

        //Perguntas
        adicionarPergunta(state, pergunta) {
            state.perguntasCadastradas.push(pergunta)
        },
        limparPerguntas(state) {
            state.perguntasCadastradas = []
        },
        removerPergunta(state, pergunta) {
            let index = state.perguntasCadastradas.indexOf(pergunta)
            if (index > -1) {
                state.perguntasCadastradas.splice(index, 1);
            }
        },
    },

    getters: {
        bairrosSelecionados: state => state.bairrosSelecionados,
        perguntasCadastradas: state => state.perguntasCadastradas,
    },
});


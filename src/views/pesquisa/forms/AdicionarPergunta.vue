<template>
  <div class="modal-card tamanho-modal" style="overflow-y: auto;">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(salvar)">
        <header class="modal-card-head">
          <p class="modal-card-title">Cadastrar Pergunta</p>

          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
          <div class="columns">
            <div class="column">
              <ValidationProvider v-slot="{ errors }" name="'Pergunta'" rules="required">
                <b-field :type="{'is-danger' : errors.length}" label="Questão">
                  <b-input v-model="pergunta.descricao" maxlength="256" type="textarea"></b-input>
                </b-field>
                <small class="has-text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="column">
              <div v-for="(resposta, i) in respostas" :key="resposta.id">
                <b-field :class="{'mt-4' : i > 0 }" label="Resposta" expanded>
                  <b-input v-model="resposta[i]"></b-input>
                </b-field>
              </div>

              <div class="botao-resposta-posicao">
                <b-button
                  class="button is-small is-primary"
                  :loading="loading"
                  @click="respostas.push({})"
                >
                  <span class="icon is-small">
                    <i class="fas fa-plus"></i>
                  </span>
                </b-button>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <div class="footer-buttons">
            <b-button class="button" type="button" :loading="loading" @click="$emit('close')">Fechar</b-button>

            <b-button class="button is-primary" :loading="loading" native-type="submit">
              <span>Adicionar Pergunta</span>
              <span class="icon is-small">
                <i class="fas fa-plus"></i>
              </span>
            </b-button>
          </div>
        </footer>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      pergunta: {},
      respostas: [{}, {}, {}, {}],
    };
  },
  methods: {
    salvar() {
      this.pergunta.respostas = this.respostas
        .map((resposta, index) => {
          return { descricao: resposta[index], ordem: index };
        })
        .filter((resposta) => resposta.descricao);

      this.$store.commit("adicionarPergunta", this.pergunta);
      this.$emit("close");
    },
  },
};
</script>

<style>
.botao-resposta-posicao {
  margin-top: 5%;
  display: flex;
  justify-content: flex-end;
}

.tamanho-modal {
  width: 980px !important;
  height: 800px;
}
</style>
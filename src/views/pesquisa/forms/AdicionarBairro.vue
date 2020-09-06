<template>
  <div>
    <div class="modal-card">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(salvar)">
          <header class="modal-card-head">
            <p class="modal-card-title">Selecionar Bairros</p>

            <button type="button" class="delete" @click="$emit('close')" />
          </header>
          <section class="modal-card-body">
            <ValidationProvider v-slot="{ errors }" name="'Cidade'" rules="required">
              <b-field :type="{'is-danger' : errors.length}" label="Cidade">
                <b-select
                  placeholder="Selecione a Cidade"
                  :loading="loadingCidades"
                  expanded
                  @input="buscarBairros()"
                  v-model="cidade"
                >
                  <option v-for="c in cidades" :value="c" :key="c.id">{{ c.nome }}</option>
                </b-select>
              </b-field>
              <small class="has-text-danger">{{ errors[0] }}</small>
            </ValidationProvider>

            <div v-if="bairros[0] && cidade.id" class="field mt-5">
              <div class="columns">
                <div class="column">
                  <ValidationProvider v-slot="{ errors }" name="'Bairro'" rules="required">
                    <b-field :type="{'is-danger' : errors.length}" label="Bairro">
                      <b-select
                        placeholder="Selecione o Bairro"
                        :loading="loadingBairros"
                        expanded
                        v-model="bairro"
                      >
                        <option v-for="b in bairros" :value="b" :key="b.id">{{ b.nome }}</option>
                      </b-select>
                    </b-field>
                    <small class="has-text-danger">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>
                <div class="column">
                  <ValidationProvider v-slot="{ errors }" name="'Percentual'" rules="max_value:100">
                    <b-field :type="{'is-danger' : errors.length}" label="Percentual">
                      <b-input v-model="bairro.percentual" icon-pack="fas" icon="percent"></b-input>
                    </b-field>
                    <small class="has-text-danger">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>
              </div>
            </div>

            <div v-else-if="cidade.id">
              <p class="title is-5 mt-5">{{cidade.nome}} não possui Bairros cadastrados.</p>
            </div>
          </section>
          <footer class="modal-card-foot">
            <div class="footer-buttons">
              <b-button
                class="button"
                type="button"
                :loading="loading"
                @click="$emit('close')"
              >Fechar</b-button>

              <b-button class="button is-primary" :loading="loading" native-type="submit">
                <span>Adicionar</span>
                <span class="icon is-small">
                  <i class="fas fa-plus"></i>
                </span>
              </b-button>
            </div>
          </footer>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.buscarCidades();
  },
  data() {
    return {
      loading: false,
      loadingBairros: false,
      cidades: [],
      cidade: {},
      bairro: {},
      bairros: {},
    };
  },
  methods: {
    salvar() {
      this.$store.commit("adicionarBairro", this.bairro);
      this.$emit("close");
    },
    buscarCidades() {
      this.loadingCidades = true;
      this.$http.get("http://localhost:8060/cidade").then(
        (response) => {
          this.cidades = response.body;
          this.loadingCidades = false;
        },
        () => {
          this.$buefy.toast.open({
            message: "Ops..Algo deu errado!",
            type: "is-danger",
          });
          this.loadingCidades = false;
        }
      );
    },
    buscarBairros() {
      if (this.cidade.id) {
        this.loadingBairros = true;
        this.$http
          .get("http://localhost:8060/bairro/cidade/" + this.cidade.id)
          .then(
            (response) => {
              this.bairros = response.body;
              this.loadingBairros = false;
            },
            () => {
              this.$buefy.toast.open({
                message: "Ops..Algo deu errado!",
                type: "is-danger",
              });
              this.loadingBairros = false;
            }
          );
      }
    },
  },
};
</script>

<style>
</style>
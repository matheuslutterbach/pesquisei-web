<template>
  <div class="card" style="border-radius: 15px;">
    <div class="card-content">
      <div class="titulo">
        <p class="title">
          <b-icon class="mr-4" pack="fas" icon="clipboard-check" size="is-small" />Criar Pesquisa
        </p>
      </div>

      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(salvar)">
          <pre>{{pesquisa}}</pre>

          <section class="modal-card-body">
            <div class="columns">
              <div class="column">
                <ValidationProvider v-slot="{ errors }" name="'Nome'" rules="required">
                  <b-field :type="{'is-danger' : errors.length}" label="Nome">
                    <b-input v-model="pesquisa.nome"></b-input>
                  </b-field>
                  <small class="has-text-danger">{{ errors[0] }}</small>
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" name="'Descrição'" rules="required">
                  <b-field :type="{'is-danger' : errors.length}" label="Descrição">
                    <b-input v-model="pesquisa.descricao"></b-input>
                  </b-field>
                  <small class="has-text-danger">{{ errors[0] }}</small>
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" name="'Nº entrevistados'" rules="alpha">
                  <b-field :type="{'is-danger' : errors.length}" label="Nº entrevistados">
                    <b-input v-model="pesquisa.numeroEntrevistados"></b-input>
                  </b-field>
                  <small class="has-text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="column">
                <div class="subtitulo-form">
                  <div class="subtitle">Bairros</div>
                  <div>
                    <button
                      class="button is-link mr-4"
                      @click="adicionarBairroModal()"
                      :class="{'is-loading' : loading }"
                      type="button"
                    >
                      <span class="icon is-small">
                        <i class="fas fa-plus"></i>
                      </span>
                    </button>
                  </div>
                </div>

                <b-table
                  v-if="$store.getters.bairrosSelecionados.length > 0"
                  :data="$store.getters.bairrosSelecionados"
                >
                  <b-table-column width="50" v-slot="props">
                    <p style="color: #c0c0c0">{{ props.index +1 }}</p>
                  </b-table-column>

                  <b-table-column field="bairro" label="Bairro" v-slot="props">
                    <p>{{ props.row.nome }}</p>
                  </b-table-column>

                  <b-table-column field="cidade" label="Cidade" v-slot="props">
                    <p>{{ props.row.cidade.nome }} - {{props.row.cidade.estadoSigla}}</p>
                  </b-table-column>

                  <b-table-column field="percentual" label="Percentual" v-slot="props">
                    <p v-if="props.row.percentual">{{ props.row.percentual}} %</p>
                  </b-table-column>
                </b-table>
              </div>
              <div class="column">
                <div class="subtitulo-form">
                  <div class="subtitle">Perguntas</div>
                  <div>
                    <button
                      size="is-small"
                      class="button is-link mr-4"
                      @click="adicionarRouter()"
                      :class="{'is-loading' : loading }"
                    >
                      <span class="icon is-small">
                        <i class="fas fa-plus"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer>
            <div class="footer-buttons">
              <b-button
                class="button"
                type="is-light"
                :loading="loading"
                @click="$router.push('/pesquisa')"
              >
                <span class="icon is-small">
                  <i class="fas fa-arrow-left"></i>
                </span>
                <span>Voltar</span>
              </b-button>

              <b-button class="button is-primary" :loading="loading" native-type="submit">
                <span>Salvar</span>
                <span class="icon is-small">
                  <i class="fas fa-save"></i>
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
import AdicionarBairro from "./forms/AdicionarBairro";
export default {
  created() {
    if (this.$router.id) {
      this.buscarPesquisa(this.$route.params.id);
    }
    this.$store.commit("limparBairros");
  },
  data() {
    return {
      loading: false,
      pesquisa: {},
    };
  },
  methods: {
    salvar() {
      if (!this.pesquisa.id) {
        this.loading = true;
        this.$http.post("http://localhost:8060/pesquisa", this.pesquisa).then(
          () => {
            this.loading = false;
            this.$buefy.toast.open({
              message: "Registro Salvo",
              type: "is-success",
            });
            this.$parent.close();
          },
          (error) => {
            this.loading = false;
            this.$buefy.toast.open({
              message: error.message,
              type: "is-danger",
            });
            this.$parent.close();
          }
        );
      } else {
        this.loading = true;
        this.$http
          .put(
            "http://localhost:8060/pesquisa/" + this.pesquisa.id,
            this.pesquisa
          )
          .then(
            () => {
              this.loading = false;
              this.$buefy.toast.open({
                message: "Registro alterado",
                type: "is-success",
              });
              this.$parent.close();
            },
            () => {
              this.loading = false;
              this.$buefy.toast.open({
                message: "Ops..Algo deu errado!",
                type: "is-danger",
              });
              this.$parent.close();
            }
          );
      }
    },
    buscarPesquisa(idPesquisa) {
      this.loading = true;
      this.$http.get("http://localhost:8060/pesquisa/" + idPesquisa).then(
        (response) => {
          this.pesquisa = response.body;
          this.loading = false;
        },
        () => {
          this.$buefy.toast.open({
            message: "Ops..Algo deu errado!",
            type: "is-danger",
          });
          this.loading = false;
        }
      );
    },
    adicionarBairroModal() {
      this.$buefy.modal.open({
        parent: this,
        component: AdicionarBairro,
        trapFocus: true,
        hasModalCard: true,
        customClass: "custom-class custom-class-2",
        width: 1200,
      });
    },
  },
};
</script>

<style>
.footer-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.subtitulo-form {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
</style>
<template>
  <div class="card" style="border-radius: 15px">
    <div class="card-content">
      <div class="titulo">
        <p class="title">
          <b-icon
            class="mr-4"
            pack="fas"
            icon="clipboard-check"
            size="is-small"
          />Criar Pesquisa
        </p>
      </div>

      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(salvar)">
          <section class="modal-card-body">
            <div class="columns">
              <div class="column">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="'Nome'"
                  rules="required"
                >
                  <b-field :type="{ 'is-danger': errors.length }" label="Nome">
                    <b-input v-model="pesquisa.nome"></b-input>
                  </b-field>
                  <small class="has-text-danger">{{ errors[0] }}</small>
                </ValidationProvider>

                <ValidationProvider
                  v-slot="{ errors }"
                  name="'Descrição'"
                  rules="required"
                >
                  <b-field
                    :type="{ 'is-danger': errors.length }"
                    label="Descrição"
                  >
                    <b-input v-model="pesquisa.descricao"></b-input>
                  </b-field>
                  <small class="has-text-danger">{{ errors[0] }}</small>
                </ValidationProvider>

                <ValidationProvider
                  v-slot="{ errors }"
                  name="'Nº entrevistados'"
                  rules="numeric"
                >
                  <b-field
                    :type="{ 'is-danger': errors.length }"
                    label="Nº entrevistados"
                  >
                    <b-input v-model="pesquisa.numeroEntrevistados"></b-input>
                  </b-field>
                  <small class="has-text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="column">
                <div class="subtitulo-form">
                  <div class="subtitle">
                    <b-icon
                      class="mr-2"
                      pack="fas"
                      icon="map-marker-alt"
                      size="is-small"
                    />Bairros
                  </div>
                  <div>
                    <button
                      class="button is-link mr-4"
                      @click="adicionarBairroModal()"
                      :class="{ 'is-loading': loading }"
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
                    <p style="color: #c0c0c0">{{ props.index + 1 }}</p>
                  </b-table-column>

                  <b-table-column field="bairro" label="Bairro" v-slot="props">
                    <p>{{ props.row.nome }}</p>
                  </b-table-column>

                  <b-table-column field="cidade" label="Cidade" v-slot="props">
                    <p>
                      {{ props.row.cidade.nome }} -
                      {{ props.row.cidade.estadoSigla }}
                    </p>
                  </b-table-column>

                  <b-table-column
                    field="quantidade"
                    label="Quantidade"
                    v-slot="props"
                  >
                    <p v-if="props.row.quantidade" class="has-text-centered">
                      {{ props.row.quantidade }}
                    </p>
                  </b-table-column>
                  <b-table-column
                    v-slot="props"
                    width="50"
                    field="editar"
                    custom-key="actions"
                  >
                    <b-button
                      class="button is-info is-light is-small"
                      @click.native="removerBairro(props.row)"
                    >
                      <span class="icon is-small">
                        <i class="fas fa-trash"></i>
                      </span>
                    </b-button>
                  </b-table-column>
                </b-table>
              </div>
              <div class="column">
                <div class="subtitulo-form">
                  <div class="subtitle">
                    <b-icon
                      class="mr-2"
                      pack="fas"
                      icon="clipboard-list"
                      size="is-small"
                    />Perguntas
                  </div>
                  <div>
                    <button
                      size="is-small"
                      class="button is-link mr-4"
                      @click="adicionarPerguntaModal()"
                      :class="{ 'is-loading': loading }"
                      type="button"
                    >
                      <span class="icon is-small">
                        <i class="fas fa-plus"></i>
                      </span>
                    </button>
                  </div>
                </div>

                <div>
                  <div
                    v-for="(pergunta, index) in $store.getters
                      .perguntasCadastradas"
                    :key="pergunta.id"
                  >
                    <p>
                      <strong>{{ index + 1 }} -</strong>
                      {{ pergunta.descricao }}
                    </p>

                    <div class="columns">
                      <div class="column is-10">
                        <ol class="ml-5 mt-2" type="A">
                          <li
                            class="mt-2"
                            v-for="resposta in pergunta.respostas"
                            :key="resposta.id"
                          >
                            {{ resposta.descricao }}
                          </li>
                        </ol>
                      </div>
                      <div class="column">
                        <b-button
                          class="mt-5 button is-info is-light is-small"
                          @click.native="removerPergunta(pergunta)"
                        >
                          <span class="icon is-small">
                            <i class="fas fa-trash"></i>
                          </span>
                        </b-button>
                      </div>
                    </div>

                    <div
                      v-if="$store.getters.perguntasCadastradas.length > 0"
                      class="is-divider"
                    ></div>
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

              <b-button
                class="button is-primary"
                :loading="loading"
                native-type="submit"
              >
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
import AdicionarPergunta from "./forms/AdicionarPergunta";
import { authService } from "../../_services/authService";

export default {
  created() {
    if (this.$router.id) {
      this.buscarPesquisa(this.$route.params.id);
    }
    this.$store.commit("limparBairros");
    this.$store.commit("limparPerguntas");
    this.adicionarPerfil();
  },
  data() {
    return {
      loading: false,
      pesquisa: {},
    };
  },
  methods: {
    salvar() {
      this.pesquisa.bairrosPesquisa = this.$store.getters.bairrosSelecionados.map(
        (bairroSelecionado) => {
          return {
            bairroId: bairroSelecionado.id,
            quantidade: bairroSelecionado.quantidade,
          };
        }
      );

      this.pesquisa.perguntas = this.$store.getters.perguntasCadastradas.map(
        (pergunta, index) => {
          return {
            descricao: pergunta.descricao,
            ordem: index,
            respostas: pergunta.respostas,
          };
        }
      );

      this.loading = true;
      this.$http
        .post(
          `${process.env.VUE_APP_BASE_URL}/pesquisa`,
          this.pesquisa,
          authService.authHeader()
        )
        .then(
          (response) => {
            this.loading = false;
            this.$buefy.toast.open({
              message: "Registro Salvo",
              type: "is-success",
            });
            this.$router.push("/pesquisa/" + response.body.id);
          },
          (error) => {
            this.loading = false;
            this.$buefy.toast.open({
              message: error.message,
              type: "is-danger",
            });
          }
        );
    },
    buscarPesquisa(idPesquisa) {
      this.loading = true;
      this.$http
        .get(
          `${process.env.VUE_APP_BASE_URL}/pesquisa/` + idPesquisa,
          authService.authHeader()
        )
        .then(
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
    removerBairro(bairro) {
      this.$store.commit("removerBairro", bairro);
      this.$buefy.toast.open({
        message: "Bairro " + bairro.nome + " removido",
        type: "is-success",
      });
    },
    removerPergunta(pergunta) {
      this.$store.commit("removerPergunta", pergunta);
      this.$buefy.toast.open({
        message: "Pergunta removida",
        type: "is-success",
      });
    },
    adicionarPerguntaModal() {
      this.$buefy.modal.open({
        parent: this,
        component: AdicionarPergunta,
        trapFocus: true,
        hasModalCard: true,
        customClass: "custom-class custom-class-2",
        width: 1200,
      });
    },
    adicionarPerfil() {
      this.$store.commit("adicionarPergunta", {
        descricao: "Sexo",
        ordem: 1,
        respostas: [
          { descricao: "Masculino", ordem: 0 },
          { descricao: "Feminino", ordem: 1 },
        ],
      });
      this.$store.commit("adicionarPergunta", {
        descricao: "Idade",
        ordem: 1,
        respostas: [
          { descricao: "16 - 28", ordem: 0 },
          { descricao: "29 - 40", ordem: 1 },
          { descricao: "41 - 59", ordem: 2 },
          { descricao: "60+", ordem: 3 },
        ],
      });
      this.$store.commit("adicionarPergunta", {
        descricao: "Religião",
        ordem: 1,
        respostas: [
          { descricao: "Católico", ordem: 0 },
          { descricao: "Evangélico", ordem: 1 },
          { descricao: "Espírita", ordem: 2 },
          { descricao: "Outras", ordem: 3 },
        ],
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
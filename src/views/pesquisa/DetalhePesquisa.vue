<template>
  <div class="card" style="border-radius: 15px;">
    <div class="card-content">
      <div class="titulo">
        <p class="title">
          <b-icon class="mr-1" pack="fas" icon="clipboard-list" size="is-small" />
          Pesquisa {{pesquisa.nome}}
        </p>

        <div>
          <button
            class="button is-link mr-2"
            @click="buscarPesquisa(pesquisa.id)"
            :class="{'is-loading' : loading }"
          >
            <span class="icon is-small">
              <i class="fas fa-sync"></i>
            </span>
          </button>
          <button
            class="button is-link mr-2"
            @click="resultadosRouter()"
            :class="{'is-loading' : loading }"
          >
            <b-icon class="mr-1" pack="fas" icon="chart-pie" size="is-small" />Resultados
          </button>
        </div>
      </div>

      <div v-if="pesquisa.id">
        <div class="columns">
          <div class="column is-5">
            <dadosPesquisa :pesquisa="pesquisa"></dadosPesquisa>
            <b-button
              class="button mt-6"
              type="is-light"
              :loading="loading"
              @click="$router.push('/pesquisa')"
            >
              <span class="icon is-small">
                <i class="fas fa-arrow-left"></i>
              </span>
              <span>Voltar</span>
            </b-button>
          </div>
          <div class="is-divider-vertical" />
          <div class="column is-5">
            <perguntasPesquisa :pesquisa="pesquisa"></perguntasPesquisa>
          </div>
        </div>
      </div>

      <div v-else>
        <Loading />
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../../components/Loading";
import DadosPesquisa from "./DadosPesquisa";
import PerguntasPesquisa from "./PerguntasPesquisa";
import { authService } from "../../_services/authService";

export default {
  components: { Loading, DadosPesquisa, PerguntasPesquisa },
  created() {
    this.buscarPesquisa(this.$route.params.id);
  },
  data() {
    return {
      loading: false,
      pesquisa: {},
    };
  },
  methods: {
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
    resultadosRouter() {
      this.$router.push("/pesquisa-resultado/" + this.$route.params.id);
    },
  },
};
</script>

<style>
.titulo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.pointer {
  cursor: pointer;
}
</style>
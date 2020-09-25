<template>
  <div class="card" style="border-radius: 15px">
    <div class="card-content">
      <div class="titulo">
        <p class="title">
          <b-icon
            class="mr-4"
            pack="fas"
            icon="chart-pie"
            size="is-small"
          />Resultados
        </p>

        <div>
          <button
            class="button is-link mr-2"
            @click="buscarPesquisa($route.params.id)"
            :class="{ 'is-loading': loading }"
          >
            <span class="icon is-small">
              <i class="fas fa-sync"></i>
            </span>
          </button>
          <button
            class="button is-link mr-2"
            @click="exportarXlsx($route.params.id)"
            :class="{ 'is-loading': loading }"
          >
            <b-icon
              class="mr-1"
              pack="fas"
              icon="file-excel"
              size="is-small"
            />Exportar
          </button>
        </div>
      </div>

      <b-field class="has-text-centered" label="Selecione o bairro">
        <b-select
          placeholder="Selecione o Bairro"
          @input="buscarPesquisaBairro()"
          v-model="bairroSelecionado"
        >
          <option
            v-for="bairro in pesquisa.bairroPesquisas"
            :value="bairro.bairro.id"
            :key="bairro.bairro.id"
          >
            {{ bairro.bairro.nome }}
          </option>
        </b-select>
      </b-field>

      <div class="colunas">
        <div v-for="(pergunta, index) in pesquisa.perguntas" :key="pergunta.id">
          <p class="has-text-centered mb-2 subtitle">
            {{ index + 1 }} - {{ pergunta.descricao }}
          </p>
          <Bar ref="bar" :label="pergunta.labels" :total="pergunta.totais" />
        </div>
      </div>

      <div v-if="loading">
        <Loading />
      </div>
    </div>
  </div>
</template>
<script>
import { authService } from "../../_services/authService";
import Bar from "../../components/graficos/Bar";
import Loading from "../../components/Loading";

export default {
  components: { Loading, Bar },
  created() {
    this.buscarPesquisa(this.$route.params.id);
  },
  data() {
    return {
      bairroSelecionado: {},
      loading: false,
      pesquisa: {},
      pesquisaBairro: {},
      labels: [],
    };
  },
  methods: {
    buscarPesquisa(idPesquisa) {
      this.loading = true;
      this.$http
        .get(
          `${process.env.VUE_APP_BASE_URL}/pesquisa/` +
            idPesquisa +
            "/resultado",
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
    buscarPesquisaBairro() {
      console.log("buscarBairro");
      this.loading = true;
      this.$http
        .get(
          `${process.env.VUE_APP_BASE_URL}/pesquisa/` +
            this.$route.params.id +
            "/bairro/" +
            this.bairroSelecionado +
            "/resultado",
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
      this.$refs.bar.render;
    },
  },
};
</script>

<style>
.colunas {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 25px;
}
</style>
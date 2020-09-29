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
          <!-- <button
            class="button is-link mr-2"
            @click="buscarPesquisa($route.params.id)"
            :class="{ 'is-loading': loading }"
          >
            <span class="icon is-small">
              <i class="fas fa-sync"></i>
            </span>
          </button> -->

          <button
            class="button is-link mr-2"
            @click="exportarCsv($route.params.id)"
            :class="{ 'is-loading': loading }"
          >
            <b-icon
              class="mr-1"
              pack="fas"
              icon="file-csv"
              size="is-small"
            />Registros
          </button>
        </div>
      </div>

      <b-field class="has-text-centered" label="Selecione o Bairro:">
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

      <h1 class="subtitle">
        <b-icon class="mr-1" pack="fas" icon="percent" size="is-small" />
        Valores em Porcentagem
      </h1>

      <div class="colunas">
        <div v-for="(pergunta, index) in pesquisa.perguntas" :key="pergunta.id">
          <p class="has-text-centered mb-2 subtitle">
            {{ index + 1 }} - {{ pergunta.descricao }}
          </p>
          <Bar
            ref="bar"
            :label="pergunta.labels"
            :total="pergunta.totaisPorcentagem"
          />
        </div>
      </div>

      <div class="is-divider"></div>

      <h1 class="subtitle">
        <b-icon
          class="mt-5 mr-1"
          pack="fas"
          icon="sort-numeric-up"
          size="is-small"
        />
        Valores Absolutos
      </h1>

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
      csvdata: [],
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
            this.pesquisa.bairroPesquisas.push({
              bairro: { id: 99999, nome: "Resultado Geral" },
            });
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
      if (this.bairroSelecionado === 99999) {
        this.buscarPesquisa(this.$route.params.id);
      } else {
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
              this.pesquisa.bairroPesquisas.push({
                bairro: { id: 99999, nome: "Resultado Geral" },
              });
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
      }
      // this.$refs.bar.render;
    },
    exportarCsv(idPesquisa) {
      this.loading = true;
      this.$http
        .get(
          `${process.env.VUE_APP_BASE_URL}/resultado/pesquisa/` +
            idPesquisa +
            "/exportar",
          authService.authHeader()
        )
        .then(
          (response) => {
            this.csvdata = response.body;

            let anchor = document.createElement("a");
            anchor.href =
              "data:text/csv;charset=utf-8," + encodeURIComponent(this.csvdata);
            anchor.target = "_blank";
            anchor.download = "resultado_pesquisa.csv";
            anchor.click();
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
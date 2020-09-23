<template>
  <div class="card" style="border-radius: 15px;">
    <div class="card-content">
      <div class="titulo">
        <p class="title">
          <b-icon class="mr-4" pack="fas" icon="chart-pie" size="is-small" />Resultados
        </p>

        <div>
          <button
            class="button is-link mr-2"
            @click="buscarPesquisa($route.params.id)"
            :class="{'is-loading' : loading }"
          >
            <span class="icon is-small">
              <i class="fas fa-sync"></i>
            </span>
          </button>
          <button
            class="button is-link mr-2"
            @click="exportarXlsx($route.params.id)"
            :class="{'is-loading' : loading }"
          >
            <b-icon class="mr-1" pack="fas" icon="file-excel" size="is-small" />Exportar
          </button>
        </div>
      </div>

      <div class="columns" v-if="pesquisa.id">
        <div v-for="(pergunta, index) in pesquisa.perguntas" :key="pergunta.id" class="column is-4">
          <p class="has-text-centered mb-2 subtitle">{{ index + 1 }} - {{pergunta.descricao}}</p>
          <Bar :label="pergunta.labels" :total="pergunta.totais" />
        </div>
      </div>

      <div v-else>
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
  components: { Bar, Loading },
  created() {
    this.buscarPesquisa(this.$route.params.id);
  },
  data() {
    return {
      loading: false,
      pesquisa: {},
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
    exportarXlsx(idPesquisa) {
      this.loading = true;
      this.$http
        .get(
          `${process.env.VUE_APP_BASE_URL}/resultado/pesquisa/` +
            idPesquisa +
            "/exportar",
          authService.authHeaderFile()
        )
        .then(
          (response) => {
            this.downloadFile(response, "resultado_pesquisa_" + this.pesquisa.nome);
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
    downloadFile(response, filename) {
      var newBlob = new Blob([response.body], {
        type: "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }

      const data = window.URL.createObjectURL(newBlob);
      var link = document.createElement("a");
      link.href = data;
      link.download = filename + ".xlsx";
      link.click();
      setTimeout(function () {
        window.URL.revokeObjectURL(data);
      }, 100);
    },
  },
};
</script>

<style>
</style>
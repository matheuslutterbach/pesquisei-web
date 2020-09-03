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
            @click="cardModal(null)"
            :class="{'is-loading' : loading }"
          >
            <span>Adicionar</span>
            <span class="icon is-small">
              <i class="fas fa-plus"></i>
            </span>
          </button>
        </div>
      </div>

      <div v-if="pesquisa.id">
        <div class="columns">
          <div class="column is-4">
            <dadosPesquisa :pesquisa="pesquisa"></dadosPesquisa>
          </div>
          <div class="column"></div>
        </div>
      </div>

      <div v-else>
        <Loading />
      </div>

      <!-- <pre> {{pesquisa}} </pre> -->
    </div>
  </div>
</template>

<script>
import Loading from "../../components/Loading";
import DadosPesquisa from "./DadosPesquisa";

export default {
  components: { Loading, DadosPesquisa },
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
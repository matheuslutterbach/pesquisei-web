<template>
  <div class="card" style="border-radius: 15px;">
    <div class="card-content">
      <div class="titulo">
        <p class="title">
          <b-icon class="mr-4" pack="fas" icon="clipboard-check" size="is-small" />Pesquisas
        </p>

        <div>
          <button
            class="button is-link mr-2"
            @click="adicionarRouter()"
            :class="{'is-loading' : loading }"
          >
            <span>Criar Pesquisa</span>
            <span class="icon is-small">
              <i class="fas fa-plus"></i>
            </span>
          </button>

          <button
            class="button is-link is-light mr-2"
            @click="buscarPesquisas()"
            :class="{'is-loading' : loading }"
          >
            <span class="icon is-small">
              <i class="fas fa-sync"></i>
            </span>
          </button>
        </div>
      </div>

      <div v-if="!loading">
        <div v-for="pesquisa in pesquisas" :key="pesquisa.id" class="box">
          <article class="media pointer" @click="carregarPesquisa(pesquisa)">
            <div class="media-left">
              <figure class="image is-64x64">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/000/552/330/non_2x/magnifying-glass-vector-icon.jpg"
                  alt="Image"
                />
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong style="font-size: 17px" class="mr-2">{{pesquisa.id}} - {{pesquisa.nome}}</strong>
                  <small>Criação: {{moment(pesquisa.dataCricao).format('DD-MM-YYYY')}}</small>
                  <br />
                  {{pesquisa.descricao}}
                </p>

                <div class="section-bairros">
                  <div
                    v-for="bairroPesquisas in pesquisa.bairroPesquisas"
                    :key="bairroPesquisas.id"
                  >
                    <b-tag class="mr-2" type="is-info is-light">{{bairroPesquisas.bairro.nome}}</b-tag>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div v-else>
        <Loading />
      </div>

      <div v-if="pesquisas.length === 0">
        <listaVazia></listaVazia>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../../components/Loading";
import ListaVazia from "../../components/ListaVazia";
import { authService } from "../../_services/authService";

export default {
  components: { Loading, ListaVazia },
  created() {
    this.buscarPesquisas();
  },
  data() {
    return {
      loading: false,
      pesquisas: [],
    };
  },
  methods: {
    buscarPesquisas() {
      this.loading = true;
      this.$http
        .get(`${process.env.VUE_APP_BASE_URL}/pesquisa`, authService.authHeader())
        .then(
          (response) => {
            this.pesquisas = response.body;
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
    carregarPesquisa(pesquisa) {
      this.$router.push("/pesquisa/" + pesquisa.id);
    },
    adicionarRouter() {
      this.$router.push("/pesquisa-formulario/");
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

.section-bairros {
  display: flex;
  flex-direction: row;
}

.pointer {
  cursor: pointer;
}
</style>
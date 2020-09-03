<template>
  <div class="card" style="border-radius: 15px;">
    <div class="card-content">
      <div class="titulo">
        <p class="title">Pesquisas</p>

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
          <article class="media">
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
                  <strong style="font-size: 17px" class="mr-3">{{pesquisa.nome}}</strong>
                  <small>Criada em: {{pesquisa.dataCricao}}</small>
                  <br />
                  {{pesquisa.descricao}}
                </p>

                <div class="section-bairros">
                  <div
                    v-for="bairroPesquisas in pesquisa.bairroPesquisas"
                    :key="bairroPesquisas.id"
                  >
                    <b-tag class="mr-2" type="is-info">{{bairroPesquisas.bairro.nome}}</b-tag>
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
    </div>
  </div>
</template>

<script>
import Loading from "../../components/Loading";

export default {
  components: { Loading },
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
      this.$http.get("http://localhost:8060/pesquisa").then(
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
</style>
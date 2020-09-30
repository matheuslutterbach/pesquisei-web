<template>
  <div class="card" style="border-radius: 15px">
    <div class="card-content">
      <div class="titulo">
        <p class="title">
          <b-icon
            class="mr-4"
            pack="fas"
            icon="map-marker-alt"
            size="is-small"
          />Bairros
        </p>

        <div class="titulo">
          <div class="mr-5">
            <b-input
              v-model="filtro"
              icon-pack="fas"
              icon="search"
              v-on:keyup.enter.native="buscarBairros()"
              rounded
            ></b-input>
          </div>
          <button
            class="button is-link mr-2"
            @click="cardModal(null)"
            :class="{ 'is-loading': loading }"
          >
            <span>Adicionar</span>
            <span class="icon is-small">
              <i class="fas fa-plus"></i>
            </span>
          </button>

          <button
            class="button is-link is-light mr-2"
            @click="buscarBairros()"
            :class="{ 'is-loading': loading }"
          >
            <span class="icon is-small">
              <i class="fas fa-sync"></i>
            </span>
          </button>
        </div>
      </div>

      <b-table
        :data="bairros.content"
        :loading="loading"
        :total="bairros.totalElements"
        :per-page="bairros.size"
        paginated
        backend-pagination
        @page-change="onPageChange"
        :icon-prev="prevIcon"
        :icon-next="nextIcon"
        icon-pack="fas"
      >
        <!-- <b-table :data="bairros" :loading="loading"> -->
        <b-table-column width="50" v-slot="props">
          <p style="color: #c0c0c0">{{ props.index + 1 }}</p>
        </b-table-column>

        <b-table-column field="nome" label="Nome" v-slot="props">{{
          props.row.nome
        }}</b-table-column>

        <b-table-column field="cidade" label="Cidade" v-slot="props">{{
          props.row.cidade.nome
        }}</b-table-column>

        <b-table-column
          v-slot="props"
          width="50"
          field="editar"
          custom-key="actions"
        >
          <b-button
            class="button is-info is-light is-small"
            @click.native="cardModal(props.row)"
          >
            <span class="icon is-small">
              <i class="fas fa-pen"></i>
            </span>
          </b-button>
        </b-table-column>
      </b-table>

      <div v-if="bairros.length === 0">
        <listaVazia></listaVazia>
      </div>
    </div>
  </div>
</template>

<script>
import FormBairro from "./FormBairro";
import ListaVazia from "../../components/ListaVazia";
import { authService } from "../../_services/authService";

export default {
  components: { ListaVazia },
  mounted() {
    this.buscarBairros(0);
  },
  data() {
    return {
      loading: false,
      bairros: {},
      filtro: "",
      prevIcon: "chevron-left",
      nextIcon: "chevron-right",
      rangeBefore: 1,
      rangeAfter: 1,
    };
  },
  methods: {
    cardModal(parametro) {
      this.$buefy.modal
        .open({
          parent: this,
          component: FormBairro,
          trapFocus: true,
          hasModalCard: true,
          props: { parametro },
          customClass: "custom-class custom-class-2",
          width: 700,
        })
        .$on("close", () => this.buscarBairros());
    },
    buscarBairros(page) {
      page = page ? page : 0;
      this.loading = true;
      this.$http
        .get(
          `${process.env.VUE_APP_BASE_URL}/bairro/paginacao?filtro=${this.filtro}&page=${page}`,
          authService.authHeader()
        )
        .then(
          (response) => {
            this.bairros = response.body;
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
    onPageChange(page) {
      this.buscarBairros(page - 1);
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
</style>
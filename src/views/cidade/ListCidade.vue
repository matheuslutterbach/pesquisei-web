<template>
  <div class="card" style="border-radius: 15px;">
    <div class="card-content">
      <div class="titulo">
        <p class="title">Cidades</p>

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
            @click="buscarCidades()"
            :class="{'is-loading' : loading }"
          >
            <span class="icon is-small">
              <i class="fas fa-sync"></i>
            </span>
          </button>
        </div>
      </div>

      <b-table :data="cidades" :loading="loading">
        <b-table-column width="50" v-slot="props">
          <p style="color: #c0c0c0">{{ props.index +1 }}</p>
        </b-table-column>

        <b-table-column field="nome" label="Nome" v-slot="props">{{ props.row.nome }}</b-table-column>

        <b-table-column
          field="estadoSigla"
          label="Estado"
          v-slot="props"
        >{{ props.row.estadoSigla }}</b-table-column>

        <b-table-column v-slot="props" width="50" field="editar" custom-key="actions">
          <b-button class="button is-info is-light is-small" @click.native="cardModal(props.row)">
            <span class="icon is-small">
              <i class="fas fa-pen"></i>
            </span>
          </b-button>
        </b-table-column>
      </b-table>
    </div>
  </div>
</template>

<script>
import FormCidade from "./FormCidade";

export default {
  created() {
    this.buscarCidades();
  },
  data() {
    return {
      loading: false,
      cidades: [],
    };
  },
  methods: {
    cardModal(parametro) {
      this.$buefy.modal
        .open({
          parent: this,
          component: FormCidade,
          trapFocus: true,
          hasModalCard: true,
          props: { parametro },
          customClass: "custom-class custom-class-2",
          width: 400,
        })
        .$on("close", () => this.buscarCidades());
    },
    buscarCidades() {
      this.loading = true;
      this.$http.get("http://localhost:8060/cidade").then(
        (response) => {
          this.cidades = response.body;
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
</style>
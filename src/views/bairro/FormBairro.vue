<template>
  <div>
    <div class="modal-card">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(salvar)">
          <header class="modal-card-head">
            <p class="modal-card-title">Bairro</p>

            <button type="button" class="delete" @click="$emit('close')" />
          </header>
          <section class="modal-card-body">
            <ValidationProvider v-slot="{ errors }" name="'Nome'" rules="required">
              <b-field :type="{'is-danger' : errors.length}" label="Nome">
                <b-input v-model="bairro.nome"></b-input>
              </b-field>
              <small class="has-text-danger">{{ errors[0] }}</small>
            </ValidationProvider>

            <ValidationProvider v-slot="{ errors }" name="'Cidade'" rules="required">
              <b-field :type="{'is-danger' : errors.length}" label="Cidade">
                <b-select
                  placeholder="Select a cidade"
                  :loading="loadingCidades"
                  expanded
                  v-model="bairro.cidade"
                >
                  <option v-for="c in cidades" :value="c" :key="c.id">{{ c.nome }}</option>
                </b-select>
              </b-field>
              <small class="has-text-danger">{{ errors[0] }}</small>
            </ValidationProvider>
          </section>
          <footer class="modal-card-foot">
            <div class="footer-buttons">
              <b-button
                class="button"
                type="button"
                :loading="loading"
                @click="$emit('close')"
              >Fechar</b-button>

              <b-button class="button is-primary" :loading="loading" native-type="submit">
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
import { authService } from "../../_services/authService";

export default {
  props: ["parametro"],
  created() {
    if (this.parametro) {
      this.bairro = { ...this.parametro };
    }
    this.buscarCidades();
  },
  data() {
    return {
      loadingCidades: false,
      loading: false,
      bairro: {},
      cidades: [],
    };
  },
  methods: {
    salvar() {
      this.bairro.idCidade = this.bairro.cidade.id;
      if (!this.bairro.id) {
        this.loading = true;
        this.$http
          .post(
            `${process.env.VUE_APP_BASE_URL}/bairro`,
            this.bairro,
            authService.authHeader()
          )
          .then(
            () => {
              this.loading = false;
              this.$buefy.toast.open({
                message: "Registro Salvo",
                type: "is-success",
              });
              this.$parent.close();
            },
            (error) => {
              this.loading = false;
              this.$buefy.toast.open({
                message: error.message,
                type: "is-danger",
              });
              this.$parent.close();
            }
          );
      } else {
        this.loading = true;
        this.$http
          .put(
            `${process.env.VUE_APP_BASE_URL}/bairro/` + this.bairro.id,
            this.bairro,
            authService.authHeader()
          )
          .then(
            () => {
              this.loading = false;
              this.$buefy.toast.open({
                message: "Registro alterado",
                type: "is-success",
              });
              this.$parent.close();
            },
            () => {
              this.loading = false;
              this.$buefy.toast.open({
                message: "Ops..Algo deu errado!",
                type: "is-danger",
              });
              this.$parent.close();
            }
          );
      }
    },
    buscarCidades() {
      this.loadingCidades = true;
      this.$http
        .get(`${process.env.VUE_APP_BASE_URL}/cidade`, authService.authHeader())
        .then(
          (response) => {
            this.cidades = response.body;
            this.loadingCidades = false;
          },
          () => {
            this.$buefy.toast.open({
              message: "Ops..Algo deu errado!",
              type: "is-danger",
            });
            this.loadingCidades = false;
          }
        );
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
</style>
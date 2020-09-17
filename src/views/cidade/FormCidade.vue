<template>
  <div>
    <div class="modal-card">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(salvar)">
          <header class="modal-card-head">
            <p class="modal-card-title">Cidade</p>

            <button type="button" class="delete" @click="$emit('close')" />
          </header>
          <section class="modal-card-body">
            <ValidationProvider v-slot="{ errors }" name="'Nome'" rules="required">
              <b-field :type="{'is-danger' : errors.length}" label="Nome">
                <b-input v-model="cidade.nome"></b-input>
              </b-field>
              <small class="has-text-danger">{{ errors[0] }}</small>
            </ValidationProvider>

            <ValidationProvider v-slot="{ errors }" name="'Estado'" rules="required">
              <b-field label="Estado" :type="{'is-danger' : errors.length}">
                <b-select placeholder="Selecione" v-model="cidade.estadoSigla" expanded>
                  <option value="RJ">RJ</option>
                  <option value="MG">MG</option>
                  <option value="ES">ES</option>
                  <option value="SP">SP</option>
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
      this.cidade = { ...this.parametro };
    }
  },
  data() {
    return {
      loading: false,
      cidade: {},
    };
  },
  methods: {
    salvar() {
      if (!this.cidade.id) {
        this.loading = true;
        this.$http
          .post(
            `${process.env.VUE_APP_BASE_URL}/cidade`,
            this.cidade,
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
            `${process.env.VUE_APP_BASE_URL}/cidade/` + this.cidade.id,
            this.cidade,
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
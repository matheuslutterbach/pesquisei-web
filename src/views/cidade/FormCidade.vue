<template>
  <div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Cidade</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <b-field label="Nome">
          <b-input v-model="cidade.nome"></b-input>
        </b-field>

        <b-field label="Estado">
          <b-select placeholder="Selecione" v-model="cidade.estadoSigla" expanded>
            <option value="RJ">RJ</option>
            <option value="MG">MG</option>
            <option value="ES">ES</option>
            <option value="SP">SP</option>
          </b-select>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <div class="footer-buttons">
          <b-button class="button" type="button" :loading="loading" @click="$emit('close')">Fechar</b-button>
          <b-button class="button is-primary" :loading="loading" @click="salvar">
            <span>Salvar</span>
            <span class="icon is-small">
              <i class="fas fa-save"></i>
            </span>
          </b-button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: ["objeto"],
  data() {
    return {
      loading: false,
      cidade: {}
    };
  },
  methods: {
    salvar() {
      this.loading = true;
      this.$http.post("http://localhost:8060/cidade", this.cidade).then(
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
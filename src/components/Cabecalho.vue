<template>
  <section class="hero is-primary">
    <div class="titulo">
      <div class="logo-titulo">
        <b-icon pack="fas" icon="search" size="is-medium" />
        <a href="/">
          <h1 class="title ml-3">Pesquisei</h1>
        </a>
      </div>

      <div>
        <b-button
          @click="logout"
          v-if="$route.path !== '/login'"
          type="is-primary"
          inverted
          outlined
        >Sair</b-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.nav-color {
  background-color: aliceblue;
}

.titulo {
  padding: 0.9rem 1.2rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.logo-titulo {
  display: flex;
  flex-flow: row nowrap;
}
</style>
<template>
  <section class="hero is-primary">
    <div class="titulo">
      <div class="logo-titulo">
        <b-icon pack="fas" icon="search" size="is-medium" />
        <h1 class="title ml-3">Pesquisei</h1>
      </div>

      <div>
        <b-button type="is-primary" inverted outlined>Sair</b-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
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
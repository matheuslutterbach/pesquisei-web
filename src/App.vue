<template>
  <div id="app">
    <div>
      <cabecalho />
    </div>
    <div class="main">
      <div class="columns">
        <div class="column is-2">
          <menuLateral />
        </div>
        <div class="column">
          <router-view />
        </div>
      </div>
      <!-- <rodape /> -->
    </div>
  </div>
</template>

<script>
import Cabecalho from "@/components/Cabecalho";
import MenuLateral from "@/components/MenuLateral";
// import Rodape from "@/components/Rodape.vue";

export default {
  name: "App",
  components: {
    Cabecalho,
    MenuLateral,
    // Rodape,
  },
};
</script>

<style>
</style>

<template>
  <div class="card ml-3 altura-menu" style="border-radius: 15px;">
    <aside class="menu menu-backgroud">
      <p class="menu-label">Menu</p>
      <ul class="menu-list">
        <li>
          <a href="/cidade">
            <b-icon class="mr-1" pack="fas" icon="building" size="is-small" />Cidades
          </a>
        </li>
        <li>
          <a href="/bairro">
            <b-icon class="mr-1" pack="fas" icon="map-marker-alt" size="is-small" />Bairros
          </a>
        </li>
        <li>
          <a href="/pesquisa">
            <b-icon class="mr-1" pack="fas" icon="clipboard-check" size="is-small" />Pesquisa
          </a>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.menu-backgroud {
  padding: 15px 20px;
}
.altura-menu {
  height: calc(100vh - 100px);
}
</style>

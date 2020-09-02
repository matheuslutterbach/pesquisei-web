<template>
  <div>
    <aside class="menu menu-backgroud">
      <p class="menu-label">Funcionalidades</p>
      <ul class="menu-list">
        <li>
          <a href="/cidade">Cidades</a>
        </li>
        <li>
          <a href="/bairro">Bairros</a>
        </li>
        <li>
          <a class="menu-pai">Pesquisa</a>
          <ul>
            <li>
              <a href="/migracao/executar-migracao">Cadastrar</a>
            </li>
            <li>
              <a href="/migracao/acompanhar-migracao">Resultados</a>
            </li>
          </ul>
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
  background-color: #f8f8f8;
  padding: 15px 20px;
}
.menu-pai {
  cursor: auto;
}
</style>

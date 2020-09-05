<template>
  <div>
    <div class="title is-4">Perguntas</div>
    <div v-for="pergunta in pesquisa.perguntas" :key="pergunta.id">
      <p>{{pergunta.ordem}} - {{pergunta.descricao}}</p>

      <ol class="ml-5 mt-2" type="A">
        <li v-for="resposta in pergunta.respostas" :key="resposta.id">{{resposta.descricao}}</li>
      </ol>
      <div class="is-divider"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["pesquisa"],
};
</script>

<style>
</style>
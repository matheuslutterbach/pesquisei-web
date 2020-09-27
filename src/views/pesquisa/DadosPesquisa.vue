<template>
  <div>
    <p class="mt-1">
      <strong>Nome:</strong>
      {{pesquisa.nome}}
    </p>

    <p class="mt-1">
      <strong>Descrição:</strong>
      {{pesquisa.descricao}}
    </p>

    <p class="mt-1">
      <strong>Data de criação:</strong>
      {{moment(pesquisa.dataCricao).format('DD-MM-YYYY')}}
    </p>

    <p class="mt-1 mb-1">
      <strong>Número requerido de entrevistados:</strong>
      {{pesquisa.numeroEntrevistados}}
    </p>

    <strong>Bairros:</strong>
    <b-table :data="pesquisa.bairroPesquisas">
      <b-table-column width="50" v-slot="props">
        <p style="color: #c0c0c0">{{ props.index +1 }}</p>
      </b-table-column>

      <b-table-column field="bairro" label="Bairro" v-slot="props">
        <p>{{ props.row.bairro.nome }}</p>
      </b-table-column>

      <b-table-column field="cidade" label="Cidade" v-slot="props">
        <p>{{ props.row.bairro.cidade.nome }} - {{props.row.bairro.cidade.estadoSigla}}</p>
      </b-table-column>

      <b-table-column field="quantidade" label="Quantidade" v-slot="props">
        <p>{{ props.row.quantidade}} </p>
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
export default {
  props: ["pesquisa"],
};
</script>

<style>
</style>
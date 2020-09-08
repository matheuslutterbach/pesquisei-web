<template>
  <div class="has-text-centered mb-5 mt-6">
    <p class="p-sm">
      <b-icon :icon="icon" pack="fas" size="is-medium" />
      <br />
      {{ mensagem }}
    </p>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    mensagem: {
      type: String,
      default: "Nenhum registro localizado.",
    },
    icon: {
      type: String,
      default: "frown",
    },
  },
};
</script>

<style scoped>
div {
  color: #aaa !important;
}
</style>
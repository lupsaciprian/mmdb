<template>
  <div class="alert" :class="alertType" role="alert">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  computed: {
    alertType() {
      return `alert-${this.type}`;
    },
  },
};
</script>

<style></style>

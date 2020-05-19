<template>
  <button :class="classes" type="button" :disabled="isLoading || disabled">
    <span
      v-if="isLoading"
      class="spinner-border spinner-border-sm mr-2"
      role="status"
      aria-hidden="true"
    ></span>
    <span v-if="isLoading">Loading... </span>
    <slot v-if="!isLoading"></slot>
  </button>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
    classes: {
      type: String,
      default: 'btn btn-primary btn-lg btn-block',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>

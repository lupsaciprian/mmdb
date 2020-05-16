<template>
  <div class="align-items-center">
    <button
      v-for="option in options"
      @click="select(option)"
      :key="option.id"
      type="button"
      class="btn mr-1 mb-1"
      :class="[
        selectedId === option.id ? 'btn-success' : 'btn-outline-dark',
        `btn-${buttonSize}`
      ]"
    >
      {{ option.name }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    buttonSize: {
      type: String,
      default: "sm"
    }
  },
  data() {
    return {
      selectedId: null
    };
  },
  methods: {
    select(option) {
      if (this.selectedId !== option.id) {
        this.selectedId = option.id;
        this.$emit("optionSelected", option);
      }
    }
  }
};
</script>

<style></style>

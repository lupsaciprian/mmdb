<template>
  <div class="align-items-center">
    <button
      v-for="option in options"
      @click="select(option)"
      :key="option.id"
      type="button"
      :disabled="option.disabled"
      :class="[
        (option.preselected && !selectedId) || selectedId === option.id
          ? 'btn-success animate__animated animate__flash'
          : 'btn-outline-dark',
        `btn-${buttonSize}`,
        classes
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
    },
    classes: {
      type: String,
      default: "btn mr-1 mb-1"
    }
  },
  data() {
    return {
      selectedId: null
    };
  },
  watch: {
    $route(to, from) {
      if (to !== from) this.selectedId = null;
    }
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

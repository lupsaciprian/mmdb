<template>
  <div>
    <button
      v-if="!reveal"
      @click="revealFired"
      type="button"
      class="btn btn-outline-secondary btn-lg btn-block"
    >
      <slot></slot>
    </button>

    <div>
      <slot
        name="content"
        v-if="reveal"
      ></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contentId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      reveal: false
    };
  },
  methods: {
    revealFired() {
      this.reveal = true;
      this.$emit("revealFired", this.contentId);
    }
  }
};
</script>

<style></style>

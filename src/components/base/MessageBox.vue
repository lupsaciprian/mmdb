<template>
  <div
    class=" mb-2 w-100 h-100 d-flex justify-content-center align-items-center"
    :class="markContainerColors()"
  >
    <div class="my-4 pl-4 text-left border-left bw-4">
      <slot name="heading"></slot>
      <slot name="details"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "default"
    }
  },
  methods: {
    markContainerColors() {
      console.log("type", this.type);
      if (this.type === "danger") return ["text-white", "bg-danger"];
      if (this.type === "info") return ["text-white", "bg-info"];
      if (this.type === "default") return ["text-dark", "bg-light"];
    }
  }
};
</script>

<style></style>

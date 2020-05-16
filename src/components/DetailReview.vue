<template>
  <div class="mb-2 text-left">
    <h5
      v-once
      class="mt-0 border-left font-weight-bold bw-4 border-info pl-2"
    >{{review.author}}</h5>
    <p> {{review.content.substr(0, 250)}}</p>
  </div>

</template>

<script>
export default {
  props: {
    review: {
      type: Object,
      required: true
    }
  }
};
</script>

<style></style>

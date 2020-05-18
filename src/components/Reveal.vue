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
      >
        <app-message-box>
          <h4 slot="heading">{{ fallbackText }}</h4>
        </app-message-box>
      </slot>
    </div>
  </div>
</template>

<script>
import MessageBoxVue from "./base/MessageBox.vue";
export default {
  components: {
    appMessageBox: MessageBoxVue
  },
  props: {
    contentId: {
      type: String,
      required: true
    },
    fallbackText: {
      type: String,
      default: "No content to show."
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

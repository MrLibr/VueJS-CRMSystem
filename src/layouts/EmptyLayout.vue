<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from '../utils/messages';

export default {
  computed: {
    error() {
      return this.$store.getters.errors;
    },
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Some Problems');
    },
  },
};
</script>

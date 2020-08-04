<template>
  <div class="track-button" @click="e => $emit('custom-event', item, e)">
    click me
  </div>
</template>

<script>
export default {
  computed: {
    item: () => ({
      id: Date.now().toString(36)
    })
  }
};
</script>

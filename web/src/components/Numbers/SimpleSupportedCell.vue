<template functional>
  <div>
    <span v-if="props.isSupported" class="supported">supported</span>
    <span v-else class="not-supported">not supported</span>
  </div>
</template>

<script>
export default {
  name: 'simple-supported-cell',
  props: {
    isSupported: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
.supported {
  color: $__accent-colour;
}
.not-supported {
  color: $__primary-colour;
}
</style>

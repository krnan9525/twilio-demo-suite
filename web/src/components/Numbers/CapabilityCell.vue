<template functional>
  <div>
    <div>
      <div>
        <span class="md-caption __m-r-2">IN</span>
        <md-icon v-if="props.inEnabled" class="enabled">phone_enabled</md-icon>
        <md-icon v-else class="not-enabled">phone_disabled</md-icon>
      </div>
      <div>
        <span class="md-caption __m-r-2">OUT</span>
        <md-icon v-if="props.outEnabled" class="enabled">phone_enabled</md-icon>
        <md-icon v-else class="not-enabled">phone_disabled</md-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'capability-cell',
  props: {
    inEnabled: {
      type: Boolean,
      required: true
    },
    outEnabled: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
.enabled.md-icon.md-theme-default.md-icon-font {
  color: $__accent-colour;
}
.not-enabled.md-icon.md-theme-default.md-icon-font {
  color: $__primary-colour;
}
</style>

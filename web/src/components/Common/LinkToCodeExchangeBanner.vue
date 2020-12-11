<template>
  <div class="link-banner-container __m-t-3">
    <span class="md-body-2">{{ bannerText }}</span>
    <div class="__m-l-2">
      <a :href="link" target="_blank">
        <span class="md-body-2 __link">Link</span>
      </a>
      <md-icon>open_in_new</md-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'link-to-code-change-banner',
  props: {
    bannerText: {
      type: String,
      default:
        'Like what you see? You can create one yourself without any coding. See our example on Code Exchange:'
    },
    link: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.link-banner-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 30px;
  align-items: center;
}
.__link {
  font-weight: 900;
}
</style>

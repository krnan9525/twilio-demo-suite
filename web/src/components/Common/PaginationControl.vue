<template>
  <div class="page-control-container">
    <md-button
      v-if="nextPageToken"
      class="md-primary page-button next-page"
      @click="switchPage(nextPageToken)"
    >
      Next Page
    </md-button>
    <md-button
      v-if="previousPageToken"
      class="md-primary page-button last-page"
      @click="switchPage(previousPageToken)"
    >
      Previous Page
    </md-button>
  </div>
</template>

<script>
export default {
  name: 'PaginationControl',
  props: {
    nextPageToken: null,
    previousPageToken: null
  },
  methods: {
    switchPage(pageToken) {
      this.$emit('page-changed', pageToken);
    }
  }
};
</script>

<style lang="scss" scoped>
.page-control-container {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-content: flex-end;
}
</style>

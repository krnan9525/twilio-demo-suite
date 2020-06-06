<template>
  <div>
    <md-button class="md-raised md-primary" @click="onSaveClicked">
      Save
    </md-button>
    <div
      :class="{
        'transition-start': transitionStage === 0,
        'transition-peak': transitionStage === 1,
        'transition-end': transitionStage === 2
      }"
      :style="{
        transition: `all ease-in ${transition}ms`
      }"
      class="transition-mask"
    ></div>
    <div class="transition-mask-bg" v-if="transitionStage > 1"></div>
  </div>
</template>

<style lang="scss" scoped>
.transition-mask {
  background: $__primary-colour;
  overflow: hidden;
  position: fixed;
  z-index: 100;
  &.transition- {
    &start,
    &end {
      border-radius: 50%;
      width: 0;
      height: 0;
      left: 50%;
      bottom: 0;
      opacity: 0;
    }
    &peak {
      border-radius: 0;
      width: 100vw;
      height: 100vh;
      left: 0;
      bottom: 0;
      opacity: 100;
    }
  }
}
.transition-mask-bg {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  background: white;
}
</style>

<script>
export default {
  name: 'full-page-reveal-button',
  props: {
    // in ms, animation duration
    transition: {
      type: Number,
      default: 200
    },
    // define either is two-stage animation or three-stage, including an ease-in
    easeIn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      transitionStage: 0
    };
  },
  methods: {
    onSaveClicked() {
      this.$emit('click', fn => {
        // start transition when network success
        ++this.transitionStage;
        const timer = setInterval(() => {
          if (this.transitionStage >= (this.easeIn === true ? 2 : 1)) {
            clearInterval(timer);
            this.$emit('animation-stopped');
          }
          this.transitionStage = ++this.transitionStage % 3;
        }, this.transition);
        if (typeof fn === 'function') {
          // fn is passed by this component's caller. It will be called when the transition is finished.
          setTimeout(
            () => fn(),
            this.transition * (this.easeIn === true ? 2 : 1) + 10
          );
        }
      });
    }
  }
};
</script>

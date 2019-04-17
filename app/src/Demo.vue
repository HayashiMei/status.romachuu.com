<template>
  <div class="app">
    <div ref="count" @click="start" class="count">{{ count }}</div>
    <a-input-group compact class="input">
      <a-input v-model="t1" style="width: 25%"/>
      <a-input v-model="stopTime" style="width: 25%"/>
      <a-input v-model="t2" style="width: 25%"/>
      <a-input v-model="fontSize" style="width: 25%"/>
    </a-input-group>
  </div>
</template>

<script>
import BezierEasing from 'bezier-easing';
import Velocity from 'velocity-animate';

const bezier = BezierEasing(0.25, 0.1, 0.25, 1);

export default {
  data: () => ({
    count: 0,
    target: 1000,
    isAnimating: false,
    isAnimatingEnd: false,
    animeTime: 0,
    t1: 400,
    stopTime: 100,
    t2: 100,
    fontSize: 2,
  }),
  methods: {
    start() {
      if (this.isAnimating) {
        return;
      }

      this.isAnimating = true;
      this.count = 0;
      Velocity(this.$refs.count, { scale: this.fontSize }, { duration: this.t1, easing: [0.25, 0.1, 0.25, 1] });
      setTimeout(this.end, Number(this.t1) + Number(this.stopTime));
      requestAnimationFrame(this.step);
    },
    end() {
      Velocity(this.$refs.count, { scale: 1 }, { duration: this.t2 });
      setTimeout(() => {
        this.isAnimating = false;
      }, this.t2);
    },
    step(timestamp) {
      this.animeTime = this.animeTime || timestamp;

      if (timestamp - this.animeTime < Number(this.t1)) {
        const f = bezier((timestamp - this.animeTime) / Number(this.t1));
        const nextCount = Math.ceil(f * this.target);
        this.count = nextCount;
        console.info((timestamp - this.animeTime) / 2000, f, this.count);

        this.animeId = window.requestAnimationFrame(this.step);
      } else {
        this.count = this.target;
        this.animeTime = 0;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  font-size: 30px;

  .count {
    margin-bottom: 10px;
  }

  .input {
    position: absolute;
    bottom: 10%;
    width: 50%;
  }
}
</style>

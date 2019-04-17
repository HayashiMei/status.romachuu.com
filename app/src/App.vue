<template>
  <div class="app">
    <!-- <app-header @countdown="handleCountdown"></app-header>
    <div class="container">
      <vue-scroll>
        <router-view ref="dashboard"/>
        <app-footer></app-footer>
      </vue-scroll>
    </div>
    <transition name="fade">
      <loading v-if="showLoading"/>
    </transition>
    <transition name="fade">
      <message-modal
        v-show="showMsg"
        :show="showMsg"
        :msg-title="msgTitle"
        :msg-sub-title="msgSubTitle"
        :msg-content="msgContent"
        @close="handleClose"
      ></message-modal>
    </transition>-->
    <div ref="count" @click="start" class="count">{{ count }}</div>
    <a-input-group compact class="input">
      <a-input v-model="t1" style="width: 25%" />
      <a-input v-model="stopTime" style="width: 25%" />
      <a-input v-model="t2" style="width: 25%" />
      <a-input v-model="fontSize" style="width: 25%" />
    </a-input-group>
  </div>
</template>

<script>
import BezierEasing from 'bezier-easing';
import Velocity from 'velocity-animate';
// import { mapState, mapMutations } from 'vuex';

// import AppHeader from './components/AppHeader.vue';
// import AppFooter from './components/AppFooter.vue';
// import Loading from './components/Loading.vue';
// import MessageModal from './components/MessageModal.vue';

const bezier = BezierEasing(0.25, 0.1, 0.25, 1);

export default {
  // components: { AppHeader, AppFooter, Loading, MessageModal },
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
  computed: {
    // ...mapState(['showLoading', 'showMsg', 'msgTitle', 'msgSubTitle', 'msgContent']),
  },
  methods: {
    // ...mapMutations(['setShowMsg']),
    // handleClose() {
    //   this.setShowMsg(false);
    // },
    // handleCountdown() {
    //   this.$refs.dashboard.fetchData();
    // },
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

  .container {
    height: calc(100vh - 64px);
  }

  font-size: 30px;

  .isAnimating {
    animation: up 400ms ease 0s normal forwards running;
  }

  .isAnimatingEnd {
    animation: down 100ms linear 0s normal forwards running;
  }

  .count {
    margin-bottom: 10px;
  }

  .input {
    position: absolute;
    bottom: 10%;
    width: 50%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@keyframes up {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(2);
  }
}

@keyframes down {
  0% {
    transform: scale(2);
  }

  100% {
    transform: scale(1);
  }
}
</style>

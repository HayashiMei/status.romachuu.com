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
    <div
      ref="count"
      :class="{ 'isAnimating': isAnimating, 'isAnimatingEnd': isAnimatingEnd }"
      @click="start"
    >{{ count }}</div>
  </div>
</template>

<script>
import BezierEasing from 'bezier-easing';
// import { mapState, mapMutations } from 'vuex';

// import AppHeader from './components/AppHeader.vue';
// import AppFooter from './components/AppFooter.vue';
// import Loading from './components/Loading.vue';
// import MessageModal from './components/MessageModal.vue';

const bezier = BezierEasing(.25,.1,.25,1);

export default {
  // components: { AppHeader, AppFooter, Loading, MessageModal },
  data: () => ({
    count: 0,
    target: 1000,
    isAnimating: false,
    isAnimatingEnd: false,
    animeTime: 0,
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
      this.count = 0;
      this.isAnimating = true;
      setTimeout(this.end, 2500);
      requestAnimationFrame(this.step);
    },
    end() {
      this.isAnimatingEnd = true;
      setTimeout(() => {
        this.isAnimating = false;
        this.isAnimatingEnd = false;
      }, 1000);
    },
    step(timestamp) {
      this.animeTime = this.animeTime || timestamp;

      if (timestamp - this.animeTime < 2000) {
        const f = bezier((timestamp - this.animeTime) / 2000);
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
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;

  .container {
    height: calc(100vh - 64px);
  }

  font-size: 30px;

  .isAnimating {
    animation: up 2s ease 0s normal forwards running;
  }

  .isAnimatingEnd {
    animation: down 1s linear 0s normal forwards running;
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

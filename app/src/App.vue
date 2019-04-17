<template>
  <div class="app">
    <app-header @countdown="handleCountdown"></app-header>
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
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import Loading from './components/Loading.vue';
import MessageModal from './components/MessageModal.vue';

export default {
  components: { AppHeader, AppFooter, Loading, MessageModal },
  computed: {
    ...mapState(['showLoading', 'showMsg', 'msgTitle', 'msgSubTitle', 'msgContent']),
  },
  methods: {
    ...mapMutations(['setShowMsg']),
    handleClose() {
      this.setShowMsg(false);
    },
    handleCountdown() {
      this.$refs.dashboard.fetchData();
    },
  },
};
</script>

<style lang="scss" scoped>
.app {
  height: 100vh;
  width: 100vw;

  .container {
    height: calc(100vh - 64px);
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
</style>

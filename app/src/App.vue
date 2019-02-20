<template>
  <div class="app">
    <app-header @countdown="handleCountdown"></app-header>
    <div class="container">
      <vue-scroll>
        <dashboard ref="dashboard" @render="handleRender" @error="handleError"></dashboard>
        <app-footer></app-footer>
      </vue-scroll>
    </div>
    <transition name="fade">
      <loading v-if="showLoad"/>
    </transition>
    <transition name="fade">
      <message-modal
        v-show="showMessage"
        :show="showMessage"
        :message-title="messageTitle"
        :content-title="messageTitle"
        :content-text="messageContent"
        @close="handleClose"
      ></message-modal>
    </transition>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import Loading from './components/Loading.vue';
import MessageModal from './components/MessageModal.vue';
import Dashboard from './views/Dashboard.vue';

export default {
  components: { AppHeader, AppFooter, Dashboard, Loading, MessageModal },
  data: () => ({
    showLoad: true,
    showMessage: false,
    messageTitle: '',
    messageContent: '',
  }),
  methods: {
    handleRender() {
      this.showLoad = false;
    },
    handleClose() {
      this.showMessage = false;
    },
    handleCountdown() {
      this.$refs.dashboard.update();
    },
    handleError(e) {
      this.messageTitle = e.message;
      this.messageContent = 'An error occurred, please try again later...';
      this.showMessage = true;
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
  transition: opacity 0.6s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <div class="app">
    <app-header></app-header>
    <div class="container" @click="showMessage = true">
      <vue-scroll>
        <dashboard @render="handleRender"></dashboard>
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
        message-title="メッセージが届いています"
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
    showLoad: false,
    showMessage: true,
  }),
  methods: {
    handleRender() {
      this.showLoad = false;
    },
    handleClose() {
      this.showMessage = false;
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

<template>
  <div class="app">
    <app-header></app-header>
    <dashboard></dashboard>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import Dashboard from './views/Dashboard.vue';

export default {
  components: { AppHeader, AppFooter, Dashboard },
  data: () => ({}),
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.app {
  height: 100%;
  width: 100%;
  padding-top: 64px;
}
</style>

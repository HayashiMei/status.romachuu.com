<template>
  <header>
    <div class="title">
      <logo class="logo"></logo>
      <span>{{ title }}</span>
    </div>

    <div class="status">
      <span :class="computedClass"></span>
      <p class="status__cd">Refreshing in {{ cd }} secs</p>
    </div>
  </header>
</template>

<script>
import Logo from './Logo.vue';

export default {
  components: {
    Logo,
  },
  props: {
    monitorCount: Number,
    downCount: Number,
  },
  data: () => ({
    title: "Roma's monitors",
    cd: 60,
  }),
  computed: {
    computedClass() {
      return [
        'status__bullet',
        {
          'status__bullet--success': this.downCount === 0,
          'status__bullet--danger': this.monitorCount / 2 < this.downCount,
          'status__bullet--warning': this.monitorCount / 2 > this.downCount && this.downCount !== 0,
        },
      ];
    },
  },
  mounted() {
    setInterval(this.updateCountdown, 1000);
  },
  methods: {
    updateCountdown() {
      if (this.cd === 1) {
        this.cd = 60;
        return;
      }

      this.cd--;
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 20px;
  font-family: 'Roboto Mono', monospace;
  background-color: #212121;
}

.title {
  display: flex;
  align-items: center;
  font-size: 20px;

  .logo {
    height: 40px;
    width: 40px;
    margin-right: 15px;
  }
}

.status {
  display: flex;
  align-items: center;

  .status__bullet {
    width: 28px;
    height: 28px;
    margin-right: 15px;
    border-radius: 100%;
    background-color: #4caf50;
  }

  .status__cd {
    margin-right: 1px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1;
  }
}
</style>

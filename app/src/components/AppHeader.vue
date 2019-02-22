<template>
  <header>
    <div class="title" @click="handleClick">
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
import { mapState, mapMutations } from 'vuex';
import Logo from './Logo.vue';

export default {
  components: {
    Logo,
  },
  data: () => ({
    title: "Roma's monitors",
  }),
  computed: {
    computedClass() {
      return [
        'status__beat',
        {
          'status__beat--success': this.downCount === 0,
          'status__beat--danger': this.monitorCount / 2 < this.downCount,
          'status__beat--warning': this.monitorCount / 2 > this.downCount && this.downCount !== 0,
        },
      ];
    },
    ...mapState(['showLoading', 'cd']),
  },
  mounted() {
    setInterval(this.updateCountdown, 1000);
  },
  methods: {
    ...mapMutations(['updateCD']),
    updateCountdown() {
      this.updateCD();

      if (this.cd === 60) {
        this.$emit('countdown');
      }
      // if (this.showLoading) {
      //   return;
      // }

      // if (this.cd === 1) {
      //   this.cd = 60;
      //   this.$emit('countdown');
      //   return;
      // }

      // this.cd--;
    },
    handleClick() {
      this.$router.push({ name: 'home' });
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
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);

  @media (max-width: 720px) {
    justify-content: center;
  }
}

.title {
  display: flex;
  align-items: center;
  font-size: 20px;
  cursor: pointer;

  .logo {
    height: 40px;
    width: 40px;
    margin-right: 15px;
  }
}

.status {
  display: flex;
  align-items: center;

  @media (max-width: 720px) {
    display: none;
  }

  .status__beat {
    width: 28px;
    height: 28px;
    margin-right: 15px;
    border-radius: 100%;
    background-color: #4caf50;
    animation: beat 1s cubic-bezier(0.7, -0.02, 0.24, 0.98) 0s infinite normal none running;
  }

  .status__cd {
    margin-right: 1px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1;
  }
}

@keyframes beat {
  0% {
    transform: scale(1);
    border-radius: 50%;
  }

  50% {
    transform: scale(0.7);
    border-radius: 50%;
  }

  100% {
    transform: scale(1);
    border-radius: 50%;
  }
}
</style>

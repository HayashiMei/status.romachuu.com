<template>
  <footer>
    <div class="provided">
      <span>Provided by:</span>
      <a
        href="https://uptimerobot.com"
        rel="nofollow"
      >
        <div class="uptime-logo" />
      </a>
    </div>
    <div class="copyright">
      <template>{{ copyRightYear }}</template>
      <span class="with-love">
        <i class="fa fa-star" />
      </span>
      <a
        class="author"
        itemprop="copyrightHolder"
        href="https://github.com/HayashiMei"
      >{{ author }}</a>
    </div>
  </footer>
</template>

<script>
export default {
  data: () => ({
    start: 2019,
    author: 'Roma',
  }),
  computed: {
    copyRightYear() {
      const currentYear = new Date().getFullYear();
      return `© ${this.start}` + (currentYear === this.start ? '' : ` - ${currentYear}`);
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 96px;
  padding: 0 20px;
  font-family: Roboto, monospace;
  color: #000;
  background-color: #eee;
}

.provided {
  display: flex;
  align-items: center;
  white-space: nowrap;

  span {
    margin-right: 4px;
    color: #80ba27;
    font-size: 12px;
  }

  .uptime-logo {
    width: 114px;
    height: 35px;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url('../../images/uptime-logo.png');
  }
}

.copyright {
  line-height: 1;
  white-space: nowrap;

  .with-love {
    margin: 0 5px;
    color: #f44336;
  }

  .author {
    color: initial;
    text-decoration: none;
    transition: color 0.2s linear 0s;

    &:hover {
      color: #f44336;
      text-decoration: underline;
    }
  }
}
</style>

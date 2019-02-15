<template>
  <footer>
    <div class="copyright">
      <template>{{ copyRightYear }}</template>
      <span class="with-love">
        <i class="fa fa-star"></i>
      </span>
      <span class="author" itemprop="copyrightHolder">{{ ' ' + author }}</span>
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
  justify-content: center;
  height: 96px;
  font-family: Roboto, monospace;
  color: #000;
  background-color: #eee;
}

.with-love {
  margin: 0 5px;
  color: #f44336;
}
</style>

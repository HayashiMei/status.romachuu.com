<template>
  <div class="latest-downtime">
    <h1 class="md-title">Latest Downtime</h1>
    <div class="latest-downtime__content">{{ content }}</div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.latest-downtime__content {
  padding-right: 10px;
  margin-bottom: 12px;
  font-size: 14px;
}
</style>

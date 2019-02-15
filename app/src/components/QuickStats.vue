<template>
  <div class="quick-stats">
    <h1 class="md-title">Quick Stats</h1>
    <div class="ratio-item">
      <span class="ratio-item__inner"
        :class="{ success: Number(last24Hours) >= 85, warning: Number(last24Hours) < 85 }"
      >{{ last24Hours + '%' }}</span>
      <span>{{ last24HoursTip }}</span>
    </div>
    <div class="ratio-item">
      <span class="ratio-item__inner"
        :class="{ success: Number(last7Days) >= 85, warning: Number(last7Days) < 85 }"
      >{{ last7Days + '%' }}</span>
      <span>{{ last7DaysTip }}</span>
    </div>
    <div class="ratio-item">
      <span class="ratio-item__inner"
        :class="{ success: Number(last30Days) >= 85, warning: Number(last30Days) < 85 }"
      >{{ last30Days + '%' }}</span>
      <span>{{ last30DaysTip }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ratios: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    last24HoursTip: ' (last 24 hours)',
    last7DaysTip: ' (last 7 days)',
    last30DaysTip: ' (last 30 days)',
  }),
  computed: {
    last24Hours() {
      return this.ratios.l1.ratio;
    },
    last7Days() {
      return this.ratios.l7.ratio;
    },
    last30Days() {
      return this.ratios.l30.ratio;
    },
  },
};
</script>

<style lang="scss" scoped>
.ratio-item {
  margin-bottom: 12px;
  font-size: 18px;

  .ratio-item__inner {
    font-weight: bold;
  }
}

.success {
  color: #bbdf88;
}

.warning {
  color: #f07178;
}
</style>

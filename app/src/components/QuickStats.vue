<template>
  <div class="quick-stats">
    <h1>Quick Stats</h1>
    <div class="quick-stats-item">
      <div class="status__bullet up" />
      <div class="quick-stats-item__count up">
        <span>Up</span>
        <span>{{ up }}</span>
      </div>
    </div>
    <div class="quick-stats-item">
      <div class="status__bullet down" />
      <div class="quick-stats-item__count down">
        <span>Down</span>
        <span>{{ down }}</span>
      </div>
    </div>
    <div class="quick-stats-item">
      <div class="status__bullet paused" />
      <div class="quick-stats-item__count paused">
        <span>Paused</span>
        <span>{{ paused }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    up: {
      type: Number,
      required: true,
    },
    down: {
      type: Number,
      required: true,
    },
    paused: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
$up: #bbdf88;
$down: #f07178;
$paused: #9c9b9b;

.quick-stats-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-size: 18px;

  .status__bullet {
    width: 28px;
    height: 28px;
    border-radius: 100%;
    margin-right: 15px;

    &.up {
      background-color: $up;
    }

    &.down {
      background-color: $down;
    }

    &.paused {
      background-color: $paused;
    }
  }

  .quick-stats-item__count {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100% - 43px);

    &.up {
      color: $up;
    }

    &.down {
      color: $down;
    }

    &.paused {
      color: $paused;
    }
  }
}
</style>

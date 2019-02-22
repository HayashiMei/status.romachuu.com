<template>
  <div class="monitor-log">
    <h1>Latest Events for {{ serverName }}</h1>
    <div class="grid">
      <div class="header">
        <div class="header__item col col--status">
          <div>Event</div>
        </div>
        <div class="header__item col col--datetime">
          <div>Date-Time</div>
        </div>
        <div class="header__item col col--reason">
          <div>Reason</div>
        </div>
        <div class="header__item col col--duration">
          <div>Duration</div>
        </div>
      </div>
      <div v-for="(item, index) in data" :key="index" class="row">
        <div class="row__item col col--status">
          <div :class="item.status">{{ item.status }}</div>
        </div>
        <div class="row__item col col--datetime">
          <div>{{ item.datetime }}</div>
        </div>
        <div class="row__item col col--reason">
          <div :class="item.status">{{ item.reason }}</div>
        </div>
        <div class="row__item col col--duration">
          <div>{{ item.duration }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    serverName: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  data: () => ({}),
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.grid {
  overflow-x: auto;
}

.header,
.row {
  display: flex;
  min-width: 960px;
  text-align: center;

  .col {
    width: calc((100% - 3px) / 4);

    &:not(:last-child) {
      border-right: 1px solid rgba(255, 255, 255, 0.12);
    }
  }
}

.header__item {
  color: rgba(255, 255, 255, 0.7);
  font-size: 20px;

  div {
    padding: 14px 10px;
    line-height: 28px;
  }
}

.row {
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
}

.row__item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 10px;
  font-size: 15px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    width: 100%;
  }

  &.col--status div {
    border-radius: 4px;
    color: #fff;

    &.up {
      background-color: #4caf50;
    }

    &.down {
      background-color: #f07178;
    }
  }

  &.col--reason div {
    &.up {
      color: #bbdf88;
    }

    &.down {
      color: #f07178;
    }
  }
}

.empty {
  div {
    background-color: #9c9b9b;
  }
}
</style>

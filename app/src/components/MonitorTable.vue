<template>
  <div class="monitor-table">
    <h1>
      <template>{{ serverName }}</template>
      <span class="type">({{ type }} - Checked every 5 mins)</span>
    </h1>
    <div class="grid">
      <div class="header">
        <div v-for="item in header" :key="item" class="header__item col">
          <div>{{ item }}</div>
        </div>
      </div>
      <div class="row">
        <div v-for="item in data" :key="item.label" class="row__item col" :class="item.classes">
          <div>{{ item.value }}</div>
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
    type: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    header() {
      return this.data.map(item => item.label);
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.type {
  margin-left: 6px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
}

.grid {
  overflow-x: auto;
  background-color: #424242;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.header,
.row {
  display: flex;
  min-width: 960px;
  text-align: center;

  .col {
    width: calc(100% / 7);
  }
}

.header__item {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;

  div {
    padding: 14px 10px;
    line-height: 28px;
  }
}

.row {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
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
  font-size: 13px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    width: 100%;
  }
}

.success {
  div {
    background-color: #4caf50;
  }
}

.empty {
  div {
    background-color: #9c9b9b;
  }
}
</style>

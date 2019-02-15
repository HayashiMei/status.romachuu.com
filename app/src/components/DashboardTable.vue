<template>
  <div class="dashboard-table">
    <h1 class="md-title">{{ title }}</h1>
    <md-table md-card>
      <md-table-row>
        <md-table-head class="head--one-week-ratio">Last 7 Days</md-table-head>
        <md-table-head class="head--name">Name</md-table-head>
        <md-table-head class="head--type">Type</md-table-head>
        <md-table-head>Interval</md-table-head>
        <template v-for="d in days">
          <md-table-head>{{ d }}</md-table-head>
        </template>
      </md-table-row>
      <template v-for="item in list">
        <md-table-row>
          <md-table-cell
            :class="{ success: String(item.oneWeekRange.ratio) >= 85, warning: String(item.oneWeekRange.ratio) < 85 }"
          >{{ item.oneWeekRange.ratio + '%' }}</md-table-cell>
          <md-table-cell class="col--name">{{ item.name }}</md-table-cell>
          <md-table-cell>{{ item.typeStr }}</md-table-cell>
          <md-table-cell>{{ item.intervalMin + ' mins' }}</md-table-cell>
          <template v-for="subItem in item.customuptimeranges">
            <md-table-cell class="col--day-ratio">
              <div class="ratio-bg" :class="{ 'ratio-bg--empty': !Number(subItem.ratio) }">
                <span>{{ subItem.ratio + '%' }}</span>
              </div>
            </md-table-cell>
          </template>
        </md-table-row>
      </template>
    </md-table>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
    days: {
      type: Array,
      required: true,
    },
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.head--one-week-ratio {
  width: 120px;
}

.head--name {
  width: 190px;
}

.col--name {
  font-size: 16px;
}

.head--type {
  width: 76px;
}

.ratio-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  min-width: 70px;
  background-color: #4caf50;

  &.ratio-bg--empty {
    background-color: #9c9b9b;
  }
}

.success {
  color: #bbdf88;
}

.warning {
  color: #f07178;
}
</style>

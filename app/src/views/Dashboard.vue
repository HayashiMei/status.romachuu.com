<template>
  <div class="dashboard">
    <dashboard-table title="Server" :list="serverList" :days="days"></dashboard-table>
    <dashboard-table title="Site" :list="siteList" :days="days"></dashboard-table>
    <div class="overview">
      <overall-uptime :ratios="ratios" class="overview__item"></overall-uptime>
      <latest-downtime :content="latestDownTimeStr" class="overview__item"></latest-downtime>
      <quick-stats :ratios="ratios" class="overview__item"></quick-stats>
    </div>
  </div>
</template>

<script>
import API from '../api';
import DashboardTable from '../components/DashboardTable.vue';
import OverallUptime from '../components/OverallUptime.vue';
import LatestDowntime from '../components/LatestDowntime.vue';
import QuickStats from '../components/QuickStats.vue';
import data from '../data.json';

const serverList = data.psp.monitors
  .filter(item => ~item.friendly_name.indexOf('Server/'))
  .map(item => ({
    ...item,
    name: item.friendly_name.replace('Server/', ''),
  }));

const siteList = data.psp.monitors
  .filter(item => ~item.friendly_name.indexOf('Site/'))
  .map(item => ({
    ...item,
    name: item.friendly_name.replace('Site/', ''),
  }));

const ratios = data.psp.pspStats.ratios;

export default {
  components: { DashboardTable, OverallUptime, LatestDowntime, QuickStats },
  data: () => ({
    serverList,
    siteList,
    days: data.days,
    ratios,
    latestDownTimeStr: data.psp.latestDownTimeStr,
  }),
  computed: {},
  mounted() {
    // API.getDashboard();
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 20px 20px 34px 20px;
}

.overview {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  // font-family: 'Roboto Mono', monospace;

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    width: 100%;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.12);
  }

  .overview__item {
    width: calc((100% - 40px) / 3);
  }
}
</style>
